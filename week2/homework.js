function makeRandom(min, max){
    var RandVal = Math.floor(Math.random()*(max-min+1)) + min;
    return RandVal;
}

const MyPick = document.getElementById("pick"); 
const MAX_range=document.getElementById("js-range");
const display=document.getElementById("js-result");
const printForm=document.getElementById("js-guess");
const title=document.querySelector(".js-title");

const handleMax=(e)=>{
    const MaxVal=title.querySelector("span");
    MaxVal.innerHTML=MAX_range.value;
};

const handlePrint = (e) => {
    e.preventDefault(); 
    const Mp = MyPick.value;
    const val=MAX_range.value;
    const rand=makeRandom(0,val);
    let msg;

    if(Mp>rand){msg='You Win!';}
    else if(Mp<rand){msg='You Lost!';}
    else if(Mp==rand){msg='draw!!';}
    const diplaySpan = display.querySelector("span");
 
    diplaySpan.innerHTML = `           
    My Pikc is: ${Mp} Machine pick is: ${rand}<br> <strong>${msg}</strong>
    `;
}; 

printForm.addEventListener('submit', handlePrint);
MAX_range.addEventListener('input',handleMax);
