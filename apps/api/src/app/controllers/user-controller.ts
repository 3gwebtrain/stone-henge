import * as bcrypt from 'bcrypt';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../environments/environment';
import userModel from '../model/user-model';

export interface IGetUserAuthInfoRequest extends Request {
  id: string;
}

export const userSignUp: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (error) {
    throw new Error(error);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'User already exist, Login instead' });
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const user = new userModel({
    name: name,
    email: email,
    password: hashPassword,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ message: user });
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (error) {
    return new Error(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: 'User not found, Sign up please' });
  }
  const veryfyPassword = await bcrypt.compareSync(
    password,
    existingUser.password
  );
  if (!veryfyPassword) {
    return res.status(400).json({ message: 'Invalid Email / Password ' });
  }
  const webToken = jwt.sign({ id: existingUser.id }, environment.secretkey, {
    expiresIn: '1d',
  });

  res.cookie('user_token', webToken);

  return res.sendStatus(200).json({
    message: 'Successfully Logged In',
    user: existingUser,
  });
};

export const verifyToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const newCookie = req.cookies;

  console.log('token', newCookie);
  // if (!token) {
  //   res.status(400).json({ message: 'No token found' });
  // }
  // jwt.verify(
  //   String(token),
  //   environment.secretkey,
  //   (err, user: { id: string }) => {
  //     if (err) {
  //       return res.status(400).json({ message: 'Invalid token' });
  //     }
  //     req.id = user.id;
  //   }
  // );
  // next();
};

export const getUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.id;
  let user;

  try {
    user = await userModel.findById(userId, '-password');
  } catch (error) {
    return new Error(error);
  }

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  return res.status(200).json({ user });
};
