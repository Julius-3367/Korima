-- AlterTable
ALTER TABLE `BlogPost` ADD COLUMN `author` VARCHAR(191) NULL DEFAULT 'Korima Team',
    ADD COLUMN `tags` JSON NULL;
