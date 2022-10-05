const {PrismaClient} = require ('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()


async function main(){
 
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
      process.exit(1)
})

async function createUserByEmailAndPassword(req,res){
    const user = await prisma.seller.create({
        data:{
            telegram: req.params.telegram,
            password:  bcrypt.hashSync(req.params.password,12)
        }
    });
    return res.send("200").json(user);
}

module.exports={
    createUserByEmailAndPassword,
}