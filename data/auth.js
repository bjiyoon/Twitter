let users = [
    {
        id: '1',
        username: 'apple',
        password: '1111',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
    }
]

export async function createUser(username, password, name, email) {
    const user = {
        id: 10,
        username,
        password,
        name,
        email,
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg'
    }
    users = [user, ...users]
    return users;
}

export async function login(username) {
    const user = users.find((user) => user.username === username)
    return user;
}