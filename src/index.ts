// TypeScript prefers to use the import module syntax over require
import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as sessionAuth from "./middleware/sessionAuth";


// initialize configuration
dotenv.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );


// Configure session auth
sessionAuth.register( app );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // render the index template
    res.render( "index" );
} );

// Can check state of authentication in a route
app.get("/testauth", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

// requiresAuth allowed you to require authentication for specific routes
import { requiresAuth } from 'express-openid-connect';

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

// start the Express server
app.listen( port, () => {
    // TypeScript doesn't like console.log in production code.
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );