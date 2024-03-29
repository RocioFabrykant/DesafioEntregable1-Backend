import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const PRIVATE_KEY = 'coder39760'
export const generateToken = (user) => {
    const token = jwt.sign({
        user
    }, PRIVATE_KEY, {
        expiresIn: '24h'
    })
    return token;
}

export const generateTokenReset = (user) => {
    const tokenReset = jwt.sign({
        user
    }, PRIVATE_KEY, {
        expiresIn: '1h'
    })

    return tokenReset;

}


export const authTokenReset = (req, res, next) => {
    const token = req.params.token;
    console.log(token);
    if (!token) return res.status(401).send({
        error: "Not authenticated"
    });

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({
            error: 'not authorized'
        });
        req.user = credentials.user;
        console.log(req.email);
        next();
    });
}

export const authToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) return res.status(401).send({
        error: 'No Authenticated'
    })
    const token = authToken.split(' ')[1];

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {

        if (error) return res.status(403).send({
            error: 'not authorized'
        })
        req.user = credentials.user;
        next();
    })
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {

        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({
                    error: info.messages ? info.messages : info.toString()
                })
            }
            req.user = user;
            next();
        })(req, res, next)
    }

}

export const authorization = (role) => {
    return async (req, res, next) => {
        if (req.user.role != role) return res.status(403).send({
            error: 'Not permissions'
        })
        next();
    }
}

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);



export default __dirname;