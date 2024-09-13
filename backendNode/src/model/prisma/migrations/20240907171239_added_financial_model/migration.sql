/*
  Warnings:

  - Added the required column `updated_at` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `LocationInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `TermsAndCondition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountInfo" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LocationInfo" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TermsAndCondition" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "FinancialAdvice" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expenseAnalysis" JSONB NOT NULL,
    "investmentAdvice" JSONB NOT NULL,
    "savingPlan" JSONB NOT NULL,
    "debtManagement" JSONB NOT NULL,
    "goalRoadmap" JSONB NOT NULL,
    "structuredPlan" JSONB NOT NULL,
    "growth" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialAdvice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancialAdvice_user_id_key" ON "FinancialAdvice"("user_id");

-- AddForeignKey
ALTER TABLE "FinancialAdvice" ADD CONSTRAINT "FinancialAdvice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
