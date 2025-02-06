// import express from 'express';
// import cors from 'cors';
// import { json } from 'body-parser';
// import mysql from 'mysql2';
// import dotenv from 'dotenv';
// import { body, validationResult } from 'express-validation'

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(cors());
// app.use(express.json());
  
// const connectDB = async () => {

//     return await mysql.createConnection({
//         host: process.env.DB_Host,
//         user: process.env.DB_User,
//         password: process.env.DB_Password,
//         database: process.env.DB_Name
//     });
// };
// let db;
//     connectDB().then(connection => {
//         db = connection;
//     }).catch(error => {
//         console.error("database connection faildes", error);
//     });
// app.post(
//     '/registration',
//     [
//         body('name').notEmpty().withMessage('Name is required'),
//         body('middlename').notEmpty().withMessage('Middlename is required'),
//         body('lastname').notEmpty().withMessage('Lastname is required'),
//         body('email').isEmail().withMessage('Invalid Email'),
//         body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 Character'),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const { name, middlename, lastname, email, password } = req.body;

//         try {
//             const [rows] = await db.execute('SELECT * FROM tbl_user WHERE email =?', [email]);
//             if (rows.length > 0) {
//                 return res.status(400).json({ message: 'Email already exist' });
//             }
//             await db.execute('INSERT into tbl_user (name, lastname, middlename, email, password) VALUES (?, ?, ?, ?, ?)', [name, lastname, middlename, password]);
//             res.status(201).json({ message: 'User registered successfully' });
//         } catch (error) {
//             res.status(500).json({ message: 'Server error', error });
//         }

//     }
// );

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });


