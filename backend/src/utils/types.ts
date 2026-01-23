
export interface AuthRequestProps{
    email:string,
    password:string
}

// db schema interfaces
export interface User{
    user_id:string,
    user_email:string,
    user_password_hash:string,
    created_at:Date,
}

export interface UserRequestBody{
    user_email:string,
    user_password:string
}
export interface UserSentDetails extends Omit<User,'user_password_hash' | 'created_at'>{}

export interface Labels{

    label_id:string,
    label_name:string,
    user_id:string,
    created_at:Date
}

export interface Issue{
   issue_id:string,
    issue_details:string,
    issue_status:'todo' | 'in-progress' | 'done' | 'cancelled',
    issue_priority:'low' | 'medium' | 'high',
    created_at:Date,
    updated_at:Date,
    created_by:string,
    assigned_to?:string | null

}

export interface RefreshToken{
    token_id:number,
    user_id:string,
    token:string,
    created_at:Date,
    expires_at:Date,
    is_revoked:boolean
}

export interface issueLabels{
    "issue_id":string,
    "label_id":string
}


// createIssueRequestBody interface
export type IssueStatus='todo' | 'in-progress' | 'done' | 'cancelled';
export type IssuePriority='low' | 'medium' | 'high';
export interface CreateIssueRequestBody{
    issue_details:string,
    issue_status:IssueStatus,
    issue_priority:IssuePriority,
    created_by:string,
    assigned_to?:string | null
}
export interface Comments{
    comment_id:string,
    issue_id:string,
    user_id:string,
    comment_details:string,
    created_at:Date,
}

export interface CommentRequestBody{
    issue_id:string,
    user_id:string,
    comment_details:string
}
// update comment request body
export interface UpdateCommentRequestBody {
comment_id: string,
 comment_details:string,
  user_id:string
}
export interface deleteCommentRequestBody {
    comment_id: string,
    user_id:string
}
