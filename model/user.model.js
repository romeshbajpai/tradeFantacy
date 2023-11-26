const pool = require('../configs/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = 'xesfe5ty565te4ty56uj7i87rt6ehyr54err4';

// const createUserTable = async () => {
//     try {
//         const connection = await pool.getConnection();

//         await connection.query(`
//             CREATE TABLE IF NOT EXISTS users(
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             username VARCHAR(255) NOT NULL,
//             email VARCHAR(255) NOT NULL,
//             password VARCHAR(255) NOT NULL,
//            )
//         `);

//         connection.release();
//         console.log('Users table created or already exists');
//     } catch (error) {
//         console.error('Error Creating users table:', error);
//     }
// }
const createUserTable = async () => { 
    try {
        const connection = await pool.getConnection();

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users(
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        connection.release();
        console.log('Users table created or already exists');
    } catch (error) {
        console.error('Error Creating users table:', error);
    }
};


const createUser = async (user) => { 
    const hashedPassword = await bcrypt.hash(user.password,10)
    const [rows] = await pool.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [user.username, user.email, hashedPassword]
    );
    return rows.insertId,user.username;
}

const getUserByUsername = async (username) => { 
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
        
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

const authenticateUser = async (username, password) => { 
    const [rows] = await pool.execute('SELECT * from users WHERE username= ?', [username]);
    if (rows.length ===0) {
        return null;
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return null;
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, SecretKey, { expiresIn: '1h' });
    return token;
}

module.exports = {
    createUserTable,
    createUser,
    getUserByUsername,
    authenticateUser
};