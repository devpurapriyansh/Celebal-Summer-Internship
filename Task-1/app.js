const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoute = require('./Routes/UserRoutes');
const adminRoute = require('./Routes/AdminRoutes');

const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./helper/documentation");

const CONNECTION_URL ="mongodb+srv://admin:admin_admin@cluster0.anhvw.mongodb.net/?retryWrites=true&w=majority";
require('dotenv').config({path: './config.env'})

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose
    .connect(CONNECTION_URL,{
        useUnifiedTopology: true,
            useNewUrlParser: true
}).then(()=>{
    console.log("MongoDB is Running");
}).catch(()=>{
    console.error("MongoDB connection failed")
})

app.use(userRoute);
app.use(adminRoute);

app.use("/documentation",swaggerDoc.serve);
app.use("/documentation",swaggerDoc.setup(swaggerDocumentation));

const Port = process.env.PORT || 4000
app.listen(Port, () => {
    console.log(`Connection established successfully on port number: ${Port}`)
})