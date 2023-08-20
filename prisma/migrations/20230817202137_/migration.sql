/*
  Warnings:

  - You are about to drop the column `upadateAt` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `upadateAt` on the `SpecialPrice` table. All the data in the column will be lost.
  - You are about to drop the column `upadateAt` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "upadateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SpecialPrice" DROP COLUMN "upadateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "upadateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;
