import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectMongoDB()
    await User.create({name, password:hashedPassword, email})
  
  
    return NextResponse.json(
      {
        message: "User registered",
      }, 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occcured while reggistering the user.",
      },
      { status: 500 }
    );
  }
}