const idInput = document.getElementsByClassName('idInput')[0];
const pwInput = document.getElementsByClassName('pwInput')[0];
const signInBtn = document.getElementsByClassName('signInBtn')[0];
const signInForm = document.getElementsByClassName('signInForm')[0];

async function signIn(event){
    event.preventDefault();
    let id = idInput.value;
    let pw = pwInput.value;
    let expTime = new Date();
    expTime.setTime(expTime.getTime() + (5*60*1000))

    let res = await fetch('/user/signin',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            id:id,
            pw:pw
        })
    })
    let data = await res.json();
    if(data.result==="Fail"){
        alert('아이디 또는 비밀번호를 확인해주세요.')
        window.location.href = "/user/signin";
    }else{
        window.location.href = "/";
    }
}

signInForm.addEventListener('submit',signIn);