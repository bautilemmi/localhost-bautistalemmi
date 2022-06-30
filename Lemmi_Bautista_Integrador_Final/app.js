const express = require("express");
const hbs = require("express-handlebars");
const routeLogin= require("./routes/login");
const routeIndex= require("./routes/index");
const routeContact= require("./routes/contact");
const routeInicio= require("./routes/inicio");
const routeDestinos = require("./routes/destinos");
const path = require("path");
const session = require("express-session")
const PORT = process.env.PORT||3000; 


require("dotenv").config();

const app = express();

app.use(
    session({
        secret: "openSesam3@",
        resave: false,
        saveUninitialized: true
    })
)


const isAuth = async(req, res, next)=>{
    if(req.session.user){
        app.locals.user = req.session.user
        next()
    } else{
        res.render("noAuth") 
    }
}




app.use(express.urlencoded({extended: false}));

app.engine(".hbs", hbs.engine({extname: "hbs"}));
app.set("view engine", "hbs");
app.set("views", "./views");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use("/",  routeIndex);
app.use("/login", routeLogin);
app.use("/contact", routeContact);
app.use("/destinos", routeDestinos);
app.use("/inicio", isAuth, routeInicio);






app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});

