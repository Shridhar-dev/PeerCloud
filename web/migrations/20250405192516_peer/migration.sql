/*
  Warnings:

  - Added the required column `isAvailable` to the `Ngrok` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ngrok" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL;
