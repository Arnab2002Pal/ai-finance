/*
  Warnings:

  - You are about to drop the column `debt` on the `AccountInfo` table. All the data in the column will be lost.
  - You are about to drop the column `longTermGoal` on the `AccountInfo` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyIncome` on the `AccountInfo` table. All the data in the column will be lost.
  - You are about to drop the column `riskTolerance` on the `AccountInfo` table. All the data in the column will be lost.
  - You are about to drop the column `shortTermGoal` on the `AccountInfo` table. All the data in the column will be lost.
  - You are about to drop the column `totalExpense` on the `AccountInfo` table. All the data in the column will be lost.
  - You are about to drop the column `totalInvestment` on the `AccountInfo` table. All the data in the column will be lost.
  - Added the required column `goal_priorities` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long_term` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthly_expense` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthly_income` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `risk_tolerance` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_term` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RiskTolerance" AS ENUM ('Conservative', 'Moderate', 'Aggressive');

-- AlterTable
ALTER TABLE "AccountInfo" DROP COLUMN "debt",
DROP COLUMN "longTermGoal",
DROP COLUMN "monthlyIncome",
DROP COLUMN "riskTolerance",
DROP COLUMN "shortTermGoal",
DROP COLUMN "totalExpense",
DROP COLUMN "totalInvestment",
ADD COLUMN     "current_amount_savings" INTEGER,
ADD COLUMN     "goal_priorities" TEXT NOT NULL,
ADD COLUMN     "long_term" TEXT NOT NULL,
ADD COLUMN     "monthly_debt" INTEGER,
ADD COLUMN     "monthly_expense" INTEGER NOT NULL,
ADD COLUMN     "monthly_income" INTEGER NOT NULL,
ADD COLUMN     "risk_tolerance" "RiskTolerance" NOT NULL,
ADD COLUMN     "short_term" TEXT NOT NULL,
ADD COLUMN     "total_remaining_debt" INTEGER;
