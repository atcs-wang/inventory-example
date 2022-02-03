import {Router} from 'express'
import { nextTick } from 'process';
// import { requiresAuth } from 'express-openid-connect';
import * as db from '../db/db'
export const router = Router();

router.get("/stuff/all", async (req:any, res, next) => {
    try {

        const stuff = await db.queryPromise(`
            SELECT *
            FROM stuff
        `);
        return res.json(stuff);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        // res.json( { error: err.message || err } );
        next(err);
    }
});



router.get("/stuff/total", (req:any, res, next) => {

    db.queryCallback(`
        SELECT count(*) as total
        FROM stuff
        `,
        (err, results) => {
            if (err) {
                // tslint:disable-next-line:no-console
                console.error(err);
                // res.json( { error: err.message || err } );
                next(err);
            }
            return res.json(results[0].total);
    });

});
