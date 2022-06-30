const express= require("express");
const router= express.Router();
const mdlUsers = require("../models/users")

router.get("/", (req, res)=>{
    res.render("login")
});

router.get("/logout", (req, res)=>{
    req.session.destroy();
    res.redirect("/")
});

router.post("/", async (req, res)=>{ 
    const {email, password} = req.body;
    const data = await mdlUsers.getUser(email, password); 

if(data != undefined) {
    console.log(req.session)
    req.session.user = email
    console.log((req.session.user))
    res.render("inicio", { data })
} else{
    const message = "usuario o contraseña incorrectos";
    res.render("login", { message });
}

});

module.exports= router