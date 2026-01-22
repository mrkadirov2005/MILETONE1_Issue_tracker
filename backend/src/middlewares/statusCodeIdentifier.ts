// list all status codes as javasbcript object
export const StatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};
interface StatusCodeDetail {
    [key: string]: number | string;
    message: string;
}

export const StatusCodeDetails: StatusCodeDetail[] = [
    {OK: 200, message: "Successful"},
    {CREATED: 201, message: "Created"},
    {BAD_REQUEST: 400, message: "Bad Request"},
    {UNAUTHORIZED: 401, message: "Unauthorized"},
    {FORBIDDEN: 403, message: "Forbidden"},
    {NOT_FOUND: 404, message: "Not Found"},
    {INTERNAL_SERVER_ERROR: 500, message: "Internal Server Error"}
];


export function getReturnMessage(code: number): string {
    const status = StatusCodeDetails.find(status => Object.values(status).includes(code));
    return status ? status.message : "Unknown Status Code";
}
