-- DropIndex
DROP INDEX `Ticket_clientID_fkey` ON `ticket`;

-- DropIndex
DROP INDEX `Ticket_reservationID_fkey` ON `ticket`;

-- DropIndex
DROP INDEX `Ticket_sellerID_fkey` ON `ticket`;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sellerID_fkey` FOREIGN KEY (`sellerID`) REFERENCES `Seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_reservationID_fkey` FOREIGN KEY (`reservationID`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
