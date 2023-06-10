/*
  Warnings:

  - You are about to drop the column `userId` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "paymentType" AS ENUM ('CASH', 'CREDIT');

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_userId_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "paymentType" "paymentType" NOT NULL DEFAULT 'CREDIT',
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_code_key" ON "Customer"("code");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
