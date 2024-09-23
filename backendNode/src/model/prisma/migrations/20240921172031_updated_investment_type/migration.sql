/*
  Warnings:

  - You are about to drop the column `currentInvestment` on the `AccountInfo` table. All the data in the column will be lost.
  - Added the required column `typr` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountInfo" DROP COLUMN "currentInvestment",
ADD COLUMN     "typr" INTEGER NOT NULL;
