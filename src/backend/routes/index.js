var express = require('express');
const passport = require('../api/passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', async (err, user, info) => {

    // Error handling
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // DB querying
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('username', sql.VarChar, user.username)
        .query('SELECT * FROM Users WHERE username = @username');
    } catch (err) {
      return next(err);
    }

    // Log in
    req.logIn(user, (err) => {
      if (err) return next(err);
    });

  })(req, res, next);
});

router.get('/logout', function (req, res, next) {
  req.logout((err) => {
    req.session.destroy();
    if (err) return next(err);
  });
});

module.exports = router;
