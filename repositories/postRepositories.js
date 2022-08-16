import connection from "../dbStrategy/database.js";

async function insertPost(userId, url, text){
    return await connection.query(`
            INSERT INTO posts ("userId", url, "postText")
            VALUES ($1, $2, $3)
            `, [userId, url, text]);
}

async function selectLastPost(){
    return await connection.query(`
                SELECT * 
                FROM posts
                ORDER BY "createdAt" DESC
                LIMIT 1;
                `);
}

async function relatePostWHashtag(postId,hashtagId){
    return connection.query(`
                    INSERT INTO posts_hashtags ("postId", "hashtagId")
                    VALUES ($1, $2)
                    `, [postId, hashtagId])
}

async function deletePost(postId){
    return await connection.query(`
                    DELETE FROM posts
                    WHERE id = $1;
                    `, [postId]);
}

async function getTimelinePosts(limit){
    return await connection.query(`
                SELECT * 
                FROM posts
                JOIN users ON users.id = posts."userId"
                JOIN metadata ON metadata."postId" = posts.id
                ORDER BY posts.id DESC`)
}

export const postRepository = {
    insertPost,
    selectLastPost,
    relatePostWHashtag,
    deletePost,
    getTimelinePosts
}