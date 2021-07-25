const User = require("./models/Location");

async function createUser() {
    try {
        const newUser = await User.create({
            address: "2779 Aborn Rd",
            city: "San Jose",
            state: "CA",
            zip: "95121"
        });
    } catch (err) { 
        console.log(err);
    }
}

// async function createUser() {
//     const newUser = await User.create({
//         address: "811 Kifer Rd",
//         city: "Sunnyvale",
//         state: "CA",
//         zip: "94086"
//     });
// }

console.log("Starting User.js");
createUser();