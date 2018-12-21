var express = require('express');
var db = require('./models');
var path = require('path')

var app = express();
var port =  8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req,res)=> {
        res.sendFile(path.join(__dirname,'/public/index.html'));
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
            if(data){
               return res.json(data)
            } else {
                return res.status(404).json({"error":"user not found"})
            }
        })
    })
})


db.sequelize.sync({}).then( function(){
    app.listen(port, () => {
        console.log("listening to port " + port);
    });
})
