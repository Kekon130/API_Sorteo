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
    const ticket = prisma.ticket.findUnique({
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
   try{ 
        const tickets = await prisma.ticket.findMany({
            where:{ game: req.params.game},
            include:{ has:true, client:true}
        }, )
        return res.status(200).send(tickets);
    }catch(error){
        return res.status(404),send('No se ha encontrado el boleto ');
    }
}


//Search a ticket by the number it have with credentials
async function findByNumberAuth(req,res){
    try{
        const busqueda = req.params.id + 1;
        const ticket = await prisma.client.findUnique({
            where: {id:busqueda},
            include: {has:true, client:true},
        });
        return res.status(200).send(ticket);
    }catch(error){
        return res.status(404),send('No se ha encontrado el boleto');
    }
}

//Find a ticket by the name of the character with credentials
async function findByNameAuth(req,res){
    try{
        const ticket = prisma.ticket.find({
        where:{name: req.params.name},
        include:{ has:true, client:true},
        });
        return res.status(200).send(ticket);
    }catch(error){
        return res.status(404),send('No se ha encontrado el boleto');
    }
}

async function sellTicket(req,res){
   try {
        prisma.ticket.update({
            where:{id:req.params.ticketID},
            data:{
                sellerID : req.body.sellerID,
                clientID: req.body.clientID,
            }
        });
        return res.status(200) 
   } catch (error) {
        return res.status(404).send('No se ha encontrado el boleto')
   }
}
module.exports={
    findByGame, findByNumber,findByName,allTikets,findByGameAuth, findByNumberAuth,findByNameAuth,sellTicket
}