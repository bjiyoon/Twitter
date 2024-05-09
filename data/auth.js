import SQ, { DATE } from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes; // SQ 데이터 형을 가져와서 넣어줌(INTEGER, STRING 등등)

export const User = sequelize.define(
    'user', 
    //데이터 테이블이 존재하지 않는다면 만들고 시작
    //ORM은 테이블 생성하면 자동으로 s를 붙여줌
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primarykey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            tyle: DataTypes.STRING(50),
            allowNull: false
        },
        url: DataTypes.STRING(1000)
    },
    { timestamps: false }
);

// 아이디(username) 중복검사
export async function findByUsername(username){ 
    return User.findOne({where: {username}}); // 데이터를 한 개만 찾아옴. 여러 개면 제일 처음 녀석으로
}
// id 중복검사
export async function findById(id){
    return User.findByPk(id); // pk로 찾는다
}

export async function createUser(user){
    return User.create(user).then((date) => data.dataValues.id)
}
// export async function login(username){
//     const user = users.find((user) => user.username === username)
//     return user;
// }