/*
  Warnings:

  - You are about to drop the `sections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_section_id_fkey";

-- DropTable
DROP TABLE "sections";

-- CreateTable
CREATE TABLE "section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL,
    "discountRate" INTEGER NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "section_id_key" ON "section"("id");

-- CreateIndex
CREATE UNIQUE INDEX "section_name_key" ON "section"("name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
