import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserInput } from "../interface/inputInterface";
import {
  updateOrCreateAccountInfo,
  updateOrCreateLocationInfo,
  updateOrCreateTermsAndCondition,
} from "../service/dbService";
import { generateFinancialAdvice } from "../service/gptService";
import { NewRequest } from "../interface/requestInterface";
import { error } from "console";

// TODO: create a user sign in page

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
      return res.status(200).json({
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

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating/updating the user",
    });
  }
};

/**
 * Handles user authentication using the credentials provider
 *
 * @param req - Request object
 * @param res - Response object
 *
 * @returns {Promise<void>}
 */
const handleCredentialUserAuth = async (req: Request, res: Response) => {
  // implement user creation logic for credentials provider
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      userData: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile_image: user.profile_image,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating/updating the user",
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
const createAndUpdateUserInfo = async (req: Request, res: Response) => {
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
        success: false,
        message: "User not found",
      });
    }

    await updateOrCreateLocationInfo(user.id, locationInfo);
    await updateOrCreateAccountInfo(user.id, accountInfo);
    await updateOrCreateTermsAndCondition(user.id, termsAndCondition);

    const gptResponse = await generateFinancialAdvice(gptInput);
    console.log("Response:-----------",gptResponse);
    console.log("Invesmtnet:-----------",gptResponse.investmentAdvice);
    

    await prisma.financialAdvice.upsert({
      where: { user_id: user.id },
      update: gptResponse,
      create: { user_id: user.id, ...gptResponse },
    });

    return res.status(201).json({
      success: true,
      message: "User information created or updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
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
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userIdAsNumber },
    });

    if (!user) {
      return res.status(404).json({
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
        success: false,
        errorType: "FINANCIAL_ADVICE_NOT_FOUND",
        message: "Financial advice not found for the user",
      });
    }

    return res.status(200).json({
      success: true,
      userFinancialInfo,
    });
  } catch (error) {
    console.error("Error fetching user information:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  handleGoogleUserAuth,
  handleCredentialUserAuth,
  createAndUpdateUserInfo,
  getUserInfo,
};
