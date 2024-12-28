/*
  Warnings:

  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.
  - Added the required column `fullPath` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "url",
ADD COLUMN     "fullPath" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "uploadId" TEXT NOT NULL;
