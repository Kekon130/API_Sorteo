const {PrismaClient} = require ('@prisma/client')

const prisma = new PrismaClient();

async function main(){
    console.log('App iniciada');
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
      process.exit(1)
})


//Search the tickets that is include in a game series 
async function findByGame(req,res){
    const tickets = await prisma.ticket.findMany({
        where:{ game: req.params.game},
        include:{ has:true}
    }, )
    return res.status(200).send(tickets);
}

//Search a ticket by the number it have
async function findByNumber(req,res){
    const busqueda = req.params.id + 1;
    const ticket = await prisma.client.findUnique({
        where: {id:busqueda},
        include: {has:true},
    });
    return res.status(200).send(ticket);
}

//Find a ticket by the name of the character
async function findByName(req,res){
    const ticket = prisma.ticket.find({
        where:{name: req.params.name},
        include:{has:true},
    });
    return res.send(ticket);
}
//Find all tickets
async function allTikets(req, res){
    const tickets = await prisma.ticket.findMany({include:{has:true}});
    return res.status(200).send(tickets);
}

//Search the tickets that is include in a game series with credentials
async function findByGameAuth(req,res){
    const tickets = await prisma.ticket.findMany({
        where:{ game: req.params.game},
        include:{ has:true, client:true}
    }, )
    return res.status(200).send(tickets);
}

//Search a ticket by the number it have with credentials
async function findByNumberAuth(req,res){
    const busqueda = req.params.id + 1;
    const ticket = await prisma.client.findUnique({
        where: {id:busqueda},
        include: {has:true, client:true},
    });
    return res.status(200).send(ticket);
}

//Find a ticket by the name of the character with credentials
async function findByNameAuth(req,res){
    const ticket = prisma.ticket.find({
        where:{name: req.params.name},
        include:{ has:true, client:true},
    });
    return res.send(ticket);
}
module.exports={
    findByGame, findByNumber,findByName,allTikets,findByGameAuth, findByNumberAuth,findByNameAuth
}