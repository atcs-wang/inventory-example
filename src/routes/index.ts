import * as express from "express";
// requiresAuth allowed you to require authentication for specific routes
import { requiresAuth } from 'express-openid-connect';

export const register = ( app: express.Application ) => {

    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        res.render( "index" );
    } );

    // define a secure route handler for the guitars page
    app.get( "/stuff", requiresAuth() , ( req: any, res ) => {
        res.render( "stuff" );
    } );

        // Can check state of authentication in a route
    app.get("/testauth", (req, res) => {
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    })

    app.get('/profile', requiresAuth(), (req, res) => {
        res.send(JSON.stringify(req.oidc.user));
      });
};