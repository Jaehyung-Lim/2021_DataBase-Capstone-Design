import express from "express";//express 모듈을 express 이름으로 사용합니다.
import {selectSql,deleteSql} from "../database/sql";//selectSql, updateSql object를 사용합니다.
//수정하기 위해 데이터를 조회해야하므로 selectSql을 사용하고 updateSql을 사용하여 수정합니다.
//이는 모두 export로 함수를 선언했기 때문에 사용할 수 있는 것입니다.
const router=express.Router();
//아래에서 사용하는 delete 함수는 sql.js에서 정의된 함수들 입니다.

//delete시에 우선 어떤 값들이 있는지 볼 수 있도록 getNation 함수를 사용해야합니다.
//기존의 입력 값 불러오기
router.get('/', async (req,res)=>{ //현재 페이지를 의미합니다.
    const nation=await selectSql.getNation();
    res.render('deleteNation',{   
        title1: "국가 삭제 기능",
        nation  //이게 deleteNation.hbs에서 each에 들어가는 이름입니다.
    })
});
//async 와 await는 항상 함께 옵니다.
router.post('/', async (req,res) =>{
    const data={
        Name: req.body.delBtn,
        //delBtn이 Mane의 value 값을 가져오는 것입니다. 따라서 이 Dnumber값에 해당 값을 넘겨준 것입니다.
        //만약 hbs에서 value가 Name이면, 위의 값을 Name으로 바꿉니다.
    };
    await deleteSql.deleteNation(data); //받은 data를 deleteNation의 인자로 넣으면서 delete sql문을 실행합니다.
    res.redirect('/deleteNation');  //실행 이후 /deleteNation 페이지로 갑니다.
});

module.exports=router;
