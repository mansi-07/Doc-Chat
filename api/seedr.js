const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./database/user");
const User = require("./models/User");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

// Import data
const importData = async () =>{
    try {
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        console.log("Data Imported")

        process.exit()

    } catch (error) {
        console.log(`Error:${error}`)
        process.exit(1)
    }
}

// Delete all data
const deleteData = async () =>{
    try {

        await User.deleteMany()

        console.log("Data deleted")

        process.exit()

    } catch (error) {
        console.log(`Error:${error}`)
        process.exit(1)
    }
}

// Calling import and delete functions
if(process.argv[2]==='-del'){
    deleteData()
}else{
    importData()
}