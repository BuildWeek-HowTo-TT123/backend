//  const dotenv=require("dotenv")
const express=require("express")
const cors=require("cors")
const helmet=require("helmet")
// const cookieParser=require("cookie-parser")
const authRouter=require("./router/router")


const server=express();
server.use(helmet())
server.use(cors())
server.use(express.json())
// server.use(cookieParser)
server.use("/api",authRouter)
server.get("/", (req, res)=>{
    
   res.json({message: `!!!!Welcome to HowtoZ00  !!!!! `})
})

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  });
 
// server.use()

module.exports=server