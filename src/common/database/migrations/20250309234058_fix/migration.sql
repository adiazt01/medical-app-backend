/*
  Warnings:

  - You are about to drop the column `total` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the `_BillingToPayment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paymentId` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BillingToPayment" DROP CONSTRAINT "_BillingToPayment_A_fkey";

-- DropForeignKey
ALTER TABLE "_BillingToPayment" DROP CONSTRAINT "_BillingToPayment_B_fkey";

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "total",
ADD COLUMN     "paymentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BillingToPayment";

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
