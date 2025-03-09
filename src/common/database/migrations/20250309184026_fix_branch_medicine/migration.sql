/*
  Warnings:

  - You are about to drop the column `medicineId` on the `CartItem` table. All the data in the column will be lost.
  - Added the required column `branchMedicineId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_medicineId_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "medicineId",
ADD COLUMN     "branchMedicineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_branchMedicineId_fkey" FOREIGN KEY ("branchMedicineId") REFERENCES "BranchMedicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
