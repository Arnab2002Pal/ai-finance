/*
  Warnings:

  - You are about to drop the column `growth` on the `FinancialAdvice` table. All the data in the column will be lost.
  - Added the required column `growthAnalysis` to the `FinancialAdvice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reEvaluation` to the `FinancialAdvice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `summary` on the `FinancialAdvice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FinancialAdvice" DROP COLUMN "growth",
ADD COLUMN     "growthAnalysis" JSONB NOT NULL,
ADD COLUMN     "reEvaluation" JSONB NOT NULL,
DROP COLUMN "summary",
ADD COLUMN     "summary" JSONB NOT NULL;
