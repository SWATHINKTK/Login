const express = require('express');
const path = require('path');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const router = require('./router');
const nocache = require('nocache');

const app = express();

const Hostname = '127.0.0.1';
const Port = 5000;

app.set('view engine','ejs');

//Middleware
app.use(express.urlencoded({extended:true}));

//Linking Files
app.use('/css',express.static(path.join(__dirname,'public','css')));
app.use('/asserts',express.static(path.join(__dirname,'public/asserts')));

const disableBackButton = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};

// Use the middleware for all routes or specific routes
app.use(disableBackButton);


app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:false
}));

app.use('/route',router);
 

//Home page
app.get('/', (req, res) => {
    if(req.session.user)
    {
        res.redirect('/route/logged')
    }
        res.render('main', { title: "Login page" });

});


app.listen(Port, Hostname, () => {
    console.log(`Server is running on http://${Hostname}:${Port}/`)
});