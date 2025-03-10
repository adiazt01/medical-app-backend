/*
  Warnings:

  - You are about to drop the column `isPaid` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the `_BillingToOrderItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BillingToOrderItem" DROP CONSTRAINT "_BillingToOrderItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_BillingToOrderItem" DROP CONSTRAINT "_BillingToOrderItem_B_fkey";

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "isPaid",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "_BillingToOrderItem";
