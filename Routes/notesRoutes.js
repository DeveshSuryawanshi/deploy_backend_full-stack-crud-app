const express = require("express");
const { NoteModel } = require("../modles/notesModel");
const {auth} = require("../Middlewares/auth.middleware");

const noteRouter = express.Router();

noteRouter.post("/create",auth, async(req, res)=>{
    try {
        const notes = new NoteModel(req.body);
        await notes.save();
        res.send({"msg" : "A new note has been Added"});
    } catch (error) {
        res.send({"error" : error});
    }
})

noteRouter.get("/", auth, async(req, res)=>{
    try {
        const notes = await NoteModel.find();
        res.send(notes);
    } catch (error) {
        res.send({"error" : error});
    }
})

noteRouter.patch("/update/:noteID", auth, async(req, res)=>{
    const {noteID} = req.params;
    const note = await NoteModel.findOne({_id : noteID})
    try {
        if(req.body.userID !== note.userID){
            res.send({"msg" : "You are not Authorized!"});
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID}, req.body);
            res.send({"msg" : `Note with ID ${noteID} is updated!!`});
        }
    } catch (error) {
        res.send({"error" : error});
    }
})


noteRouter.delete("/delete/:noteID", auth, async(req, res)=>{
    const {noteID} = req.params;
    try {
        await NoteModel.findByIdAndDelete({_id:noteID});
        res.send({"msg" : `Note with ID ${noteID} is deleted!!`});
    } catch (error) {
        res.send({"error" : error});
    }
})



module.exports = {
    noteRouter
}