import client from "../config/dbClient.ts";
//  db schema
// CREATE TABLE labels (
//     label_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     label_name VARCHAR(50) NOT NULL,
//     user_id UUID NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT fk_labels_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
//     CONSTRAINT unique_label_per_user UNIQUE (label_name, user_id)
// );

export const createLabelRepository=async(labelName:string,user_id:string):Promise<boolean>=>{
    try {
        const result=await client.query(
            'INSERT INTO labels (label_name, user_id) VALUES ($1, $2)',
            [labelName,user_id]
        );
        // if the label has been added then return true else return false
        return result.rowCount as number > 0;
    } catch (error: any) {
        // Check if it's a unique constraint violation
        if (error.code === '23505') {
            throw new Error('Label with this name already exists for this user');
        }
        throw error;
    }
}
    //  implement get labels from the db
export const getlabelsRepository=async()=>{
const labels=await client.query(
    'SELECT * FROM labels'
);
return labels.rows;
}

export const getLabelByNameRepository=async(labelName:string)=>{
    const result=await client.query(
        'SELECT label_id, label_name FROM labels WHERE label_name=$1',
        [labelName]
    );
    return result.rows[0] || null;
}

export const updateLabelRepository=async (user_id:string,label_id:string,label_name:string)=>{
 
    const result=await client.query(
        'UPDATE labels SET label_name=$1 WHERE label_id=$2 AND user_id=$3',
        [label_name,label_id,user_id]
    );
    return result.rowCount as number > 0;
}

export const deleteLabelRepository=async (user_id:string,label_id:string)=>{
    // check if the label exists for this user
    const isExistingLabel=await client.query(
        'SELECT label_id FROM labels WHERE label_id=$1 AND user_id=$2',
        [label_id,user_id]
    );
    
    // if label doesn't exist, throw error
    if (isExistingLabel.rowCount === 0) {
        throw new Error('Label not found');
    }
    
    // delete the label
    const result=await client.query(
        'DELETE FROM labels WHERE label_id=$1 AND user_id=$2',
        [label_id,user_id]
    );
    
    // return true if deletion was successful
    return result.rowCount as number > 0;
}

// assign label to issue repository
export const assignLabelToIssueRepository=async(issue_id:string,label_id:string):Promise<boolean>=>{
    // first check if the label and issue exist
    const issueCheck=await client.query(
        'SELECT issue_id FROM issues WHERE issue_id=$1',
        [issue_id]
    );
    if(issueCheck.rowCount===0){
        throw new Error("Issue not found");
    }
    // check for the label existence
    const labelCheck=await client.query(
        'SELECT label_id FROM labels WHERE label_id=$1',
        [label_id]
    );
    if(labelCheck.rowCount===0){
        throw new Error("Label not found");
    }

        // now proceed with the assignment
        // check if the same issue has same label assigned already
    const assignmentCheck=await client.query(
        'SELECT * FROM issue_labels WHERE issue_id=$1 AND label_id=$2',
        [issue_id,label_id]
    );
    if(assignmentCheck.rowCount as number>0){
        throw new Error("This label is already assigned to the issue");
    }
    try {
        const result=await client.query(    
            'INSERT INTO issue_labels (issue_id, label_id) VALUES ($1, $2)',
            [issue_id,label_id]
        );
        return result.rowCount as number > 0;
    } catch (error: any) {
        //it is many to many relationhship which means one label can have many issues and one issue can have many labels
        throw  new Error(error.message);
    }
}



export const unassignLabelFromIssueRepository=async(issue_id:string,label_id:string):Promise<boolean>=>{
    // Check if the assignment exists (single query approach)
    const assignmentCheck=await client.query(
        'SELECT * FROM issue_labels WHERE issue_id=$1 AND label_id=$2',
        [issue_id,label_id]
    );
    
    if(assignmentCheck.rowCount===0){
        throw new Error("Label is not assigned to this issue");
    }
    
    // Proceed with the unassignment
    const result=await client.query(
        'DELETE FROM issue_labels WHERE issue_id=$1 AND label_id=$2',
        [issue_id,label_id]
    );
    return result.rowCount as number > 0;
}

