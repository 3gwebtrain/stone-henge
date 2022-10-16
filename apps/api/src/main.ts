import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import userRouter from './app/routes/users-routes';
import { environment } from './environments/environment';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', userRouter);

const port = process.env.port || 3333;

mongoose
  .connect(environment.BASE_URL)
  .then(() => {
    console.log('Mongo DB connected');
    const server = app.listen(port, () => {
      console.log('Listening at http://localhost:' + port + '/api');
    });
    server.on('error', console.error);
  })
  .catch((err) => console.log(err));
