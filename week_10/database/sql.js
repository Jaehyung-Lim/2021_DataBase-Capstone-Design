import mysql from "mysql2"; //mysql2 모듈을 사용합니다.

//데이터베이스 연결
const pool = mysql.createPool(  //sql에서 사용할 pool을 만들어줍니다.
    process.env.JAWSDB_URL ??{
        host: 'localhost',
        user: 'root',
        database: 'week10', //sql에 등록한 database가 week10임
        password: '8903056',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit:0
    }
);

//async / await 사용 -> await가 있으면 뒤의 명령을 끝낼 때 까지 기다려주겠다는 의미
const promisePool = pool.promise();

//외부에서 함수를 사용하기 위해 export를 사용합니다. 
//select qurey
export const selectSql = {      //getEmployee, getDepartment, getNation를 select 문으로 정의합니다.
    getUsers : async () =>{
        const [rows] = await promisePool.query(`select * from user`);
        return rows
    },
    getDepartment: async () => {
        const [rows] = await promisePool.query(`select * from department`);
        return rows
    },
    getNation: async () =>{
        const [rows] = await promisePool.query(`select * from nation`);
        return rows;
    },
    //모두 select 문이므로 rows로 값을 리턴 받습니다.
}

export const deleteSql = {
    deleteDepartment : async (data) =>{ //변수를 사용하기 때문에 data를 입력 받는 것입니다.
        console.log('deleteSql.deleteDepartment: ', data.Dnumber);       
        const sql=`delete from department where Dnumber = ${data.Dnumber}`;
        //입력받은 Dnumber의 데이터를 삭제하는 쿼리문
        await promisePool.query(sql);
    },
    deleteNation : async (data) => {
        console.log('deleteSql.deleteNation: ', data.Name);    
        const sql=`delete from nation where Name = "${data.Name}"`;   
        //입력받은 국가의 Name의 데이터를 삭제하는 쿼리문
        await promisePool.query(sql);
    }, 
}