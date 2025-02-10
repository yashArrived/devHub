const socket = require("socket.io");
const crypto = require ("crypto")





const generateSecretRoomId = (userId, targetUserId) => {
    return crypto.createHash("sha256").update([userId, targetUserId].sort().join("_")).digest("hex")
  }

const initialiseSocket = (server)=>{
    const io =  socket(server,{
        cors: {
                origin: "http://localhost:5173"
        },
    })
    
    io.on("connection",(socket)=>{
        //We handle events here
        socket.on("joinChat", ({userId , targetUserId})=>{
                const roomId = [userId, targetUserId].sort().join("_");
                socket.join(roomId);
                // console.log(fir)
        });
        socket.on("sendMessage", ({firstName , userId, targetUserId ,text })=>{
            const roomId = [userId, targetUserId].sort().join("_");
            io.to(roomId).emit("messageReceived", {firstName , text})
            console.log(firstName + " sent " + text);
            
        });
        socket.on("disconnect", ()=>{});
    });

};


module.exports = initialiseSocket;