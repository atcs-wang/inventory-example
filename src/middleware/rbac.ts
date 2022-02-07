import {Request, Response, NextFunction} from 'express'
// https://informatics.missionbio.com/blog/implementing-role-based-access-control-with-auth0-and-express-js/

// generates middleware that checks for certain permission
export function checkPermission(permission :any){
    return (req :Request, res: Response, next: NextFunction) => {

        const permissions = req.oidc.user ? req.oidc.user['http://localhost:8080/claims/permissions'] : []
        if (permissions.includes(permission))
            return next();
        res.status(403).send()
    }
}
