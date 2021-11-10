import express from "express"; //express 모듈을 express라는 이름으로 사용한다.
import logger from "morgan";//morgan 모듈을 logger라는 이름으로 사용한다.
import path from "path";//path 모듈을 path라는 이름으로 사용한다.
//../는 현재 폴더를 기준으로 상위폴더를 의미
import loginRouter from "../routes/login";//routes에 있는 login.js를 loginRouter이름으로 사용한다.
//홈 화면에 관련된 기능
import deleteRouter from "../routes/delete";//routes에 있는 delete.js를 deleteRouter이름으로 사용한다.
//수정하는 기능
import selectRouter from "../routes/select";//routes에 있는 select.js를 selectRouter이름으로 사용한다.
//조회하는 기능
import deleteNation from "../routes/deleteNation"; //routes에 있는 deleteNation.js를 deleteNation 이름으로 사용한다.

const PORT = 3000; //포트 번호는 3000을 사용

const app = express(); //express 기능(http 기능)을 사용할 것이라는 의미 -> app이라는 객체 이름으로 사용

app.use(express.urlencoded({extended: false}));
app.use(express.json());    //웹에서 데이터를 다루기 편하게 쓰는 것

app.set('views',path.join(__dirname,'../views'))
app.set('view engine', 'hbs')     //hbs를 쓴다는 것

app.use(logger("dev")); //로그를 사용할 것
//밑으로 기본적인 라우터 주소를 설정하는 것 / <- 이걸 통해 경로를 들어간다.
app.use('/',loginRouter);
app.use('/delete',deleteRouter);
app.use('/deleteNation',deleteNation);
app.use('/select',selectRouter); 

app.listen(PORT,() => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
//listen으로 서버를 실행시킵니다.
