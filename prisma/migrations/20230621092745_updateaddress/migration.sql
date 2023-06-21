/*
  Warnings:

  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "address",
ADD COLUMN     "buildingNumber" TEXT,
ADD COLUMN     "cityProvince" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "street" TEXT;
