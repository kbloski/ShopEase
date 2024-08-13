import passport from 'passport';
import LocalStrategy from 'passport-local';
import { userController } from '../controllers/controllers.js';


// ** Passport 
passport.serializeUser( async (user, done) => {
    return done(null, user.id);
});

passport.deserializeUser( async (userId, done) => {
    const userDb = await userController.getById(userId);
    return done(null, userDb);
});


passport.use(
    'local-register',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        if (await userController.getUserByEmail(email)) return done(null, false);

        const userDb = await userController.createUser({
            ...req.body
        }, );

        return done(null, userDb)
    }

));