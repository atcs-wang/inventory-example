import * as express from "express";
// requiresAuth allowed you to require authentication for specific routes
import { requiresAuth } from 'express-openid-connect';
import {router as apiRouter} from './api'
import * as db from '../db/db'
export const register = ( app: express.Application ) => {

    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        const user = req.oidc ? req.oidc.user : null;
        res.render( "index" , {isAuthenticated: req.oidc.isAuthenticated(), user});
    } );

    // define a secure route handler for the stuff page
    app.get( "/stuff", requiresAuth() , async ( req: any, res ) => {
        const user = req.oidc ? req.oidc.user : null;

        try {
            const stuff = await db.queryPromise(`
                SELECT
                    id,
                    name,
                    quantity
                FROM stuff
                WHERE user_id = ?
            `, [req.oidc.user.email]);

            res.render( "stuff" , {isAuthenticated: req.oidc.isAuthenticated(), user, stuff});
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( err );
        }
    } );

    //     // Can check state of authentication in a route
    // app.get("/testauth", (req, res) => {
    //     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    // })

    app.get('/profile', requiresAuth(), (req, res) => {
        res.send(JSON.stringify(req.oidc.user));
      });

    app.use("/api", requiresAuth() ,apiRouter);
};