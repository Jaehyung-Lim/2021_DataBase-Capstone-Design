import express from "express";//express 모듈을 express 이름으로 사용합니다.
import {selectSql,updateSql} from "../database/sql";//selectSql, updateSql object를 사용합니다.
//수정하기 위해 데이터를 조회해야하므로 selectSql을 사용하고 updateSql을 사용하여 수정합니다.
//이는 모두 export로 함수를 선언했기 때문에 사용할 수 있는 것입니다.
const router=express.Router();
//아래에서 사용하는 get, update함수들은 모두 sql.js에서 정의된 함수들 입니다.

//update시엔 employee를 수정할 것인지, department를 수정할 것인지 페이지로 나눕니다.
//기존의 입력 값 불러오기
router.get('/employee', async (req,res)=>{ //현재 페이지를 기준으로 /employee를 의미합니다. data처리
    const emp_res=await selectSql.getEmployee();
    res.render('updateEmployee',{   //updateEmployee.hbs
        title: "직원 테이블 갱신",
        emp_res
    });
});

//기존의 입력 값 불러오기
router.get('/department', async (req,res)=>{
    const dept_res = await selectSql.getDepartment();
    res.render('updateDepartment',{ //updateDepartment.hbs
        title: "부서 테이블 갱신",
        dept_res
    })
});

//수정 버튼을 눌렀을 경우 update query를 실행하여 조회 페이지로 이동
router.post('/employee', async (req,res)=>{//data처리
    const vars=req.body;       //입력받은 데이터를 vars 변수에 넣습니다.
    console.log(vars.salary);

    const data={
        Salary: vars.salary //salary만 수정합니다.
    }
    await updateSql.updateEmployee(data);   //updateEmployee가 처리 될 때 까지 기다립니다.
    
    res.redirect('/select'); //종료 후 localhost:3000/select
});

//수정 버튼을 눌렀을 경우 update quey를 실행하며 조회 페이지로 이동
router.post('/department', async(req,res)=>{
    const vars=req.body;    //입력받은 데이터를 vars 변수에 넣습니다.
    console.log(vars.dname);

    const data={
        Dname: vars.dname   //Dname만 수정하게 되는 것입니다.
    }

    await updateSql.updateDepartment(data); //updateDepartment가 처리될 때 까지 기다립니다.

    res.redirect('/select');    //종료 후 localhost:3000/select
});

module.exports=router;