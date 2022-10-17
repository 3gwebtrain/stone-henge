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

  return res.json({ message: user });
};

export const userLogin: RequestHandler = async (
  req: Request,
  res: Response
) => {
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

  const webToken = jwt.sign({ id: existingUser._id }, environment.secretkey, {
    expiresIn: '30s',
  });

  res.cookie(String(existingUser._id), webToken, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 3),
    httpOnly: true,
    sameSite: 'lax',
  });

  return res.json({
    message: 'Successfully Logged In',
    user: existingUser,
    token: webToken,
  });
};

export const verifyToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token = String(req.headers.cookie).split('=')[1];

  if (!token) {
    res.status(400).json({ message: 'No token found' });
  }
  jwt.verify(
    String(token),
    environment.secretkey,
    (err, user: { id: string; name: string; email: string }) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid token' });
      }
      req.id = user.id;
    }
  );
  next();
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
  return res.json({ user });
};
