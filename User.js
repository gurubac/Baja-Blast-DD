const User = require("./models/Location");

async function createUser() {
    const newUser = await User.create({
        address: "2779 Aborn Rd",
        city: "San Jose",
        state: "CA",
        zip: "95121"
    });
}

createUser();

async function findUser(address) {
    
    User.findOne({ address: address });
    console.log(`Found user: ${User.address}`);
}

findUser("2779 Aborn Rd");