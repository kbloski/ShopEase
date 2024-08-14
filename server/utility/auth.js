import passport from 'passport';
import LocalStrategy from 'passport-local';
import { userController } from '../controllers/controllers.js';

const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() ) return res.json( {msg: 'You are logged!'} );
    return next();
}

// ** Passport 
passport.use('local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done)=>{
        try {
            const userExists = await userController.getUserByEmail(email);
            if (!userExists) return done(null, false);
            const validResult = await userController.validPassword(password, userExists);
            if ( !validResult ) return done(null, false);
    
            return done(null, userExists)
        } catch(err){
            done(err)
        }
    })
)

passport.use(
    'local-register',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            
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

        } catch (err){
            done(error)
        }
    }
));

passport.serializeUser( async (user, done) => {
    try {
        return done(null, user.id);
    } catch (err){
        done(error)
    }
});

passport.deserializeUser( async (userId, done) => {
    try {
        const userDb = await userController.getById(userId);
        return done(null, userDb);
    } catch (err) {
        done(error)
    }
    
});

export {
    passport,
    checkLoggedIn
}