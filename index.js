const express=require("express")
const authRouter=require("./router/router")
// const restricted=require("./middleware/restrict_mw")

const server=express();

server.use(express.json())
server.use(authRouter)
server.use("/", (req, res)=>{
    const {name}= req.body.name
    res.json({message: `!!!!Welcome to HowtoZ  !! `})
})

// server.use()





const port =process.env.PORT ||  4444;

//server

server.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})

