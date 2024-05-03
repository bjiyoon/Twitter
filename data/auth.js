let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$hA2t2amVzMSZ4c5EbSgOH.WYWEZnAEvJoZ5xMU0x/pxV9xVNKl1mu',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
    },
    {
        id: '2',
        username: 'banana',
        password: '$2b$10$hA2t2amVzMSZ4c5EbSgOH.WYWEZnAEvJoZ5xMU0x/pxV9xVNKl1mu',
        name: '반하나',
        email: 'banana@banana.com',
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
    }
]
// 아이디(username) 중복검사
export async function findByUsername(username) {
    return users.find((user) => user.username === username);
}

// id 중복검사
export async function findById(id) {
    return users.find((user) => user.id === id);
}

export async function createUser(user) {
    const created = { id:'10', ...user }
    users.push(created)
    return created.id;
}


export async function login(username) {
    const user = users.find((user) => user.username === username)
    return user;
}

