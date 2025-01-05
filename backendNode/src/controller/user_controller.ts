import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserCreation, UserInput } from "../interface/input_interface";
import {
  hashPassword,
  updateOrCreateAccountInfo,
  updateOrCreateLocationInfo,
  updateOrCreateTermsAndCondition,
  updateUserFlag,
} from "../services/db_service";
import { NewRequest } from "../interface/request_interface";
import { generateFinancialAdvice } from "../services/ai_service";
import bcrypt from 'bcryptjs'
import { credentialUserRegistration } from "../validation/userValidation";
import { redis } from "../configs/redis";

const prisma = new PrismaClient();

const testRouter = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Backend server working successfully",
  })
}

/**
 * Handles Google user authentication
 *
 * @param req - Request object
 * @param res - Response object
 *
 * @returns {Promise<void>}
 */
const handleGoogleUserAuth = async (req: NewRequest, res: Response) => {
  const { user } = req;

  if (!user || !user.token) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Invalid user data",
    });
  }

  const userData = {
    provider: user.provider,
    name: user.token.name,
    email: user.token.email,
    password: user.provider === "google" ? "" : "",
    profile_image: user.token.picture,
  };

  try {
    const userExist = await prisma.user.findUnique({
      where: { email: user.token.email },
    });

    if (userExist) {
      return res.status(409).json({
        status: 409,
        success: true,
        message: "User already exists",
        data: userExist,
      });
    }

    const result = await prisma.user.upsert({
      where: { email: user.token.email },
      update: { ...userData },
      create: { ...userData, password: "" },
    });

    const { password, ...newResult } = result;
    return res.status(200).json({
      status: 200,
      success: true,
      message: "User created successfully",
      data: newResult,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating/updating the user",
    });
  }
};

/**
 * Registers a new user using the provided credentials.
 *
 * @param {Request} req - The request object containing the user's details in the request body.
 * @param {Response} res - The response object to send the HTTP response.
 *
 * @remarks
 * This function extracts the user's details from the request body, validates them, and checks if a user with the same email already exists.
 * If the validation fails or the user already exists, an appropriate HTTP response is sent with the corresponding status code and error message.
 * If the user is successfully registered, a new user record is created in the database, and an HTTP response with a success status code is sent.
 *
 * @returns {Promise<void>}
 */
const registerCredentialUser = async (req: Request, res: Response) => {
  const userDetails: UserCreation = req.body

  const { success, data } = credentialUserRegistration.safeParse(userDetails)

  if (!success) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "User registration failed, due to invalid credentials."
    });
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  })

  if (existingUser) {
    return res.status(409).json({
      status: 409,
      success: false,
      message: "User with this email already exists",
      providerId: existingUser.provider
    });
  }

  try {
    const hashedPassword = await hashPassword(data.password)

    const newUser = await prisma.user.create({
      data: {
        provider: "credential",
        name: data.firstName + " " + data.lastName,
        email: data.email,
        password: hashedPassword,
        profile_image: "",
      }
    })

    return res.status(201).json({
      status: 201,
      success: true,
      message: "User Created",
      data: {
        user_id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        profile_image: newUser.profile_image
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating the user",
    })
  }
}


/**
 * Handles user authentication using the credentials provider
 *
 * @param req - Request object
 * @param res - Response object
 *
 * @returns {Promise<void>}
 */
const handleCredentialUserAuth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid credentials",
      });
    }

    // User authenticated successfully
    return res.status(200).json({
      status: 200,
      success: true,
      message: "User authenticated successfully",
      userData: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile: user.profile_image,
        // token: "sampleToken" // You might need to generate a JWT or session token here
      },
    });

  } catch (error) {
    console.error("Error in handleCredentialUserAuth:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

/**
 * Handles a GET request to fetch user information, including financial advice.
 *
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 *
 * @returns {Promise<void>}
 */
const getUserFinancialReport = async (req: Request, res: Response) => {
  const { id: user_id } = req.params;

  try {
    const userIdAsNumber = Number(user_id);

    // Validate user ID
    if (isNaN(userIdAsNumber)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check Redis cache
    const cacheKey = `cached_job:${userIdAsNumber}`;
    const cachedJob = await redis.get(cacheKey);
    console.log(`[SERVER] Checking Redis cache`);

    if (cachedJob) {
      console.log(`[SERVER] Using Redis Cache`);
      const parsedData = JSON.parse(cachedJob);
      return res.status(200).json({
        status: 200,
        success: true,
        data: parsedData,
      });
    }

    console.log(`[SERVER] Cache Not Found, Searching DB`);
    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { id: userIdAsNumber },
    });

    if (!user) {
      console.log(`[SERVER] User not found`);
      return res.status(404).json({
        status: 404,
        success: false,
        errorType: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    // Fetch user financial advice
    console.log(`[SERVER] User found, Checking for Financial Result`);
    const userFinancialDetails = await prisma.financialAdvice.findUnique({
      where: { user_id: user.id },
    });

    if (!userFinancialDetails) {
      console.log(`[SERVER] User found, But no Financial Result`);
      return res.status(404).json({
        status: 404,
        success: false,
        first_timer: user.first_timer,
        errorType: "FINANCIAL_RESULT_NOT_FOUND",
        message: "Financial advice not found for the user",
      });
    }

    // Cache the financial advice in Redis
    await redis.setEx(cacheKey, 2 * 60, JSON.stringify(userFinancialDetails));
    console.log(`[SERVER] Added Resutt to cache`);

    return res.status(200).json({
      status: 200,
      success: true,
      data: userFinancialDetails,
    });
  } catch (error) {
    console.error("Error fetching user financial report:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};


/**
 * Checks if a financial report exists for a user based on their email.
 *
 * @param {Request} req - The request object containing the user's email in the request parameters.
 * @param {Response} res - The response object to send the HTTP response.
 *
 * @remarks
 * This function retrieves the user's email from the request parameters, checks if a user with the given email exists,
 * and then checks if a financial report exists for that user. If the user or financial report is not found,
 * an appropriate HTTP response is sent with the corresponding status code and error message.
 * If both the user and financial report are found, the function sends an HTTP response with a success status code
 * and includes the user's first-time flag.
 */
const checkFinancialReport = async (req: Request, res: Response) => {
  const { email } = req.params;

  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExist) {
    return res.status(404).json({
      status: 404,
      success: false,
      errorType: "USER_NOT_EXIST",
      message: "User not found",
    });
  }

  const financialReport = await prisma.financialAdvice.findUnique({
    where: { user_id: userExist.id },
  })

  if (!financialReport) {
    return res.status(404).json({
      status: 404,
      success: false,
      errorType: "FINANCIAL_RESULT_NOT_FOUND",
      message: "Financial report not found",
    });
  } else {
    return res.status(200).json({
      status: 200,
      success: true,
      first_time: userExist.first_timer
    });
  }
}


export {
  testRouter,
  handleGoogleUserAuth,
  registerCredentialUser,
  handleCredentialUserAuth,
  getUserFinancialReport,
  checkFinancialReport
};
