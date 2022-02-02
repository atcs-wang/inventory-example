// TypeScript prefers to use the import module syntax over require
import express from "express";
import path from "path";
const app = express();
const port = 8080; // default port to listen

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // render the index template
    res.render( "index" );
} );

// start the Express server
app.listen( port, () => {
    // TypeScript doesn't like console.log in production code.
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );