import * as authRepository from '../data/auth.js';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from "../config.js";

// async function makeToken(id) {
//     const token = jwt.sign({
//         id: id,
//         isAdmin: false
//     },
//     secret, {expiresIn: '1h'})
//     return token;
// }

function createJwtToken(id) {
    return jwt.sign({id}, config.jwt.secretkey, {expiresIn: config.jwt.expiresInSec});
}

export async function signup(req, res, next) {
    let {username, password, name, email, url} = req.body;
    const found = await authRepository.findByUsername(username);
    if (found) {
        return res.status(409).json({message:`${username}이 이미 있습니다.`})
    }

    password = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await authRepository.createUser({username, password, name, email, url}); //중괄호를 넣으면 요거 자체를 객체로 받을 수 있음
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}
 
export async function login(req, res, next) {
    const {username, password} = req.body;
    // const user = await authRepository.login(username);
    const user = await authRepository.findByUsername(username);
    if (!user) {
        return res.status(401).json({message: `아이디를 찾을 수 없음`});
    }
    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({message: `아이디 또는 비밀번호 오류`});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}

// export async function verify(req, res, next) {
//     // 토큰이 유효한지 확인해주는 기능
//     const token = req.header['Token'];
//     if (token) {
//         res.status(200).json(token);
//     }
// }

export async function me(req, res, next) {
    const user = await authRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({message: `일치하는 사용자가 없음`});

    }
    res.status(200).json({token: req.token, username: user.username});
}