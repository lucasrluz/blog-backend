import express from 'express';
import { postRoute } from './api/post/postRoute';
import { userRoute } from './api/user/userRoute';
import { userAuthRoute } from './api/userAuth/userAuthRoute';

export const app = express();

app.use(express.json());
app.use(userAuthRoute);
app.use(userRoute);
app.use(postRoute);
