const {PrismaClient} = require ('@prisma/client')

const prisma = new PrismaClient();

//Search the tickets that is include in a game series 
async function findByGame(req,res){
    const tickets = await prisma.ticket.findMany({
        where:{ game: req.params.game},
        include:{ client: true, has:true}
    }, )
    return res.status(200).send(tickets);
}

//Search a ticket by the number it have
async function findByNumber(req,res){
    const busqueda = req.params.id + 1;
    const ticket = await prisma.client.findUnique({
        where: {id:busqueda},
        include: {client:true, has:true},
    });
    return res.status(200).send(ticket);
}

//Find a ticket by the name of the character
async function findByName(req,res){
    const ticket = prisma.ticket.find({
        where:{name: req.params.name},
        include:{client:true, has:true},
    });
    return res.send(ticket);
}
//Find all tickets
async function allTikets(req , res){
    const tickets = await prisma.ticket.findMany();
    return res.status(200).send(tickets);
}

module.exports={
    findByGame, findByNumber,findByName,allTikets
}