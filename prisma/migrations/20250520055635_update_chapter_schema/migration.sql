/*
  Warnings:

  - You are about to drop the column `istext` on the `Chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "istext",
ADD COLUMN     "isitext" TEXT;
