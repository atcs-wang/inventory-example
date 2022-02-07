import * as express from "express";
// requiresAuth allowed you to require authentication for specific routes
import { requiresAuth, claimEquals, claimIncludes, claimCheck } from 'express-openid-connect';
import {router as apiRouter} from './api'
import * as db from '../db/db'
import * as rbac from "../middleware/rbac";


// function checkAuth (req : express.Request, : (claim) => ) : boolean

export const register = ( app: express.Application ) => {

    // define a route handler for the default home page
    app.get( "/", ( req, res ) => {
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

    app.get('/profile', requiresAuth(), claimCheck((req, claims) => {
        // tslint:disable-next-line:no-console
        console.log(claims);
        return true;
      }),
      async (req, res, next) => {
        try {
            res.send(`<pre>user:  ${JSON.stringify(req.oidc.user,null, 2)}
            \nidTokenClaims: ${JSON.stringify(req.oidc.idTokenClaims, null, 2)}<pre>`);
        } catch(err) {
            next(err);
        }


      });

    app.use("/api", apiRouter);

    app.use("/users", requiresAuth(), rbac.checkPermission("read:users"), async (req, res) => {
        const user = req.oidc ? req.oidc.user : null;

        try {
            const users = await db.queryPromise(`
                SELECT DISTINCT user_id
                FROM stuff
            `, );

            res.render( "users" , {isAuthenticated: req.oidc.isAuthenticated(), user, users});
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( err );
        }
    } );
};