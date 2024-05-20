const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };
  
  const fsPromises = require("fs").promises;
  const path = require("path");
  
  const handleLogout = async (req, res) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized if no token provided
  
      const refreshToken = cookies.jwt;
  
      const foundUser = usersDB.users.find(
        (person) => person.refreshToken === refreshToken
      ); // Find user in the database whose refresh token matches the provided token
  
      if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true });
        return res.sendStatus(204); // No Content
      }
  
      // Remove the refresh token from the user's data
      const otherUsers = usersDB.users.filter(
        (person) => person.refreshToken !== foundUser.refreshToken
      );
      const currentUser = { ...foundUser, refreshToken: "" };
      usersDB.setUsers([...otherUsers, currentUser]);
  
      // Write the updated users array to the file
      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users, null, 2) // Pretty-print the JSON with 2-space indentation
      );
  
      // Clear the cookie
      res.clearCookie("jwt", { httpOnly: true });
      return res.sendStatus(204); // No Content
    } catch (error) {
      console.error('Error handling logout:', error);
      res.sendStatus(500); // Internal Server Error
    }
  };
  
  module.exports = { handleLogout };
  