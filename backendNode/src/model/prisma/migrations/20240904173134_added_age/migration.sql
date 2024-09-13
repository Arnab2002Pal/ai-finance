/*
  Warnings:

  - Added the required column `age` to the `AccountInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountInfo" ADD COLUMN     "age" INTEGER NOT NULL;
