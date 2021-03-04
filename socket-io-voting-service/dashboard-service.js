const app = require("express")();
const http =require("http").Server(app);
const io =require("socket.io")(http);
const mongo = require("mongodb").MongoClient;
const port =process.env.PORT || 9091;

io.of("/dashboard").on("connection", socket =>{
   mongo.connect("mongodb://localhost:27017/?replicaSet=rs", {
       useUnifiedTopology:true
   }).then(
       client=>{
           const db =client.db("technology-voting-db");
           const collection = db.collection("angularVotes");
           collection.aggregate([
            {
            $group: {
            _id: "$technologyName",
            "Application Requirements" : { $avg : "$requirements"},
            "Developing SPA" : { $avg : "$spa"},
            "Other Platforms" : {$avg: "$otherPlatforms"},
            "Complete Solutions" : {$avg : "$solution"},
            "Speed and Performance" : {$avg : "$speedAndPerformance"}
           }
           }
           ]).toArray((err, docs) =>{
               if(err){
                   socket.emit("mongoError", err);
               }
               else{
                  socket.emit("onAngularVotes", docs); 
               }
           })
           const changeStream = collection.watch();
           changeStream.on("change", ()=>{
            collection.aggregate([
                {
                $group: {
                _id: "$technologyName",
                "Application Requirements" : { $avg : "$requirements"},
                "Developing SPA" : { $avg : "$spa"},
                "Other Platforms" : {$avg: "$otherPlatforms"},
                "Complete Solutions" : {$avg : "$solution"},
                "Speed and Performance" : {$avg : "$speedAndPerformance"}
               }
               }
               ]).toArray((err, docs) =>{
                   if(err){
                       io.of("/dashboard").emit("mongoError", err);
                   }
                   else{
                       io.emit("/dashboard").emit("onAngularVotes", docs)
                   }
               })
           })
       }
   )
});

http.listen(port, ()=>{
    console.log(`Dashboard Service is listening on PORT - ${port}`);
})