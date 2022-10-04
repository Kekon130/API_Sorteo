-- CreateTable
CREATE TABLE `Seller` (
    `id` INTEGER AUTO_INCREMENT,
    `telegram` VARCHAR(20),
    `name` VARCHAR(30),
    `password` VARCHAR(40),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER AUTO_INCREMENT,
    `telegram` VARCHAR(20),
    `name` VARCHAR(30),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER AUTO_INCREMENT,
    `name` VARCHAR(30),
    `game` VARCHAR(50),
    `sellerID` INTEGER,
    `clientID` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserve` (
    `id` INTEGER AUTO_INCREMENT,
    `sellerID` INTEGER,
    `clientID` INTEGER,
    `ticketID` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `id` INTEGER AUTO_INCREMENT,
    `sellerID` INTEGER,
    `clientID` INTEGER,
    `ticketID` INTEGER,
    `date` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Has` (
    `id` INTEGER AUTO_INCREMENT,
    `ticketID` INTEGER,
    `sellerID` INTEGER,
    `date` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sellerID_fkey` FOREIGN KEY (`sellerID`) REFERENCES `Seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserve` ADD CONSTRAINT `Reserve_sellerID_fkey` FOREIGN KEY (`sellerID`) REFERENCES `Seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserve` ADD CONSTRAINT `Reserve_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserve` ADD CONSTRAINT `Reserve_ticketID_fkey` FOREIGN KEY (`ticketID`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_sellerID_fkey` FOREIGN KEY (`sellerID`) REFERENCES `Seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_clientID_fkey` FOREIGN KEY (`clientID`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_ticketID_fkey` FOREIGN KEY (`ticketID`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has` ADD CONSTRAINT `Has_ticketID_fkey` FOREIGN KEY (`ticketID`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Has` ADD CONSTRAINT `Has_sellerID_fkey` FOREIGN KEY (`sellerID`) REFERENCES `Seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
