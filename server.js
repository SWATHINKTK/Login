const express = require('express');
const path = require('path');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const router = require('./router');

const app = express();

app.use('/login', nocache());

const Hostname = '127.0.0.1';
const Port = 5000;

app.set('view engine','ejs');

//Middleware
app.use(express.urlencoded({extended:true}));
app.use('/css',express.static(path.join(__dirname,'public','css')));
app.use('/asserts',express.static(path.join(__dirname,'public/asserts')));
app.use(session({
    secret:uuidv4(),
    resave:'false',
    saveUnintialized:true
}));
app.use('/route',router);
 

//Home page
app.get('/', (req, res) => {
    res.render('main',{title:'Login'})
});


app.listen(Port, Hostname, () => {
    console.log(`Server is running on http://${Hostname}:${Port}/`)
});