import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { author as User } from "../models/bmsModel.js";

const signToken = (id: number) => {
  return jwt.sign({ id }, "this is the secret key put it in dotenv", {
    expiresIn: "5 days",
  });
};
const sendToken = async (
  user: { id: number; authorName: string;  },
  res: Response
) => {
  try {
    const token = await signToken(user.id);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({
      message: "User data and token send Successfully",
      userData: user,
      token,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong while sending cookie");
  }
};
export const login = 
  async (req: Request, res: Response, next: NextFunction) => {
    try{
    const { userId, userPassword } = req.body;
    const userData:any = await User.findOne({ where: { id: userId } }) as {id:number,authorName:string};
    if (!userData?.password) throw new Error("Invalid credentials!");
    const { password, userName, userRole, id } = userData;
    if (password === userPassword) {
        if(userData?.authorName && userData?.id)
         sendToken({ id, authorName:userData.authorName }, res);
    } else {
      res.status(401).json({
        message: "unauthorized invalid credentials !",
      });
    }}catch (err:unknown) {
      if(err instanceof Error){
        next(err);
      }
      next(err);
    }
  };
export const signup = 
  async (req: Request, res: Response, next: NextFunction) => {
    try{
    const { authorName,id } = req.body;
    const userData  = await User.create(req.body) as {id:number,authorName:string} ;
    if (!userData) {
      throw new Error(`Error creating user`);
      
    }
    if (userData && userData?.id) {
      const { id } = userData;
      sendToken({ id, authorName}, res);
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Something went wrong !" });
    }
}catch (err:unknown) {
      if(err instanceof Error){
        next(err);
      }
      next(err);
    }
  }

export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
  });
  res.status(200).json({
    message: "logout successfully",
  });
};










