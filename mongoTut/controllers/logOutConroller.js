const User = require("../model/User");

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content if no token provided

    const refreshToken = cookies.jwt;

    //Is refeshtoken in db?
    const foundUser = await User.findOne({ refreshToken }).exec(); // Find user in the database whose refresh token matches the provided token

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none", 
        secure: true,
      }); // it helps mitigate certain types of attacks
      return res.sendStatus(204); // No Content
    }

    // Clear the cookie
    foundUser.refreshToken = "";
    const result = await foundUser.save()
    console.log(result);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204); // No Content
  } catch (error) {
    console.error("Error handling logout:", error);
    res.sendStatus(500); // Internal Server Error
  }
};

module.exports = { handleLogout };
