const express = require("express");
const { connection } = require("./db");
const {userRouter} = require("./Routes/userRoutes");
const {noteRouter} = require("./Routes/notesRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req, res)=>{
    res.send("Home Page")
})


app.listen(8080, async()=>{
    try {
        await connection;
        console.log("Connected to the DB");
        console.log("Server is Runing on port 8080");

    } catch (error) {
        console.log(error);
    }
})