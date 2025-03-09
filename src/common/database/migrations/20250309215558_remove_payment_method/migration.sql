/*
  Warnings:

  - The values [CREDIT_CARD,DEBIT_CARD,BANK_TRANSFER,PAYPAL] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `isPaid` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH', 'PAYMENT_MOBILE');
ALTER TABLE "Payment" ALTER COLUMN "method" TYPE "PaymentMethod_new" USING ("method"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "isPaid" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "status";

-- DropEnum
DROP TYPE "PaymentStatus";
