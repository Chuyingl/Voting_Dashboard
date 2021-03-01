const express =require("express");
const bodyParser =require("body-parser");
const cors =require("cors");
const morgan =require("morgan");

const ngRoutes = require("./routes/ng-questions-routes");

const app = express();
const port = process.env.PORT || 9090

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

app.use(cors());
app.use(morgan("dev"))

app.use("/api", ngRoutes);
app.listen(port, ()=>{console.log(`Voting Service is listening on PORT : ${port}`)});