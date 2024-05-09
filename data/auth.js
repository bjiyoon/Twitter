import MongoDB from 'mongodb';
import { getUsers } from '../db/database.js';

const ObjectID = MongoDB.ObjectId; 
//데이터를 저장할 떄 BSON으로 저장..형태는 JSON이랑 똑같이 생김
//ObjectId : 테이블 개념이 따로 없으므로 동일한 데이터를 구분할 방법이 없어서 고유한 ID를 부여해주는 거라 보면 됨

// 아이디(username) 중복검사
export async function findByUsername(username){ 
    return getUsers().find({username}).next().then(mapOptionalUser);
}

// id 중복검사
export async function findById(id){
    return getUsers().find({_id: new ObjectID(id)}).next().then(mapOptionalUser); // 몽고디비 objectid 형으로 바꿈
}

export async function createUser(user){
    return getUsers().insertOne(user).then((result) => console.log(result.insertedId.toString()));
}

// export async function login(username){
//     const user = users.find((user) => user.username === username)
//     return user;
// }


function mapOptionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user; // user._id = ObjectId값을 스트링화 시킴(?)
}















// const DataTypes = SQ.DataTypes; // SQ 데이터 형을 가져와서 넣어줌(INTEGER, STRING 등등)

// export const User = sequelize.define(
//     'user', 
//     //데이터 테이블이 존재하지 않는다면 만들고 시작
//     //ORM은 테이블 생성하면 자동으로 s를 붙여줌
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primarykey: true
//         },
//         username: {
//             type: DataTypes.STRING(50),
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING(150),
//             allowNull: false
//         },
//         name: {
//             type: DataTypes.STRING(50),
//             allowNull: false
//         },
//         email: {
//             tyle: DataTypes.STRING(50),
//             allowNull: false
//         },
//         url: DataTypes.STRING(1000)
//     },
//     { timestamps: false }
// );
// // 아이디(username) 중복검사
// export async function findByUsername(username){ 
//     return User.findOne({where: {username}}); // 데이터를 한 개만 찾아옴. 여러 개면 제일 처음 녀석으로
// }
// // id 중복검사
// export async function findById(id){
//     return User.findByPk(id); // pk로 찾는다
// }

// export async function createUser(user){
//     return User.create(user).then((date) => data.dataValues.id)
// }
// // export async function login(username){
// //     const user = users.find((user) => user.username === username)
// //     return user;
// // }
