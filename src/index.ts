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
async function createUser(username: string, email: string) {
    const values = [username, email];
    const query = `INSERT INTO users2 (username,email) VALUES ($1,$2);`
    await client.query(query,values)
}
createUser('anjali',"anj@gmail.com")