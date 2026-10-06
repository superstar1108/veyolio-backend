/*
  Warnings:

  - Added the required column `address` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introVideoUrl` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeUrl` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "introVideoUrl" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "resumeUrl" TEXT NOT NULL;
