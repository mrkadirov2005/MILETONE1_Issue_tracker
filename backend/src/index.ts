import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dbConfig from './config/dbConnection.ts';
import swaggerSpec from './config/swagger.ts';

// import the route files
import authRoutes from "./routes/auth_routes.ts"
import issueRoutes from "./routes/issue_routes.ts"
import labelRoutes from "./routes/label_routes.ts"
import commentRoutes from "./routes/comment_routes.ts"
import tokenRoutes from "./routes/token_routes.ts"

import { logIncomingRequest } from './middlewares/log/logComingRoutes.ts';
import { tokenVerifier } from './middlewares/tokenVerifyMiddleware.ts';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all domains
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

// log coming requests
app.use(logIncomingRequest);
// auth route handlers
app.use('/auth',authRoutes)

// validate token 
app.use(async(req:Request,res:Response,next)=>{
    const isValidToken=await tokenVerifier(req);
    if(!isValidToken){
        return res.status(401).json({ error: "Invalid or missing token" });
    }
    next();
});

app.use('/issue',issueRoutes)
app.use('/label',labelRoutes)
app.use('/comment',commentRoutes)
// router for verifying token status
app.use('/token',tokenRoutes)


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Database:', dbConfig ? 'Connected' : 'Connecting...');
});
