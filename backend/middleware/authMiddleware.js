import asyncHandler from "./asyncHandler.js";
import jwt, { decode } from 'jsonwebtoken';
import Admin from "../models/admin.js";

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const {userId} = decoded
        console.log(userId);
        
        
       
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });

  const authorizeAdmin  = (req, res, next) => {
    if (req.admin && req.admin.isAdmin) {
      next();
    } else {
      res.status(401).send('Not authotized as admin');
    }
  };

  export{authenticate,authorizeAdmin }