const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  req.flash("message", "Logged out successfully!");
  res.redirect("/login");
};

module.exports = logout;
