/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Laboratory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MainComponent" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Presentation" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TherapeuticAction" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Laboratory_name_key" ON "Laboratory"("name");
