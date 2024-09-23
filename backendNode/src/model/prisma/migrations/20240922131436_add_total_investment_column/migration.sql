/*
  Warnings:

  - You are about to drop the column `typr` on the `AccountInfo` table. All the data in the column will be lost.
  - Added the required column `totalInvestment` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountInfo" DROP COLUMN "typr",
ADD COLUMN     "totalInvestment" INTEGER NOT NULL;
