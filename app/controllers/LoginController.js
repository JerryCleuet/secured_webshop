const path = require("path");

module.exports = {
  login: (req, res) => {
    res.sendFile(path.join(process.cwd(), "view", "login.html"));
  },
};
