const path = require("path");

module.exports = {
  account: (req, res) => {
    res.sendFile(path.join(process.cwd(), "view", "account.html"));
  },
};
