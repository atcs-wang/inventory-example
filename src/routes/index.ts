import * as express from "express";
// requiresAuth allowed you to require authentication for specific routes
import { requiresAuth } from 'express-openid-connect';

export const register = ( app: express.Application ) => {

    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        const user = req.oidc ? req.oidc.user : null;
        res.render( "index" , {isAuthenticated: req.oidc.isAuthenticated(), user});
    } );

    // define a secure route handler for the stuff page
    app.get( "/stuff", requiresAuth() , ( req: any, res ) => {
        const user = req.oidc ? req.oidc.user : null;
        res.render( "stuff" , {isAuthenticated: req.oidc.isAuthenticated(), user});
    } );

    //     // Can check state of authentication in a route
    // app.get("/testauth", (req, res) => {
    //     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    // })

    // app.get('/profile', requiresAuth(), (req, res) => {
    //     res.send(JSON.stringify(req.oidc.user));
    //   });
};