const {PrismaClient} = require('@prisma/client');
const { generateAccessToken }=require('../utils/jwt')
const prisma = new PrismaClient();

//Search tickets by the telegram name 
async function ticketsOwned(req,res){
    try{
        const tickets = await prisma.client.findUnique({
            where:{telegram:req.params.telegram},
            include:{buyed_Tickets:true},
        });
        return res.status(200).json(tickets);
    }catch(error){
        res.status(404).send('Usuario no encontrado')
    }
}

//Search ticket that the client has reserved
async function ticketReserved(req,res){
    const tickets = await prisma.client.findUnique({
        where:{telegram:req.params.telegram},
        include:{reserved_Tickets:true},
    });
    return res.status(200).send(tickets);
}


module.exports ={
    ticketReserved,ticketsOwned,
}