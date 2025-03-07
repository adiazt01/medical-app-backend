/*
  Warnings:

  - You are about to drop the column `firstName` on the `Costumer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Costumer` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'EMPLOYEE', 'MODERATOR');

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'SHIPPED';

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropIndex
DROP INDEX "Payment_orderId_key";

-- AlterTable
ALTER TABLE "Costumer" DROP COLUMN "firstName",
DROP COLUMN "lastName";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "firstName",
DROP COLUMN "lastName";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "branchId",
DROP COLUMN "customerId",
DROP COLUMN "totalAmount",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "permission",
DROP COLUMN "userType",
ADD COLUMN     "firstNames" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lastNames" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Permission";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "medicineId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billing" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BillingToOrderItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BillingToOrderItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BillingToPayment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BillingToPayment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE INDEX "_BillingToOrderItem_B_index" ON "_BillingToOrderItem"("B");

-- CreateIndex
CREATE INDEX "_BillingToPayment_B_index" ON "_BillingToPayment"("B");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillingToOrderItem" ADD CONSTRAINT "_BillingToOrderItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Billing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillingToOrderItem" ADD CONSTRAINT "_BillingToOrderItem_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillingToPayment" ADD CONSTRAINT "_BillingToPayment_A_fkey" FOREIGN KEY ("A") REFERENCES "Billing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillingToPayment" ADD CONSTRAINT "_BillingToPayment_B_fkey" FOREIGN KEY ("B") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
