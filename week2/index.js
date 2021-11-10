const firstName = document.getElementById("firstname"); //firstname으로 된 object를 가져옴
const lastName = document.getElementById("lastname"); //lastname으로 된 object를 가져옴
const email = document.getElementById("mail");//mail object를 가져옴
const userid = document.getElementById("userid");//등등 etc
const printForm = document.getElementById("user");
const display = document.getElementById("form-result"); //일단 빈 div박스

const handlePrint = (e) => {
    e.preventDefault(); //함수 첫번째에 이거를 쓴다라는 것을 알고 있어
    const fn = firstName.value 
    const ln = lastName.value
    const em = email.value
    const id = userid.value
    const diplaySpan = display.querySelector("span");
    //밑에 innerHTMl은 저 형태로 html로 넣어준다는 의미 
    diplaySpan.innerHTML = `           
    First Name is: ${fn}<br>
    Last Name is: ${ln}<br>
    E-mail is: ${em}<br>
    ID is: ${id}`;
}; //마지막에 스판에 붙여 넣어 
printForm.addEventListener("submit", handlePrint);
//이벤트 발생 감지 함수 -> submit인지 클릭인지, focus인지 등등 알려줘야 하고 
//submit 발생하면 어떤 함수가 발생할것인지 -> handlePrint가 발생한다.
//뭐 추가적으로 다른 이벤트가 발생할 수도 있겠네 