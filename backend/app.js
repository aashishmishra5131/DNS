import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

import domianRouter from './Routes/domain.router.js';
app.use("/api/v1",domianRouter)
export{app};