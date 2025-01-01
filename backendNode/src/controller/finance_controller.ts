import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserInput } from "../interface/input_interface";
import { generateFinancialAdvice } from "../services/ai_service";
import {
  updateOrCreateLocationInfo,
  updateOrCreateAccountInfo,
  updateOrCreateTermsAndCondition,
  updateUserFlag
} from "../services/db_service";
import { redis } from "../configs/redis";

const prisma = new PrismaClient();

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

  const aiInput: UserInput = {
    country: locationInfo.country,
    age: accountInfo.age,
    occupation: accountInfo.occupation,
    monthly_income: accountInfo.monthly_income,
    monthly_expense: accountInfo.monthly_expense,
    monthly_debt: accountInfo.monthly_debt,
    total_remaining_debt: accountInfo.total_remaining_debt,
    risk_tolerance: accountInfo.risk_tolerance,
    goal_priorities: accountInfo.goal_priorities,
    current_amount_savings: accountInfo.current_amount_savings,
    short_term: accountInfo.short_term,
    long_term: accountInfo.long_term,
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("[SERVER] User not found!");

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
    console.log("[SERVER] DB Operation Successful.");


    const aiResponse = await generateFinancialAdvice(aiInput);

    const data = await prisma.financialAdvice.upsert({
      where: { user_id: user.id },
      update: aiResponse,
      create: { user_id: user.id, ...aiResponse },
    });
    console.log("[SERVER] AI result added to DB successfully");

    await redis.setEx(`cached_job:${user.id}`, Number(process.env.CACHE_TIMING!), JSON.stringify(data))
    console.log("[SERVER] Successfully added to Cached.");

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

export {
  generateAdvice
}