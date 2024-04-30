import * as authRepository from '../data/auth.js';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


const secret = "abcd1234%^&*";
async function makeToken(id) {
    const token = jwt.sign({
        id: id,
        isAdmin: false
    },
    secret, {expiresIn: '1h'})
    return token;
}

export async function signup(req, res, next) {
    const {username, password, name, email} = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    const users = await authRepository.createUser(username, hashed, name, email);
    if (users) {
        res.status(201).json(users);
    }
}

export async function login(req, res, next) {
    const {username, password} = req.body;
    const user = await authRepository.login(username);
    // const passwd = await bcrypt.hashSync(authRepository.login(password), 10);
    if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password); // 비밀번호 확인
        if (isValidPassword) {
            res.status(201).header('Token', makeToken(username)).json(`${username} 로그인 완료`);
        }
        else {
            res.status(404).json({message: `${username}님 아이디 또는 비밀번호 확인하세요.`})
        }
    }
    else {
        res.status(404).json({ message: `${username}님 아이디가 존재하지 않습니다.` });
    }
}

export async function verify(req, res, next) {
    // 토큰이 유효한지 확인해주는 기능
    const token = req.header['Token'];
    if (token) {
        res.status(200).json(token);
    }
}