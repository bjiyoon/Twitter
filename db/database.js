import mysql from 'mysql2';
import { config } from '../config.js';
import SQ from 'sequelize';
import MongoDB from 'mongodb';

let db;

export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host).then((client) => db = client.db()); //객체가 db로 리턴
}

export function getUsers() {
    return db.collection('users'); //ODM
}

export function getTweets() {
    return db.collection('tweets');
}