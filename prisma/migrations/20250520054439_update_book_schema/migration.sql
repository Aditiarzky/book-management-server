/*
  Warnings:

  - You are about to drop the column `alur` on the `Book` table. All the data in the column will be lost.
  - Added the required column `artist` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "alur",
ADD COLUMN     "alt_judul" TEXT,
ADD COLUMN     "artist" TEXT NOT NULL,
ALTER COLUMN "synopsis" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;
