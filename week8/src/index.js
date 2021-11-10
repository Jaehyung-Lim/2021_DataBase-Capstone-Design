import express from "express"; //express 모듈을 express라는 이름으로 사용한다.
import logger from "morgan";//morgan 모듈을 logger라는 이름으로 사용한다.
import path from "path";//path 모듈을 path라는 이름으로 사용한다.
//../는 현재 폴더를 기준으로 상위폴더를 의미
import homeRouter from "../routes/home";//routes에 있는 home.js를 homeRouter이름으로 사용한다.
//홈 화면에 관련된 기능
import updateRouter from "../routes/update";//routes에 있는 update.js를 updateRouter이름으로 사용한다.
//수정하는 기능
import selectRouter from "../routes/select";//routes에 있는 select.js를 selectRouter이름으로 사용한다.
//조회하는 기능
const PORT = 3000; //포트 번호는 3000을 사용

const app = express(); //express 기능(http 기능)을 사용할 것이라는 의미 -> app이라는 객체 이름으로 사용

app.use(express.urlencoded({extended: false}));
app.use(express.json());    //웹에서 데이터를 다루기 편하게 쓰는 것

app.set('views',path.join(__dirname,'../views'))
app.set('view engine', 'hbs')     //hbs를 쓴다는 것

app.use(logger("dev")); //로그를 사용할 것
//밑으로 기본적인 라우터 주소를 설정하는 것 / <- 이걸 통해 경로를 들어간다.
app.use('/',homeRouter);
app.use('/update',updateRouter);
app.use('/select',selectRouter); //각 이름을 자유롭게 지어준 것이다.

app.listen(PORT,() => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
//listen으로 서버를 실행시킵니다.
