import passport from 'passport';
import LocalStrategy from 'passport-local';
import { userController } from '../controllers/controllers.js';


// ** Passport 
passport.serializeUser( async (user, done) => {
    console.log('serialize')
    return done(null, user.id);
});

passport.deserializeUser( async (userId, done) => {
    console.log('deserialize')
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
            email: email,
            password: password,
            name: req.body.name ,
            surname: req.body.surname ,
            age: req.body.age ? req.body.age : null,
            phone: req.body.phone ? req.body.phone : null,
        }, );
        
        return done(null, userDb)
    }
));

export {
    passport
}