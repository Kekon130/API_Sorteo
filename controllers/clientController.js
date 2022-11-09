const {PrismaClient} = require('@prisma/client');
const { createToken }=require('')
const prisma = new PrismaClient();

//Search tickets by the telegram name 
async function ticketsOwned(req,res){
    const tickets = await prisma.client.findUnique({
        where:{telegram:req.params.telegram},
        include:{tickets:true},
    });
    return res.status(200).send(tickets);
}

//Search ticket that the client has reserved
async function ticketReserved(req,res){
    const tickets = await prisma.client.findUnique({
        where:{telegram:req.params.telegram},
        include:{reserves:true},
    });
    return res.status(200).send(tickets);
}


module.exports ={
    ticketReserved,ticketsOwned,
}