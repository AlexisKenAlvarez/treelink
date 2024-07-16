/*
  Warnings:

  - Added the required column `profile_title` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "profile_title" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
