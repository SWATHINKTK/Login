const express = require('express');
const nocache = require('nocache');
const router = express.Router();

router.use(nocache());


const login_data = {
    username : "admin@gmail.com",
    password : "Abc@2"
};

//login Route
router.post('/login',(req,res) => {

    try
    {
        if(login_data.username == req.body.username && login_data.password == req.body.password)
        {
            req.session.user = req.body.username;
            // res.cookie('username',req.body.username)
            res.redirect('/route/home');
        }
        else
        {
            res.render('main',{title:'login',data:"invalid User"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send("Server error")
    }
} );


//home Route
router.get('/home', (req,res) => {
    if(req.session.user)
    {
        res.render('home',{title:'admin',user:req.session.user});
    }
});


router.get('/logout',nocache(),(req,res) => {
    req.session.destroy((err) => {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // res.render('main',{title:"login",data:"Logout Sucessfull"});
            res.redirect('/');
        }
    });

});



router.get('/*', (req,res) => {
    res.writeHead(500)
    res.send("Url is Note Working");
});

module.exports = router;
