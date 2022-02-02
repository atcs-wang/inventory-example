
import { auth } from 'express-openid-connect';

export const register = (app : any ) => {

    const config = {
        authRequired: false,
        auth0Logout: true,
        secret: process.env.AUTH0_CLIENT_SECRET,
        baseURL: process.env.AUTH0_HOST_URL,
        clientID: process.env.AUTH0_CLIENT_ID,
        issuerBaseURL: process.env.AUTH0_ORG_URL
    };
    // Creates the /login and /logout routes
    app.use(auth(config));

}