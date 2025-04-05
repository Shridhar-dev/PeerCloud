/*
  Warnings:

  - You are about to drop the `Container` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Container" DROP CONSTRAINT "Container_userId_fkey";

-- DropTable
DROP TABLE "Container";
