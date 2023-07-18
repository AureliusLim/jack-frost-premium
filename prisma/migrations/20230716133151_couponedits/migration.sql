/*
  Warnings:

  - Added the required column `prodRequirement` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantRequirement` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" ADD COLUMN     "prodRequirement" TEXT NOT NULL,
ADD COLUMN     "quantRequirement" INTEGER NOT NULL;
