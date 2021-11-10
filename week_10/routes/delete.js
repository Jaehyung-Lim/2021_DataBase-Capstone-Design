import express from "express";//express 모듈을 express 이름으로 사용합니다.
import {selectSql,deleteSql} from "../database/sql";//selectSql, updateSql object를 사용합니다.
//수정하기 위해 데이터를 조회해야하므로 selectSql을 사용하고 updateSql을 사용하여 수정합니다.
//이는 모두 export로 함수를 선언했기 때문에 사용할 수 있는 것입니다.
const router=express.Router();
//아래에서 사용하는 get, delete 관련 함수들은 모두 sql.js에서 정의된 함수들 입니다.

//delete 페이지는 department를 삭제할 것입니다.
//기존의 입력 값 불러오기->이때 값을 보면서 삭제할 수 있게끔 합니다.
router.get('/', async (req,res)=>{ //현재 페이지를 의미합니다.
    const department=await selectSql.getDepartment();      //delete.hbs에서 사용할 department를 정의합니다. 이를 통해 getDepartment사용 가능
    res.render('delete',{   //delete.hbs 파일에서 each에 들어가는 내용
        title1: "부서 삭제 기능",
        department
    })
});
//async 와 await는 항상 함께 옵니다.
router.post('/', async (req,res) =>{
    const data={
        Dnumber: req.body.delBtn,
        //delBtn이 Dnumber의 value 값을 가져오는 것입니다. 따라서 이 Dnumber값에 해당 값을 넘겨준 것
        //만약 hbs에서 value가 Dname이면, 위의 값을 Dname으로 바꿔줍니다.
    };
    await deleteSql.deleteDepartment(data);//post method로 값을 넘겨 받고, 밭은 dataa를 삭제합니다.
    res.redirect('/delete');//삭제 후 /delete 페이지로 돌아갑니다.
});

module.exports=router;//실행