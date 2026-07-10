const express = require('express')
const noteModel = require('./models/note.model')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

/* 
API 
POST/NOTES => Create a note 
GET/notes =>Get all notes 
DELETE/notes=>Delete notes 
PATCH/notes=>update note
*/

app.post("/notes",async (req,res) => {
    const data = req.body 
    await noteModel.create({
        title:data.title,
        description:data.description
    })
    res.status(201).json({
        message: "Note Create Successfully..."
    })
})

app.get("/notes",async(req,res) => {
    const note = await noteModel.find() 
    console.log("Notes are :- ")

    res.status(200).json({
        message:"Note are :- ",
        notes : note
    })
})

app.delete("/relief/:id",async(req,res) => {
    const id = req.params.id 

    await noteModel.findOneAndDelete({
        _id:id     
    })
    res.status(200).json({
        message:"Delete Note"
    })
})

app.patch("/update/:id",async(req,res) => {
    const id = req.params.id 
    const description = req.body.description 

    await noteModel.findOneAndUpdate(
        {
            _id:id
        },
        {
            description:description
        }
)
    res.status(200).json({
        message:"Okay Update"
    })
})

module.exports = app