const express = require('express');
const path = require('path');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const router = require('./router');
const nocache = require('nocache');

const app = express();

const Hostname = '127.0.0.1';
const Port = process.env.PORT || 5000;

app.set('view engine','ejs');

//Middleware
app.use(express.urlencoded({extended:true}));
app.use(nocache());

//path setting
app.use('/css',express.static(path.join(__dirname,'public','css')));
app.use('/asserts',express.static(path.join(__dirname,'public/asserts')));
app.use('/js',express.static(path.join(__dirname,'public/js')));


//Session creaation
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:false
}));

app.use('/route',router);
 

//Home page
app.get('/',(req, res) => {
    if(req.session.user)
    {
        res.redirect('/route/home');
        res.end();
    }
    else
    {
        res.render('main', { title: "Login page" });
    }
});


app.get('*',(req,res)=>{
    if(req.session.user){
        res.redirect('/route/home');
        res.end();
    }else{
        res.redirect('/');
        res.end();
    }
})

app.listen(Port, Hostname, () => {
    console.log(`Server is running on http://${Hostname}:${Port}/`)
});