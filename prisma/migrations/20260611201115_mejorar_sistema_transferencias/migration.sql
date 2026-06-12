/*
  Warnings:

  - You are about to drop the column `transferidoEn` on the `Transfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "transferidoEn",
ADD COLUMN     "fechaFin" TIMESTAMP(3),
ADD COLUMN     "fechaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
