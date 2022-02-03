import {Router} from 'express'
// import { requiresAuth } from 'express-openid-connect';
import * as db from '../db/db'
export const router = Router();

// Get the user's sub property as the id for the database
router.use( (req: any, res, next) => {
    req.user_id = req.oidc.user.email;
    next();
})

router.get("/stuff/all", async (req:any, res, next) => {
    try {
        const stuff = await db.queryPromise(`
            SELECT
                id,
                name,
                quantity
            FROM stuff
            WHERE user_id = ?
        `, [req.user_id]);
        return res.json(stuff);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json( err );
    }
});



router.get("/stuff/total", (req:any, res, next) => {

    db.queryCallback(`
        SELECT count(*) as total
        FROM stuff
        WHERE user_id = ?
        `,
        [req.user_id],
        (err, results) => {
            if (err) {
                // tslint:disable-next-line:no-console
                console.error(err);
                res.json( err );
            }
            return res.json(results[0].total);
    });

});


router.get("/stuff/find/:search", async (req:any, res, next) => {
    try {
        const stuff = await db.queryPromise(`
            SELECT
                id,
                name,
                quantity
            FROM stuff
            WHERE user_id = ?
            AND (name LIKE ?)
        `, [req.user_id, `%${req.params.search}%`]);
        return res.json(stuff);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json( err );
    }
});

router.post("/stuff/add", async (req: any, res, next) => {
    // tslint:disable-next-line:no-console
    console.log(req.body);
    try {
        const results = await db.queryPromise(`
            INSERT INTO stuff
                (user_id, name, quantity)
            VALUES
                (?, ?, ?)
        `, [req.user_id, req.body.name, req.body.quantity]);
        return res.json({id: results.insertId});
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json( err );
    }
})


router.post("/stuff/update", async (req: any, res, next) => {
    try {
        const results = await db.queryPromise(`
            UPDATE stuff
            SET
                name = ?,
                quantity = ?
            WHERE
                id = ?
                and user_id = ?
        `, [req.body.name, req.body.quantity, req.body.id, req.user_id]);
        return res.json({changedRows: results.changedRows});
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json( err );
    }
})


router.delete("/stuff/remove/:id", async (req: any, res, next) => {
    try {
        const results = await db.queryPromise(`
            DELETE
            FROM stuff
            WHERE
                id = ?
                and user_id = ?
        `, [req.params.id, req.user_id]);
        return res.json({affectedRows: results.affectedRows});
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json( err );
    }
})


// define a secure route handler for the stuff page
router.get( "/tester", ( req: any, res ) => {
    const user = req.oidc ? req.oidc.user : null;
    res.render( "apiTester" , {isAuthenticated: req.oidc.isAuthenticated(), user});
} );