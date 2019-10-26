var http = require('http');
var fs = require('fs');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path')
const app = express()


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))


app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/public/index.html'));
});




var con = mysql.createConnection({
    host: "localhost",
    connectionLimit: 10,
    user: 'root',
    password: 'iBhargav@1',
    database: 'new',
    port: '3306'
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});



app.post("/submit", (req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var phoneno = req.body.phoneno;
    var country = req.body.country;
    const info = {
        email: email,
        name: name,
        password: password,
        phoneno: phoneno,
        country: country,
    }
    con.query("INSERT INTO registration (name,email,pass,phoneno,country) VALUES ('" + info.name + "','" + info.email + "','" + info.password + "','" + info.phoneno + "','" + info.country + "')", function(err, result) {
        if (err) throw err;
        console.log("1 record inserted")

    });



});
app.get('/submit', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/success.html'));

});
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index1.html'))
});

app.post("/login/success", function(req, res) {
    var email1 = req.body.email;
    var password1 = req.body.password;
    con.query('SELECT * FROM users WHERE email = ' + '"' + req.body.email + '"', function(err, res, result) {
        if (err) {
            res.send("Error, while logging in...")
        } else {
            if (result[1].pass == password1) {
                res.send("logged in successfully")
            } else {
                res.send("password is incorrect")
            }
        }

    });


});
app.listen(3000);