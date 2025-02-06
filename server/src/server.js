import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator'; // Import from express-validator

import { json } from 'express'; // Using json() from express

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(json());  // Use the json middleware from express
  
const connectDB = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
};

let db;
connectDB().then(connection => {
    db = connection;
}).catch(error => {
    console.error("Database connection failed", error);
});

app.post(
    '/registration',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('middlename').notEmpty().withMessage('Middlename is required'),
        body('lastname').notEmpty().withMessage('Lastname is required'),
        body('month').notEmpty().withMessage('Month is required'),
        body('day').notEmpty().withMessage('day is required'),
        body('year').notEmpty().withMessage('year is required'),
        body('gender').notEmpty().withMessage('gender is required'),
        body('address').notEmpty().withMessage('address is required'),
        body('contact').notEmpty().withMessage('contact is required'),
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, middlename, lastname, month, day, year, gender, address, contact, email, password } = req.body;

        try {
            console.log("Received registration request:", req.body);
           
            if (!db) {
                console.error("Database connection is not initialized.");
                return res.status(500).json({ message: "Database connection error" });
            }

         
            const [rows] = await db.execute('SELECT * FROM tbl_user WHERE email = ?', [email]);
            if (rows.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

          
            await db.execute('INSERT INTO tbl_user (name, middle, lastname, month, day, year, gender, address, contact, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [name, middlename, lastname, month, day, year, gender, address, contact, email, password]);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error("Database error:", error); 
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
