//Authentication and authorization are critical components of any security framework, ensuring that only legitimate users gain access to systems and that their actions are controlled according to their permissions.

//Authentication=> purpose is to confirm the identity of a user or system while
//Authorization=> control access to resources and define what authenticated users can do.

const User = require("../model/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required!!!" }); //Username & password error message

  const foundUser = await User.findOne({ username: user }).exec();  //The code finds a user in the database whose username matches the username provided.

  if (!foundUser) return res.sendStatus(401); // unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);  //The code compares the password with username provided while bcrypt harsh the password

  if (match) {
    const roles = Object.values(foundUser.roles); // 

    // create JWTs
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    // const roles = Object.values(foundUser.roles);
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });

    res.json({
      success: `User ${user} (Team-Lead) is logged in Successfully!!!`,
    }); // Success message throw when Successfully logged in
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
};
