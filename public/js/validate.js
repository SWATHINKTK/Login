document.getElementById('username').addEventListener('blur',() =>{
    const username = document.getElementById('username').value;
    // const email_type = /[a-zA-Z._]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z.]{2,}/; 
    const email_type = /^[a-zA-Z0-9_-@#$.]{3,16}$/
    if(username.trim() == "" || username == null )
    {
        document.getElementById('user_valid').innerHTML = "*enter the field";
    }
    else if(!(username.match(email_type)))
    {
        document.getElementById('user_valid').innerHTML = "*enter proper format";
    }
    else
    {
            document.getElementById('user_valid').innerHTML = "";
    }
});

document.getElementById('username').addEventListener('blur',() =>{
    const password = document.getElementById('password').value;
    const pass_type = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{4,10}$/;
    if(password.trim() == "" || password == null )
    {
        document.getElementById('pass_valid').innerHTML = "*enter the field";
    }
    else if(!(pass_type.match(password)))
    {
        document.getElementById('pass_valid').innerHTML = "*enter proper format";
    }
    else
    {
            document.getElementById('pass_valid').innerHTML = "";
    }
});