import mysql from "mysql2"; //mysql2 모듈을 사용합니다.

//데이터베이스 연결
const pool = mysql.createPool(  //sql에서 사용할 pool을 만들어줍니다.
    process.env.JAWSDB_URL ??{
        host: 'localhost',
        user: 'root',
        database: 'week8',
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
export const selectSql = {      //getEmployee, getDepartment를 select 문으로 정의합니다.
    getEmployee : async () =>{
        const [rows] = await promisePool.query(`select * from employee`);
        console.log(rows)
        return rows
    },
    getDepartment: async () => {
        const [rows] = await promisePool.query(`select * from department`);
        return rows
    },
    //모두 select 문이므로 rows로 값을 리턴 받습니다.
}

//외부에서 함수를 사용하기 위해 export를 사용합니다. 
//insert query
export const insertSql = {  //setEmployee, setDepartment 함수를 정의합니다.
    //data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    setEmployee : async (data) => { //insert는 data를 받아야 합니다.
        //변수 사용을 위한 ` ` text 문을 사용합니다.
        //insert query를 적어줍니다. employee의 값을 입력 받습니다.
        const sql= `insert into employee values (   
            "${data.Fname}", "${data.Minit}", "${data.Lname}","${data.Ssn}", "${data.Bdate}",
            "${data.Address}", "${data.Sex}", "${data.Salary}", "${data.Super_ssn}", "${data.Dno}")`;

            await promisePool.query(sql);//query를 실행하면 sql을 쿼리가 실행하게됩니다.
    },         //insert문이라 되돌려주는 값 없이 이대로 끝냅니다.

    setDepartment : async (data) => {   //data를 입력 받습니다.
        //insert query를 적어줍니다. department의 값을 입력 받습니다.
      const sql=`insert into department values (
          "${data.Dname}", "${data.Dnumber}","${data.Mgr_ssn}", "${data.Mgr_start_date}")`;  
          
          await promisePool.query(sql);
        },
}   //insert 문을 사용하여 해당 변수에 맞게 데이터를 입력합니다.

//외부에서 함수를 사용하기 위해 export를 사용합니다. 
//update query
export const updateSql = {
    updateEmployee : async (data) => {
        //where 조건을 만족하는 행에 대해서 salary 수정
        //const sql=`update employee set salary = "${data.Salary}" where Minit = "${data.Minit}"`;
        const sql=`update employee set salary = "${data.Salary}" where Minit = "F"`;
        //Minit가 입력한 값인 데이터에 대해 salary 업데이트
        await promisePool.query(sql);
        //sql 만들고, 쿼리 함수의 파라미터로 넘겨줘서 실행하게 됩니다.
    },
    updateDepartment : async (data) =>{ //변수를 사용하기 때문에 data를 입력 받는 것입니다.
        //const sql=`update department set dname = "${data.Dname}" where Dnumber = "${data.Dnumber}"`;
        const sql=`update department set dname = "${data.Dname}" where Dnumber = 0`;
        //Dnumber가 입력받은 Dnumber의 데이터 행을 변경해주는 것 -> 즉 Dname을 수정할 때 사용 하는 것
        await promisePool.query(sql);
    },
}