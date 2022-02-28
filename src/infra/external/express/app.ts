import express from 'express';
import { commentRoute } from './routes/commentRoute';
import { postRoute } from './routes/postRoute';
import { userAuthRoute } from './routes/userAuthRoute';
import { userRoute } from './routes/userRoute';

export const app = express();

app.use(express.json());
app.use(userAuthRoute);
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
