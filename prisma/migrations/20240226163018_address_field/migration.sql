/*
  Warnings:

  - Added the required column `address` to the `user5` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user5" ADD COLUMN     "address" TEXT NOT NULL;
