const express = require('express');
const app = express();


const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');
const expressSession = require('express-session');

const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouters');
const index = require("./routes/index");


require("dotenv").config();

const db=require("./config/mongoose-connection");

app.use(express.json());
app.use(cookieParser());
app.use(
    expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.use(function (req, res, next) {
  res.locals.loggedIn = !!req.cookies.token;   // login code me jo cookie name hai wahi likho
  next();
});


app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.use("/",index);
// console.log("ROUTES:", index.stack.map(l => l.route && l.route.path));
app.use("/owners" ,ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);





app.listen(process.env.PORT || 3000);