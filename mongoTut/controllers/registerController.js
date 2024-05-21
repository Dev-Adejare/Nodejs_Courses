const User = require("../model/User"); // replace the code below

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const duplicate = await User.findOne({ username: user }).exec(); //replace the duplicate code below

  // const duplicate = usersDB.users.find((person) => person.username === user);   // Check for duplicate username
  if (duplicate) return res.status(409); //meaning conflict

  try {
    // encrypting the password
    const hashedPwd = await bcrypt.hash(pwd, 10); // The number 10 indicates the cost factor, which determines how computationally intensive the hashing process is. Higher values increase the security but also require more processing time.

    //create and store new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });
    console.log(result);

    res.status(201).json({ success: `New User ${user} created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
