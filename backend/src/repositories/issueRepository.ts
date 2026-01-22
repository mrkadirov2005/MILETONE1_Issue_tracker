import client from "../config/dbClient.ts";
// all CRUD of the issues will be handled here
// db sample
// issue_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     issue_details TEXT NOT NULL,
//     issue_status VARCHAR(20) NOT NULL,
//     issue_priority VARCHAR(20) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     created_by UUID NOT NULL,
//     CONSTRAINT fk_issues_user FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
//     CONSTRAINT chk_issue_status CHECK (issue_status IN ('todo', 'in-progress', 'done', 'cancelled')),
//     CONSTRAINT chk_issue_priority CHECK (issue_priority IN ('low', 'medium', 'high'))

export const getAllIssuesRepository = async (limit: number = 10, offset: number = 0) => {
    const query = `
        SELECT * FROM issues
        LIMIT $1 OFFSET $2;
    `;
    const values = [limit, offset];
    const result = await client.query(query, values);
    return result.rows;
}

export const getAllIssuesWithLabelsRepository = async (limit: number = 10, offset: number = 0, search: string = '', issueStatus: string = '', issuePriority: string = '', labelId: string = '') => {
    let query = '';
    let values: any[] = [];

    if (labelId) {
        // Query with label filter only
        query = `
            SELECT 
                i.issue_id,
                i.issue_details,
                i.issue_status,
                i.issue_priority,
                i.created_at,
                i.updated_at,
                i.created_by,
                l.label_id,
                l.label_name
            FROM issues i
            LEFT JOIN issue_labels il ON i.issue_id = il.issue_id
            LEFT JOIN labels l ON il.label_id = l.label_id
            WHERE i.issue_id IN (
                SELECT i2.issue_id FROM issues i2
                JOIN issue_labels il2 ON i2.issue_id = il2.issue_id
                WHERE il2.label_id = $1::uuid
                ORDER BY i2.issue_id
                LIMIT $2 OFFSET $3
            )
            ORDER BY i.issue_id;
        `;
        values = [labelId, limit, offset];
    } else {
        // Query with search and other filters
        query = `
            SELECT 
                i.issue_id,
                i.issue_details,
                i.issue_status,
                i.issue_priority,
                i.created_at,
                i.updated_at,
                i.created_by,
                l.label_id,
                l.label_name
            FROM issues i
            LEFT JOIN issue_labels il ON i.issue_id = il.issue_id
            LEFT JOIN labels l ON il.label_id = l.label_id
            WHERE i.issue_id IN (
                SELECT issue_id FROM issues 
                WHERE issue_details ILIKE $1
                AND (issue_status = $2 OR $2 = '')
                AND (issue_priority = $3 OR $3 = '')
                ORDER BY issue_id
                LIMIT $4 OFFSET $5
            )
            ORDER BY i.issue_id;
        `;
        values = [`%${search}%`, issueStatus, issuePriority, limit, offset];
    }

    const result = await client.query(query, values);
    return result.rows;
}

export const getTotalIssuesCountRepository = async () => {
    const query = `SELECT COUNT(*) as total FROM issues;`;
    const result = await client.query(query);
    return parseInt(result.rows[0].total);
}
export const createIssueRepository = async (issue_details:string, issue_status:string, issue_priority:string, created_by:string) => {
    // validate the input fields
    if(!issue_details || !issue_status || !issue_priority || !created_by) {
        throw new Error("All fields must be provided and valid data");
    }
    // insert the issue into the database
    const query = `
        INSERT INTO issues (issue_details, issue_status, issue_priority, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [issue_details, issue_status, issue_priority, created_by];
    const result = await client.query(query, values);
    return result.rows[0];
}
// function to get issue by id
export const getIssueByIdRepository = async (issueId: string) => {
    // Get the issue with its associated labels
    const query = `
        SELECT 
            i.issue_id,
            i.issue_details,
            i.issue_status,
            i.issue_priority,
            i.created_at,
            i.updated_at,
            i.created_by,
            l.label_id,
            l.label_name
        FROM issues i
        LEFT JOIN issue_labels il ON i.issue_id = il.issue_id
        LEFT JOIN labels l ON il.label_id = l.label_id
        WHERE i.issue_id = $1
        ORDER BY l.label_id;
    `;
    const values = [issueId];
    const result = await client.query(query, values);
    
    if (result.rows.length === 0) {
        return null;
    }
    
    // Aggregate the result into a single issue object with labels array
    const issue = {
        issue_id: result.rows[0].issue_id,
        issue_details: result.rows[0].issue_details,
        issue_status: result.rows[0].issue_status,
        issue_priority: result.rows[0].issue_priority,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at,
        created_by: result.rows[0].created_by,
        labels: result.rows
            .filter((row: any) => row.label_id !== null)
            .map((row: any) => ({
                label_id: row.label_id,
                label_name: row.label_name
            }))
    };
    
    return issue;
}

// function to update issue by id
export const updateIssueByIdRepository = async (issueId: string, issue_details:string, issue_status:string, issue_priority:string,created_by:string) => {
    // first check is the issue actaully belong to the user requesting
    const getIssueQuery = `
        SELECT * FROM issues WHERE issue_id = $1;
    `;
    const getIssueValues = [issueId];
    const getIssueResult = await client.query(getIssueQuery, getIssueValues);
    const issue = getIssueResult.rows[0];
    if (!issue) {
        throw new Error("Issue not found");
    }
    if (issue.created_by !== created_by) {
        throw new Error("Unauthorized: You can only update your own issues");
    }
   //all of the fields will be provided
    const query = `
        UPDATE issues
        SET issue_details = COALESCE($1, issue_details),
            issue_status = COALESCE($2, issue_status),
            issue_priority = COALESCE($3, issue_priority),
            updated_at = CURRENT_TIMESTAMP
        WHERE issue_id = $4
        RETURNING *;
    `;
    const values = [issue_details, issue_status, issue_priority, issueId];
    const result = await client.query(query, values);
    return result.rows[0];
}
// function to delete issue by id
export const deleteIssueByIdRepository = async (issueId: string,created_by:string) => {
//    first get the issue by id and check if the created_by matches
    const getIssueQuery = `
        SELECT * FROM issues WHERE issue_id = $1;
    `;
    const getIssueValues = [issueId];
    const getIssueResult = await client.query(getIssueQuery, getIssueValues);
    const issue = getIssueResult.rows[0];   
    // now check is the user the same
    if (!issue) {
        throw new Error("Issue not found");
    }
    if (issue.created_by !== created_by) {
        throw new Error("Unauthorized: You can only delete your own issues");
    }
    const deleteQuery = `
        DELETE FROM issues WHERE issue_id = $1;
    `;
    const deleteValues = [issueId];
    const deleteResult = await client.query(deleteQuery, deleteValues);
    return deleteResult.rowCount as number > 0;
}


export const getIssuesByLabel=async(label_name:string)=>{

    // we will get teh label name :
    // what we have to do is get the label id from the labels table
    const labelResult=await client.query(
        'SELECT label_id FROM labels WHERE label_name=$1',
        [label_name]
    );
// and now we have to get the labels from the issue_labels table using the label id
    if(labelResult.rowCount===0){
        return []; // return empty array if label not found
    }
    const label_id=labelResult.rows[0].label_id;
    // get issue ids from the issue labels table
    const query=`
        SELECT 
            i.issue_id, 
            i.issue_details,
            i.issue_status,
            i.issue_priority,
            i.created_at,
            i.updated_at,
            i.created_by
        FROM issues i
        JOIN issue_labels il ON i.issue_id = il.issue_id
        WHERE il.label_id = $1;
    `;
    const values=[label_id];
    const result=await client.query(query,values);
    return result.rows;
}