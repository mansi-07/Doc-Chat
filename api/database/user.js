const bcrypt = require("bcrypt");
const rounds = 10

const users = [
   {
       username:"Dr. Anand Kumar",
       email:"anandkumar@gmail.com",
       password:bcrypt.hashSync("dummypass",rounds),
       isDoc:true,
       desc:"ENT"
    },
    {
        username:"Dr. Sridevi Malhotra",
        email:"sridevi@gmail.com",
        password:bcrypt.hashSync("dummypass",rounds),
        isDoc:true,
        desc:"GP"
     },
     {
        username:"Dr. Devansh Sehgal",
        email:"devansh@gmail.com",
        password:bcrypt.hashSync("dummypass",rounds),
        isDoc:true,
        desc:"Dermatology"
     }
]
module.exports = users;