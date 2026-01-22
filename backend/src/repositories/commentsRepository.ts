// the repository for managing th CRUD on comments
// db sample

// CREATE TABLE comments (
//     comment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     issue_id UUID NOT NULL,
//     comment_details TEXT NOT NULL,
//     user_id UUID NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT fk_comments_issue FOREIGN KEY (issue_id) REFERENCES issues(issue_id) ON DELETE CASCADE,
//     CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
// );
import client from "../config/dbClient.ts";

// create comment repository
export const createCommentRepository = async (issue_id: string, comment_details: string, user_id: string): Promise<boolean> => {
    const result = await client.query(
        'INSERT INTO comments (issue_id, comment_details, user_id) VALUES ($1, $2, $3)',
        [issue_id, comment_details, user_id]
    );
    return result.rowCount as number > 0;
}
// get comments by issue id
export const getCommentsByIssueIdRepository = async (issue_id: string) => {
    const result = await client.query(
        'SELECT * FROM comments WHERE issue_id = $1 ORDER BY created_at DESC',
        [issue_id]
    );
    return result.rows;
}
// delete the comments by id
export const deleteCommentByIdRepository = async (comment_id: string, user_id: string): Promise<boolean> => {
    const result = await client.query(
        'DELETE FROM comments WHERE comment_id = $1 AND user_id = $2',
        [comment_id, user_id]
    );
    return result.rowCount as number > 0;
}
// get comments by id and update comment details
export const updateCommentByIdRepository = async (comment_id: string, comment_details: string, user_id: string): Promise<boolean> => {
    const result = await client.query(
        'UPDATE comments SET comment_details = $1, created_at = CURRENT_TIMESTAMP WHERE comment_id = $2 AND user_id = $3',
        [comment_details, comment_id, user_id]
    );
    return result.rowCount as number > 0;
}
// get comments by user id
export const getCommentsByUserIdRepository = async (user_id: string) => {
    const result = await client.query(
        'SELECT * FROM comments WHERE user_id = $1 ORDER BY created_at DESC',   
        [user_id]
    );
    return result.rows;
}