const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { sql, poolPromise } = require('../model/dbConfig');

// Passport Local Strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {

            const pool = await poolPromise;
            const result = await pool.request()
              .input('username', sql.VarChar, user.username)
              .query('SELECT * FROM TAIKHOAN WHERE username = @username');

            if (result.recordset.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            let user = result.recordset[0];

            // Compare passwords
            if (password !== user.password) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
        
    }
));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        let pool = await sql.connect(dbConfig);

        let result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM TAIKHOAN WHERE id = @id');

        if (result.recordset.length === 0) {
            return done(new Error('User not found'));
        }

        let user = result.recordset[0];
        done(null, user);

    } catch (err) {
        done(err);
    }
});

module.exports = passport;