//Manually creating a user option

const User = require("./models/Location");

async function createUser() {
    try {
        const newUser = await User.create({
            address: "250 N Bascom Ave",
            city: "San Jose",
            state: "CA",
            zip: "95128"
        });
    } catch (err) { 
        console.log(err);
    }
}

console.log("Starting User.js");
createUser();