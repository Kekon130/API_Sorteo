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
    return res.status("200").send(user);
}
async function login(req,res){
    const user = await prisma.seller.findUnique({
        where: {
            id: req.params.telegram
        }}
    )
    if(user.password == req.params.password){
        res.status(200)
    }else{res.status(401).send({message: 'La contraseña no es correcta'})}
}
module.exports={
    createUserByEmailAndPassword,
}