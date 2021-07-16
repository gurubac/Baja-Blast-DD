const User = require("./models/Location");

async function createUser() {
    const newUser = await User.create({
        address: "2779 Aborn Rd",
        city: "San Jose",
        state: "CA",
        zip: "95121"
    });
}

//createUser();

async function findUser(address) {
    const user = await User.findOne({ address: /aborn/i });
    console.log(user);
}

findUser("asdfasdf");