import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'dbuser', // 본인의 mysql user id
    database: 'tutorial', // 본인이 만든 데이터베이스 이름으로 수정하세요
    password: 'dbuser123!', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

const promisePool = pool.promise(); //위에 있는 함수가 동작
//이 밑에 sql 문 작성
const sql = {
 
  getUsers : async () => {
    const [rows] = await promisePool.query(`
      SELECT * FROM student 
    `)
    
    return rows
  },
}

module.exports = sql