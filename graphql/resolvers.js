const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
module.exports = {
  hello() {
    return {
      text: "Hello World Welcome GraphQL",
      views: 40,
    };
  },
  async createUser({ userInput }, req) {
    // const email = args.userInput.email;
    // const email = userInput.email;
    const errors = [];
    if (validator.isEmail(userInput.email)) {
      errors.push({ message: "Email-invalid !" });
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({message :'Password is too short !'});
    }
    if (errors.length > 0 ) {
      const error = new Error('Invalid Error .');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User existing already.");
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
      _id: createdUser._id.toString(),
    };
  },
};
