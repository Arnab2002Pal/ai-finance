import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserCreation, UserInput } from "../interface/inputInterface";
import {
  hashPassword,
  updateOrCreateAccountInfo,
  updateOrCreateLocationInfo,
  updateOrCreateTermsAndCondition,
  updateUserFlag,
} from "../service/dbService";
import { NewRequest } from "../interface/requestInterface";
import { generateFinancialAdvice } from "../service/gptService";
import bcrypt from 'bcrypt'
import { credentialUserRegistration } from "../validation/userValidation";

const prisma = new PrismaClient();

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

    const {password, ...newResult} = result;
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

    // Compare the provided password with the stored hashed password
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
 * Create or update user information, including location, account and terms and condition information,
 * and generate a financial advice using the GPT service.
 *
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 *
 * @returns {Promise<void>}
 */
const generateAdvice = async (req: Request, res: Response) => {
  const { email, locationInfo, accountInfo, termsAndCondition } = req.body;

  const gptInput: UserInput = {
    country: locationInfo.location,
    age: Number(accountInfo.age),
    occupation: accountInfo.occupation,
    monthly_salary: Number(accountInfo.monthlyIncome),
    total_expenses: accountInfo.totalExpense,
    total_investment: accountInfo.currentInvestment,
    short_term_goal: accountInfo.shortTermGoal,
    long_term_goal: accountInfo.longTermGoal,
    debt: accountInfo.debt,
    risk_tolerance: accountInfo.riskTolerance,
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }
    
    await updateOrCreateLocationInfo(user.id, locationInfo);
    await updateOrCreateAccountInfo(user.id, accountInfo);
    await updateOrCreateTermsAndCondition(user.id, termsAndCondition);
    await updateUserFlag(user.id, false)

    const gptResponse = await generateFinancialAdvice(gptInput);
    
    await prisma.financialAdvice.upsert({
      where: { user_id: user.id },
      update: gptResponse,
      create: { user_id: user.id, ...gptResponse },
    });
    
    return res.status(201).json({
      status: 201,
      success: true,
      message: "User information created or updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating or updating user information",
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
const getUserInfo = async (req: Request, res: Response) => {
  const { id: user_id } = req.params;
  
  try {
    const userIdAsNumber = Number(user_id);
    
    // Ensure it's a valid number before making the Prisma query
    if (isNaN(userIdAsNumber)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid user ID",
      });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userIdAsNumber },
    });    
 
    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        errorType: "USER_NOT_FOUND",
        message: "User not found",
      });
    }
    
    const userFinancialInfo = await prisma.financialAdvice.findUnique({
      where: { user_id: user.id },
    });
    
    if (!userFinancialInfo) {      
      return res.status(404).json({
        status: 404,
        success: false,
        first_timer: user.first_timer,
        errorType: "FINANCIAL_RESULT_NOT_FOUND",
        message: "Financial advice not found for the user",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      userFinancialInfo,
    });
  } catch (error) {
    console.error("Error fetching user information:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

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
  handleGoogleUserAuth,
  registerCredentialUser,
  handleCredentialUserAuth,
  generateAdvice,
  getUserInfo,
  checkFinancialReport
};
