/*
  Warnings:

  - The `prodRequirement` column on the `coupon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "prodRequirement",
ADD COLUMN     "prodRequirement" TEXT[];
