import express from "express";             //express 모듈을 express 이름으로 사용합니다.
import {selectSql} from "../database/sql";//selectSql만 사용할 것이므로 selectSql만 가져옵니다.
        //이 중괄호는 사용자가 만든 모듈을 가져올 때 사용합니다.
const router = express.Router();        //express의 Router 함수를 router 이름으로 사용합니다.

//아래 있는 /는 현재 페이지 즉, /select를 의미하게 됩니다.
router.get('/',async(req,res)=>{ //함수 get을 정의합니다.
    const department=await selectSql.getDepartment();//selectSql에서 getDepartment 함수를 불러옵니다.
    const nation=await selectSql.getNation();       //selectSql에서 getNaiton 함수를 불러옵니다.
    //그리고 데이터를 res에 전달하여 화면에 표시하게 됩니다.
    res.render('select', { //select.hbs를 불러와서 화면에 표시하게 됩니다.
        title1: 'IT 공대',  //title1은 IT공대
        department,
        title2: '국가',     //title2는 국가
        nation              //department와 nation은 getDepartment, getNation에서 얻은 데이터를  의미하게 됩니다.
    });
    
});

module.exports=router;