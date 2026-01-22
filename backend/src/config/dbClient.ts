import dbConfig from "./dbConnection.ts";
 const client = await dbConfig.connect();
 export default client;