const mon = require("mongoose")

const noteSchema = new mon.Schema({
    title : String,
    description : String,
})

const noteModel = mon.model("note",noteSchema)

/* 
CURD Operation
*/
module.exports = noteModel 




