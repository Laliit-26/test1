const express = require("express");
const app = express();
const marioModel = require("./models/marioChar");
const mongoose = require("mongoose");
const config = require("./config.json");



app.listen(4000, () => console.log(`App listening on port 4000!`));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
const DATABASE_URL = config.MONGODB_URI || "mongodb://localhost/subscribers";
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to databa"));
console.log("hii");

// your code goes here

app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD");
});
 
app.get("/mario",async(req,res)=>{
    try{
        const data=await marioModel.find();
    if(data){
        res.send({
            status:200,
            message:"here is your data",
            data:data
        })
    }
    else{
        res.send({
            status:202,
            message:"no data found"
        })
    }
}
catch(err){
    res.send({
        status:400,
        message:"internal error occured"
    })
}
});

app.get('/mario/:id',async (req,res)=>{
    
 
 try{
    const data=await marioModel.findOne({_id:req.params.id});
    if(data){
        res.send({
            status:200,
            message:"here is your data",
            data:data
        })
    }
    else{
        res.send({
            status:400,
            message:"no data found"
        })
    }
 }
catch(err){
    res.send({
        status:400,
        message:err
    });
    
}
})
