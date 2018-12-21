var express = require('express');
var db = require('./models');

var app = express();
var port =  8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req,res)=> {
        res.send("wellcome home");
});

app.get("/api/users", (req,res)=> {
    db.User.findAll({}).then( function(data){
        res.json(data);
    })
});

app.post("/api/users", (req,res)=> {
    db.USer.create({
            email: req.body.email,
            password:req.body.passsword
    })
})

app.get('/api/users/:id', (req,res) =>{
    db.User.findOne({
        Where: {
            id : req.params.id
        }.then( function(data){
            res.json(data)
        })
    })
})


db.sequelize.sync({}).then( function(){
    app.listen(port, () => {
        console.log("listening to port " + port);
    });
})
