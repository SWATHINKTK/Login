const express = require('express');
const router = express.Router();
const nocache = require('nocache');


router.use('/login', nocache());

const login_data = {
    username : "admin@gmail.com",
    password : 1234
};


  

router.post('/login' , (req,res) => {
    if(login_data.username == req.body.username && login_data.password == req.body.password)
    {
        req.session.user = req.body.username;
        res.redirect('/route/logged');
    }
    else
    {
        res.render('main',{title:'login',data:"invalid Entry"})
    }
} );


router.get('/logged', (req,res) => {
    if(req.session.user)
    {
        res.render('logged',{title:'swathin',user:req.session.user});
    }
});


router.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            res.render('main',{title:"login",data:"Logout Sucessfull"})
        }
    });

});


router.get('/*', (req,res) => {
    res.writeHead(404)
    res.send("Url is Note Working");
});

module.exports = router;
