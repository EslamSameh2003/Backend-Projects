import express from "express";
import routes from "./src/Modules/Utils/app.controller.js";


const app = express();
const PORT = 4001;

app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`);
});

routes(express, app); 


