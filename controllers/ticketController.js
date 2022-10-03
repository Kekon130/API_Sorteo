const {PrismaClient} = require ('@prisma/client')

const prisma = new PrismaClient();

async function findByGame(req,res){
    const tickets = await prisma.ticket.findMany({
        where:{ game: req.params.game}
    }, )
    return res.send(tickets);
}

module.exports={
    findByGame,
}