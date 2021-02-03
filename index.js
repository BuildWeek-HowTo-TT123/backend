

const server = require("./server");

const port =process.env.PORT ||  4444;

//server

server.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})

