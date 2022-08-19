import connection from "../dbStrategy/database.js";

export async function followMiddleware(req, res, next) {

    try {
        const followedId = req.params.id;
        const myId = res.locals.id;

        const { rows } = await connection.query(`
            SELECT * FROM follows WHERE "followerId" = $1 AND "followedId" = $2
        `, [myId, followedId]);

        if (rows.length !== 0) {
            return res.sendStatus(409);
        }

        const { rowCount } = await connection.query(`
            SELECT * FROM users WHERE id = $1
        `, [followedId])

        if (!rowCount) {
            return res.sendStatus(409);
        }
        res.locals.followedId = followedId;
        next();
    } catch (error) {
       return res.status(500).send(error.message);
    }
}