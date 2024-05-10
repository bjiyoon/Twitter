import mysql from 'mysql2';
import { config } from '../config.js';
import SQ from 'sequelize';
import Mongoose from 'mongoose';

let db;

export async function connectDB() {
    return Mongoose.connect(config.db.host)
    // return MongoDB.MongoClient.connect(config.db.host).then((client) => db = client.db()); //객체가 db로 리턴
}

export function useVirtualId(schema) {
    schema.virtual('id').get(function() {
        return this._id.toString();
    })
    schema.set('toJSN', {virtuals:true})
    schema.set('toObject', {virtuals:true}) //json형태로도 갖고있고 object로도 갖고있겠다 - 통신 및 객체이용하기 위해
}

export function getUsers() {
    return db.collection('users'); //ODM
}

export function getTweets() {
    return db.collection('tweets');
}