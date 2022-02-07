
import { auth } from 'express-openid-connect';

export const register = (app : any ) => {

    const config = {
        authRequired: false,
        auth0Logout: true,
        secret: process.env.AUTH0_CLIENT_SECRET,
        baseURL: process.env.AUTH0_HOST_URL,
        clientID: process.env.AUTH0_CLIENT_ID,
        issuerBaseURL: process.env.AUTH0_ORG_URL,
        authorizationParams: {
            response_type: 'id_token',
            response_mode: 'form_post',
            scope: 'openid profile email'
        }
    };
    // Creates the /login and /logout routes
    app.use(auth(config));

}