const {PrismaClient} = require ('@prisma/client')
const { randomBytes, pbkdf2Sync } = require('crypto');
const {generateAccessToken} = require('../utils/jwt')


const prisma = new PrismaClient()


//Creamos los vendedores
async function createUserByEmailAndPassword(req,res){
    const user = await prisma.seller.create({
        data:{
            telegram: req.params.telegram,
            saltPass: randomBytes(16).toString('hex'),
            password: pbkdf2Sync(pass, saltPass, 100000, 64, 'sha512').toString('hex')
        }
    });
    return res.status("200").send(user);
}

//Hacemos el login con el @ de telegram y una contraseña la cual para compararla la ciframos igual que esta la otra
async function login(req,res){
    const seller = await prisma.seller.findUnique({
        where: {
            id: req.params.telegram
        }}
    )
    if(seller.password == pbkdf2Sync(req.params.password, saltPass, 100000, 64, 'sha512').toString('hex')){
        const token = generateAccessToken(seller)
        res.status(200).send({message: 'Loggin Success'},token)
    }else{res.status(401).send({message: 'La contraseña no es correcta'})}
}

module.exports={
    login,
    logout,
    createUserByEmailAndPassword,
}