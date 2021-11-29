import express from 'express';
import { userRoute } from './api/user/userRoute';

export const app = express();

app.use(express.json());
app.use(userRoute);
