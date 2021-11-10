//home.js는 데이터 베이스에서 삽입을 구현합니다.
//views 폴더의 home.hbs 파일과 연동 할 것입니다.
import express from "express";//express 모듈을 express라는 이름으로 사용합니다.
import {insertSql} from "../database/sql";//삽입, 조회에 관련된 쿼리 함수를 불러옵니다.
                                          //insertSql object만 가져옵니다.
const router = express.Router();//express에서 Router 함수를 사용할 것이고, router 이름으로 사용합니다.

router.get('/',(req,res)=>{
    res.render('home'); //home.hbs파일을 찾아서 웹에 표시하겠다는 의미입니다.
});

//삽입이 눌리면 처리 해야하는 것을 router.post 함수에서 처리합니다.
//그 이유는 home.hbs의 form에서 method를 post로 넘겨주기로 했기 때문입니다.
router.post('/',(req,res)=>{    //값은 req에 저장됩니다.
    const vars=req.body;    //그리고 vars에 저장합니다.
    const var_lenth=Object.keys(req.body).length;   //attr의 개수를 저장합니다.

    if(var_lenth>4){        //attr의 개수가 4보다 크면 employee라는 뜻
        const data={        //data 객체를 만들어 입력받은 값을 저장합니다.
            Fname: vars.fname,  //각 값을 저장합니다.
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.address,
            Sex: vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        };

        insertSql.setEmployee(data); //insertSql에서 만든 setEmployee 함수를 통해 data객체를 넘겨줍니다.
    }                                //data.Fname과 같은 형태로 사용합니다.
    else{                   //attr의 개수가 4이면 department라는 뜻
        const data={        //data 객체를 만들어 입력받은 값을 저장합니다.
            Dname: vars.dname,
            Dnumber: vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };

        insertSql.setDepartment(data); //setDepartment 함수를 통해 객체의 값을 전달합니다.
    }
    res.redirect('/'); //res.redirect를 사용하여 입력한 후 어떤 페이지로 갈 것인가를 설정합니다. home으로 갑니다.
})
module.exports=router;