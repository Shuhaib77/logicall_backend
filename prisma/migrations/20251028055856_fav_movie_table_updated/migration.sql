/*
  Warnings:

  - You are about to drop the column `tytle` on the `FavMovie` table. All the data in the column will be lost.
  - Added the required column `title` to the `FavMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FavMovie` DROP COLUMN `tytle`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
