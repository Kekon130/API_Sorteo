/*
  Warnings:

  - You are about to drop the `has` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reserve` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `telegram` on table `client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `client` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `saltPass` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Made the column `telegram` on table `seller` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `seller` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `seller` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `reservationID` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlImage` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `game` on table `ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sellerID` on table `ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientID` on table `ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Ticket_clientID_fkey` ON `ticket`;

-- DropIndex
DROP INDEX `Ticket_sellerID_fkey` ON `ticket`;

-- AlterTable
ALTER TABLE `client` MODIFY `telegram` VARCHAR(20) NOT NULL,
    MODIFY `name` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `seller` ADD COLUMN `saltPass` VARCHAR(40) NOT NULL,
    MODIFY `telegram` VARCHAR(20) NOT NULL,
    MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `password` VARCHAR(40) NOT NULL;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `reservationID` INTEGER NOT NULL,
    ADD COLUMN `urlImage` VARCHAR(80) NOT NULL,
    MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `game` VARCHAR(50) NOT NULL,
    MODIFY `sellerID` INTEGER NOT NULL,
    MODIFY `clientID` INTEGER NOT NULL;

-- DropTable
DROP TABLE `has`;

-- DropTable
DROP TABLE `reserve`;

-- DropTable
DROP TABLE `sale`;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sellerID_fkey` FOREIGN KEY (`sellerID`) REFERENCES `Seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_reservationID_fkey` FOREIGN KEY (`reservationID`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
