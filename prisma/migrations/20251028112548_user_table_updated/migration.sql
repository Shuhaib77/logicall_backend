/*
  Warnings:

  - You are about to drop the `FavMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FavMovie` DROP FOREIGN KEY `FavMovie_user_id_fkey`;

-- DropTable
DROP TABLE `FavMovie`;

-- CreateTable
CREATE TABLE `FavShows` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL,
    `director` VARCHAR(191) NOT NULL,
    `budget` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FavShows_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MoviesCatogery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MoviesCatogery_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavShows` ADD CONSTRAINT `FavShows_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavShows` ADD CONSTRAINT `FavShows_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `MoviesCatogery`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
