import {Request, Response} from 'express';
import pool from '../models/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'worisecretkey'

export const register = async(req: Request, res: Response) => {
 //1. get username, password, name, email
 //2. query db per fare insert in db
 //3. return message (good or not)
 const {username,email,password } = req.body;
 try {
    const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);
    const result = await pool.query(
        'INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *',
        [username,email,hashedPassword]
    );
    const user = result.rows[0]; //prima riga di risultati (ne devo avere solo una)
    res.status(201).json({message: 'User registered successfully',user});
 } catch (error) {
    res.status(500).json({error: 'Failed to register user'});
 }
}

export const login = async(req: Request, res: Response) => {
    //1. get email and password
    //2. verify if email exists than check password
    //3. return message if pwd wrong
    //4. return TOKEN!
    const {email, password} = req.body;
    try {
    
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 ',
        [email]
    );
    const user = result.rows[0]; //prima riga di risultati (ne devo avere solo una)
    res.status(201).json({message: 'User registered successfully',user});
    if(!user) return res.status(404).json({error: 'User not found'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({error: 'Invalid credentials'});

    const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '10h'});
    res.json()
 } catch (error) {
    res.status(500).json({error: 'Failed to register user'});
 }
}