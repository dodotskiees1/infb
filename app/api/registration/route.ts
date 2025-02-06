import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, middlename, lastname, month, day, year, gender, address, contact, email, password } = body;

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      const [rows] = await connection.execute("SELECT * FROM tbl_user WHERE email = ?", [email]);

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }


    const [result] = await connection.execute('INSERT INTO tbl_user (name, middle, lastname, month, day, year, gender, address, contact, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [name, middlename, lastname, month, day, year, gender, address, contact, email, password]);

        if (result && 'insertId' in result) {
            return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
          } else {
            return NextResponse.json({ message: "Error registering user" }, { status: 500 });
          }
   
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}