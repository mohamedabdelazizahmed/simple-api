const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

 const User = require('../models/user');
module.exports = {
  hello() {
    return {
      text: "Hello World Welcome GraphQL",
      views: 40,
    };
  },
  async createUser({userInput} , req){
    // const email = args.userInput.email;
    // const email = userInput.email;
    const existingUser  = await User.findOne({email :userInput.email});
    if (existingUser) {
      const error = new Error('User existing already.');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);

    const user = new User({
      email: userInput.email,
      password: hashedPw,
      name: userInput.name,
    });
    const createdUser = await user.save();
    console.log(createdUser);
    return {
      ...createdUser._doc,
      _id: createdUser._id.toString()
    }
  }
};
