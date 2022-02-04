// TypeScript prefers to use the import module syntax over require
import dotenv from "dotenv";
import express from "express";
import path from "path";
import morgan from "morgan"
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";

// initialize configuration
dotenv.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.PORT;

const app = express();
// Configure Express to parse incoming JSON data
app.use( express.json() );
// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );
// Configure Express to serve static files in the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// Configure session auth
sessionAuth.register( app );

// Configure routes
routes.register( app );

// start the Express server
app.listen( port, () => {
    // TypeScript doesn't like console.log in production code.
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );