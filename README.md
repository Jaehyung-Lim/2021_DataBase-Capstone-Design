# 2021-DB <!--#은 1개부터 6개까지 있음. 개수에 따라 글자 크기가 달라지는 것. #이 가장 큰것, #6개가 가장 작은 것-->
2021 데이터베이스 설계 <!-- 마크다운 문법-->

<br><br> <!--띄어쓰기 공백-->

## 3주차 실습 실행 방법
1. 레포지토리 복사 (wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) get clone git@github.com:Jaehyung-Lim/2021-DB.git
    - (token을 사용하는 경우) git clone https://github.com/Jaehyung-Lim/2021-DB.get
2. week3 폴더로 이동
    > cd week3  <!--인용문 처럼 들어감-->
3. 콘솔창(power shell)에서 npm package 설치
    > npm install
4. database/sql.js에서 본인의 데이터베이스 정보 입력(주석 부분), 함수 구현

```c++
    cout<<"백틱으로 사용ddd한다." <<endl;
```


<pre>
<code>
const pool = mysql.createPool(
    process.env.jAWSDB_URL ??{
        host: 'localhost',
        user: 'root', //본인의 mysql user id
        database: 'tutorial', //본인이 만든 데이터베이스 이름
        password: 'password', //본인의 mysql password
        waitForConnextions: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);
</code>
</pre>

<br>

## <span style="color:red"> 테이블 작성법 </span>
 <!--테이블은 간단하게 이렇게 만듦-->
 <!--꼭 이렇게 대시 3개로 필드 개수만큼 맞춰줘야함-->
이름|과|전공|학번|   
---|---|---|---|    
김영희|정보통신공학과|정보통신|12201111|
홍길동|컴퓨터과학과|데이터베이스|12191111|
이순신|인공지능학과|인공지능|12181111|

## 텍스트 강조
- **데이터베이스** 실습은 재미 ~~~없어요~~~ 있어요 <!--스타를 쓰면 강조하는것이 됨--> 
                                                <!--  ~~말~~  이렇게 쓰면 이 말에 줄이 처짐-->

## 8주차 실습 실행 방법
1. week8 폴더로 이동
    > cd week8  <!--인용문 처럼 들어감-->
2. 콘솔창(power shell)에서 npm package 설치
    > npm install
3. database/sql.js에서 본인의 데이터베이스 정보 입력, 함수 구현 (주석)
    > Employee, Department에 관하여 대한 get, set, update, 함수에 sql을 작성합니다.
4. routes/home.js, routes/select.js, update.js 파일 수정
    > views 디렉토리에 있는 hbs 파일과 연결시킵니다.
5. src/index.js에서 페이지를 설정합니다. (주석)
    > port 번호를 설정하고 localhost:3000/ 이후의 페이지를 설정합니다.
6. 모든 설정 이후, npm run start 명령어 실행

## Employee
Fname|Minit|Lname|Ssn|Bdata|Address|Sex|Salary|Super_ssn|Dno|   
---|---|---|---|---|---|---|---|---|---|    
Chulsoo|F|Lim|333333555|1990-02-13|대전광역시|M|3500|123123123|2|

<br>

## Department
Dname|Dnumber|Mgr_ssn|Mgr_start_date|
---|---|---|---|
경영부|1|123123123|1998-02-13|

<br>

<pre>
<code>
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
</code>
</pre>

<br>

<pre>
<code>
app.use('/',homeRouter);
app.use('/update',updateRouter);
app.use('/select',selectRouter); //각 이름을 자유롭게 지어준 것이다.
</code>
</pre>

<br>

## 10주차 실습 실행 방법
1. week_10 폴더로 이동
    > cd week_10
2. 콘솔창 (power shell)에서 npm package 설치
    >npm install
3. database/sql.js에서 본인의 데이터 베이스 정보 입력 (주석)
    >Employee, Department, Nation에 관한 get, delete 함수에 sql 구현
4. src/index.js에서 페이지를 설정합니다. (주석)
    > port번호 설정, 페이지를 설정합니다.
    >login, deleteNation, delete, select 페이지를 사용합니다.
5. routes/login.js에서 로그인을 설정합니다.
    >관리자 로그인은 delete, 일반 사용자는 select, 대통령 사용자는 deleteNation으로 페이지가 이동합니다.
    >views/login.hbs에 연결합니다.
6. routes/delete.js, routes/deleteNation.js에서 삭제를 구현합니다.
    >views/delete.hbs, views/deleteNation.hbs에 연결합니다.
7. routes/select.js에서 데이터 show를 구현합니다.
    >views/select.hbs에 연결합니다.
9. 모든 설정 이후, npm run start 명령어 실행

## user
ID|Password|Role|
---|---|---|
nation|nation1234|대통령|

## Nation
Name|Capital|
---|---|
대한민국|서울|


<pre>
<code>
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
</code>
</pre>

<br>

<pre>
<code>
app.use('/',loginRouter);
app.use('/delete',deleteRouter);
app.use('/deleteNation',deleteNation);
app.use('/select',selectRouter); 
</code>
</pre>
