const mon = require("mongoose");


async function connectDB(){
    await mon.connect(process.env.MON_URI)
    console.log("Connect to DB")
}

module.exports = connectDB

