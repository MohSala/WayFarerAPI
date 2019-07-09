// import express from 'express';
// import bodyParser from 'body-parser';
// import users from './server/routers/users';

// const app = express();
// const router = express.Router();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// const port = process.env.PORT || 3001;
// // when a random route is inputed
// app.get('*', (req, res) => res.status(200).send({
//    message: 'Welcome to this API.'
// }));

// app.use('/api/v1/auth/', users);

// app.listen(port, () => {
//    console.log(`Server is running on PORT ${port}`);
// });
// export default app;