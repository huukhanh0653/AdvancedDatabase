const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { sql, poolPromise } = require("../model/dbConfig");

// Passport Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("username", username)
        .query("SELECT * FROM TAIKHOAN WHERE Username = @username");

      if (!result) {
        console.log(result);
        return done(null, false, { message: "Incorrect username." });
      }

      let user = result.recordset[0];
      console.log(user);

      // Compare passwords
      if (password !== user.Password) {
        return done(null, false, { message: "Incorrect password." });
      }

      // Check if user is active
      if (!user.IsActive) {
        return done(null, false, { message: "User is not active." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser(async (username, done) => {
  try {
    let pool = await sql.connect(dbConfig);

    let result = await pool
      .request()
      .input("Username", sql.VarChar, username)
      .query("SELECT * FROM TAIKHOAN WHERE Username = @username");

    if (result.recordset.length === 0) {
      return done(new Error("User not found"));
    }

    let user = result.recordset[0];
    done(null, user); 
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
