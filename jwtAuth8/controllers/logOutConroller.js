const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized if no token provided
  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  ); //The code finds a user in the database whose refresh token matches the provided token.

  if (!foundUser) {
    res.clearCookies("jwt", { httpONLY: true });
    return res.sendStatus(204);
  } // Forbidden if no token provided

  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"));

  res.clearCookies("jwt", { httpONLY: true });
  return res.sendStatus(204);

  // Evaluate JWT

  //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
  //     if (err || foundUser.username !== decoded.username)
  //       return res.sendStatus(403);
  //     const accessToken = jwt.sign(
  //       { username: decoded.username },
  //       process.env.ACCESS_TOKEN_SECRET,
  //       { expiresIn: "60s" }
  //     );
  //     res.json({ accessToken });
  //   });
};

module.exports = { handleLogout };
