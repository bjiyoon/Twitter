import { getTweets, getUsers } from '../db/database.js';
import MongoDB, { ReturnDocument } from 'mongodb';
import * as authRepository from './auth.js';
import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

const tweetSchema = new Mongoose.Schema({
    text: {type: String, require: true},
    userId: {type: String, require: true},
    username: {type: String, require: true}, // require: 무조건 집어넣어야되냐
    name: {type: String, require: true},
    url: String
}, {timestamps: true})


useVirtualId(tweetSchema);
const Tweet = Mongoose.model('tweet', tweetSchema); //컬렉션 생성


// const ObjectID = MongoDB.ObjectId; 

// // 모든 트윗을 리턴
export async function getAll() {
    return Tweet.find().sort({createdAt: -1});
    // return getTweets().find().sort({createdAt:-1}).toArray().then(mapTweets); // -1 = DESC
};

// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return Tweet.find({username}).sort({createdAt: -1});
    // return getTweets().find({username}).sort({createdAt:-1}).toArray().then(mapTweets);
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return Tweet.findById(id);
    // return getTweets().find({_id: new ObjectID(id)}).next().then(mapOptionalTweet);
}

// 트윗을 작성
export async function create(text, userId){
    return authRepository.findById(userId).then((user) => new Tweet({
        text, userId, name: user.name, username: user.username, url: user.url
    }).save());

    // return authRepository.findById(userId).then((user) => getTweets().insertOne({
    //     text,
    //     userId,
    //     username: user.username,
    //     url: user.url
    // })).then((result) => getById(result.insertedId)).then(mapOptionalTweet);
}

// 트윗을 변경
export async function update(id, text){
    return Tweet.findByIdAndUpdate(id, {text}, {returnDocument: "after"}); // 업데이트후 받은내용으로 리턴
    // return getTweets().findOneAndUpdate({_id: new ObjectID(id)}, {$set: {text}}, {returnDocument:'after'}).then((result) => result).then(mapOptionalTweet);
}

// 트윗을 삭제
export async function remove(id){
    return Tweet.findByIdAndDelete(id);
    // return getTweets().deleteOne({_id: new ObjectID(id)});
}


function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}

function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, id: tweet.insertedId } : tweet;
}








// import { sequelize } from '../db/database.js';
// import { User } from './auth.js';

// const DataTypes = SQ.DataTypes;
// const Sequelize = sequelize;

// const INCLUDE_USER = {
//     attributes: [
//         'id',
//         'text',
//         'createdAt',
//         'userId',
//         [Sequelize.col('user.name'), 'name'],
//         [Sequelize.col('user.username'), 'username'],
//         [Sequelize.col('user.url'), 'url']
//     ],
//     include: {
//         model: User,
//         attributes: [],
//     }
// }

// const ORDER_DESC = {
//     order: [['createdAt', 'DESC']]
// }

// const Tweet = sequelize.define('tweet', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     text: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     }
    
// }, { timestamps: false })
// Tweet.belongsTo(User);


// // 모든 트윗을 리턴
// export async function getAll() {
//     return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC});
// };


// // 해당 아이디에 대한 트윗을 리턴
// export async function getAllByUsername(username){
//     return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC, include: {
//         ...INCLUDE_USER.include, where: {username}
//     }});
// }

// // 글번호에 대한 트윗을 리턴
// export async function getById(id){
//     return Tweet.findOne({where: {id}, ...INCLUDE_USER});
// }
// // 트윗을 작성
// export async function create(text, userId){
//     return Tweet.create({text, userId}).then((data) => this.getById(data.dataValues.id))
// }

// // 트윗을 변경
// export async function update(id, text){
//     return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
//         tweet.text = text;
//         return tweet.save(); // save를 해줘야 변경된게 리턴됨
//     })
// }
// // 트윗을 삭제
// export async function remove(id){
//     return Tweet.findByPk(id).then((tweet) => {
//         tweet.destroy();
//     })
// }