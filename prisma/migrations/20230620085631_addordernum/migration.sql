/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "orderNumber" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "paymentMethod";
