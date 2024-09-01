/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAnswer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_user_id_fkey";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "UserAnswer";

-- CreateTable
CREATE TABLE "LocationInfo" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "LocationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountInfo" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "occupation" TEXT NOT NULL,
    "monthlyIncome" INTEGER NOT NULL,
    "totalExpense" INTEGER NOT NULL,
    "currentInvestment" TEXT NOT NULL,
    "shortTermGoal" TEXT NOT NULL,
    "longTermGoal" TEXT NOT NULL,
    "riskTolerance" TEXT NOT NULL,
    "debt" TEXT NOT NULL,

    CONSTRAINT "AccountInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermsAndCondition" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "acceptTerms" BOOLEAN NOT NULL,

    CONSTRAINT "TermsAndCondition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationInfo_user_id_key" ON "LocationInfo"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AccountInfo_user_id_key" ON "AccountInfo"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "TermsAndCondition_user_id_key" ON "TermsAndCondition"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "LocationInfo" ADD CONSTRAINT "LocationInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountInfo" ADD CONSTRAINT "AccountInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermsAndCondition" ADD CONSTRAINT "TermsAndCondition_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
