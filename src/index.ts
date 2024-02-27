import { Client } from 'pg'

const client = new Client({
    connectionString: "postgresql://Avijit2002:u3lJX5VSzvRY@ep-jolly-darkness-a1u7idxy.ap-southeast-1.aws.neon.tech/learning?sslmode=require"
})


async function dbConnect() {
    await client.connect()
    console.log("Db Connected")
}

dbConnect()

async function createTable() {
    await client.query(`CREATE TABLE IF NOT EXISTS users2 (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    );`)
}
//createTable()

// Do this to avoid sql injection
// If we directly put data coming from client in SQL string, it will be treated as SQL

async function createUser(username: string, email: string) {
    const values = [username, email];

    //const query = `INSERT INTO users2 (username,email) VALUES (${usrname},${email});` // insecure // here username can be a bad SQL query injected by hacker, 

    const query = `INSERT INTO users2 (username,email) VALUES ($1,$2);` // this is secure // here even if username is SQL query, no effect
    await client.query(query, values)
}
//createUser('anjali',"anj@gmail.com")


// --- RELATIONSHIPS --- //

async function createRelationTable() {
    await client.query(`CREATE TABLE IF NOT EXISTS users3 (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users3(id) ON DELETE CASCADE
    );
    `)
}

createRelationTable()
client.query(`INSERT INTO users3 (username,email,password) VALUES ("avi","avi@gmail.com","123");`)

client.query(`INSERT INTO addresses (user_id, city, country, street, pincode)
VALUES (1, 'New York', 'USA', '123 Broadway St', '10001');`)

client.query(`SELECT city, country, street, pincode
FROM addresses
WHERE user_id = 1;`)

//This would require transactions  in SQL to ensure either both the user information and address goes in, or neither does


// --- TRANSACTIONS --- //

// BEGIN; 

// INSERT INTO users (username, email, password)
// VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');

// INSERT INTO addresses (user_id, city, country, street, pincode)
// VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');

// COMMIT;


// if error ROLLBACK;


// PRISMA
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const user= prisma.user5.create({
    data:{
        name: "Avijit",
        email:"avi",
        address:"16 dhiren"
    }
})


