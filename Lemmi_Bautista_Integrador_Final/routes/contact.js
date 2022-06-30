const express = require("express");
const router = express.Router();
const nodemailer= require("nodemailer");
const {body, validationResult } = require("express-validator")

router.get("/", (req, res)=> {
    res.render("contact");
});


const validationRules= [
    body("name", "debe ingresar nombre").exists().isLength({min:2}),
    body("lastName", "debe ingresar apellido").exists().isLength({min:2}),
    body("email", "debe ingresar email valido").exists().isEmail(),
    body("message", "debe contener entre 10 y 300 caracteres").exists().isLength({min:10, max:300}).trim(" ")
] 


router.post("/", validationRules ,async (req, res)=>{


    const errors= validationResult(req);

    if(!errors.isEmpty()){
        const formData= req.body;
        const arrWarnings= errors.array();
        res.render("contact", { arrWarnings, formData})


    } else{
        const {name, lastName, email, message}= req.body;
        const emailMsg={
            to: "blemmi001@gmail.com",
            from: email,
            subject: "mensaje desde formulario de contacto",
            html: `Mensaje de ${name} ${lastName}: ${message}`
        }
        
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });
    
    const sendmailStatus= await transport.sendMail((emailMsg));
    let statusMessage=" ";
    if(sendmailStatus.rejected.length){
        statusMessage="no pudimos enviar";
    }else{
        statusMessage="mensaje enviado";
    }
    res.render("contact", {statusMessage})
}
}

);
    module.exports= router;