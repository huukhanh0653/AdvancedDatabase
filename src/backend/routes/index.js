var express = require("express");
const passport = require("../middleware/passport");
const { isEmployee, isCustomer } = require("../middleware/auth");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello World");
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      return res.json({ message: "Logged in" });
    });
  })(req, res, next);
});

router.post("/register", function (req, res, next) {});

router.get("/logout", function (req, res, next) {
  req.logout((err) => {
    req.session.destroy();
    if (err) {
      console.log(err);
      return next(err);
    }
  });
});

module.exports = router;
