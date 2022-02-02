// TypeScript prefers to use the import module syntax over require
import express from "express";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // TypeScript doesn't like console.log in production code.
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );