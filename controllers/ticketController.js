const {PrismaClient} = require ('@prisma/client')
const prisma = new PrismaClient();


//Search the tickets that is include in a game series 
async function findByGame(req,res){
    
    try{
        const tickets = await prisma.ticket.findMany({
            where:{ game: req.params.game}
        })
        if(JSON.stringify(tickets)==='{}'){return res.status(404).send('No se ha encontrado ningun boleto')}
        return res.status(200).json(tickets);
    }catch(error){
        return res.status(400).send('No se ha podido buscar el boleto')
    }
}

//Search a ticket by the number it have
async function findByNumber(req,res){
    try{
        const busqueda = parseInt(req.params.id) + 1;
        console.log(busqueda)
        const ticket = await prisma.ticket.findUnique({
            where: {id:busqueda}
        });
        return res.status(200).send(ticket);
    }catch(error){
        res.status(404).send('No se ha encontrado el boleto')
    }
}

//Find a ticket by the name of the character
async function findByName(req,res){
    try{
        const ticket = await prisma.ticket.findFirst({
            where:{name:req.params.name}
        });
        if(ticket ===null){ return res.status(404).send('No se ha encontrado ningun boleto')}
        return res.status(200).json(ticket);
    }catch(error){
        return res.status(404).send('No se ha encontrado ningun boleto')
    }
}
//Find all tickets
async function allTickets(req,res){
    try{
        const tickets = await prisma.ticket.findMany();
        return res.status(200).json(tickets)
    }catch(error){
        res.status(404).send('No se encuentran boletos')
    }
}


//Search the tickets that is include in a game series with credentials
async function findByGameAuth(req,res){
   try{ 
        const tickets = await prisma.ticket.findMany({
            where:{ game: req.params.game},
        },)
        return res.status(200).send(tickets);
    }catch(error){
        return res.status(404),send('No se ha encontrado el boleto ');
    }
}


//Search a ticket by the number it have with credentials
async function findByNumberAuth(req,res){
    try{
        const busqueda = parseInt(req.params.id) + 1;
        const ticket = await prisma.ticket.findUnique({
            where: {id:busqueda},
            include: {client:true},
        });
        return res.status(200).send(ticket);
    }catch(error){
        return res.status(404),send('No se ha encontrado el boleto');
    }
}

//Find a ticket by the name of the character with credentials
async function findByNameAuth(req,res){
    try{
        const ticket = prisma.ticket.findFirst({
        where:{name: req.params.name},
        include:{client:true},
        });
        return res.status(200).send(ticket);
    }catch(error){
        return res.status(404),send('No se ha encontrado el boleto');
    }
}


async function reserveTicket(req,res){
    try {
        const busqueda =parseInt(req.body.id) + 1;
        const reserva = await prisma.ticket.findUnique({where:{id:busqueda}})
        if(reserva.reservationID!=0){return res.status(400).send('No se puede reservar un boleto reservado')}
        else{
            const user = await prisma.user.findFirst({where:{telegram:req.body.telegram}})
            const update=await prisma.ticket.update({
                    where:{id: busqueda},
                    data:{
                        reservationID: user.id,
                    }
                });
                return res.status(200).json(update);
        }
       } catch (error) {
            return res.status(404).send('No se ha encontrado el boleto')
       }
       
}

async function removeReserve(req,res){
    try{
        const busqueda =parseInt(req.params.id) + 1;
        const reserva = await prisma.ticket.findUnique({where:{id:busqueda}})
        if(reserva.reservationID==0){return res.status(400).send('Este boleto no esta reservado')}
        else{
            const update=await prisma.ticket.update({
                where:{id: busqueda},
                data:{
                    reservationID: 0,
                }
            });
            return res.status(200).json(update);
        }
    }catch(error){
        return res.status(404).send('No se ha encontrado el boleto')
    }
}

async function sellTicket(req,res){
   try {
    const busqueda = parseInt(req.body.id) + 1;
    const reserva = await prisma.ticket.findUnique({where:{id:busqueda}})
    if(reserva.reservationID!=0){return res.status(400).send('No se puede comprar un boleto reservado')}
    else{
        const user = await prisma.user.findFirst({where:{telegram:req.body.telegram}})
        const seller = await prisma.seller.findFirst({where:{telegram:req.body.telegram}})
        const update=await prisma.ticket.update({
                where:{id: busqueda},
                data:{
                    sellerID : seller.id,
                    clientID: user.id,
                    reservationID: 0,
                }
            });
            return res.status(200).json(update);
    }
   } catch (error) {
        return res.status(404).send('No se ha encontrado el boleto')
   }
}


module.exports={
   findByGame, findByNumber,findByName,allTickets,findByGameAuth, findByNumberAuth,findByNameAuth,sellTicket,reserveTicket,removeReserve
}