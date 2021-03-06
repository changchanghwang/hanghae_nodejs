const idInput = document.getElementsByClassName('idInput')[0];
const pwInput = document.getElementsByClassName('pwInput')[0];
const pwCheckInput = document.getElementsByClassName('pwCheckInput')[0];
const signUpBtn = document.getElementsByClassName('signUpBtn')[0];

async function signup(){
    id = idInput.value;
    pw = pwInput.value;
    pwCheck = pwCheckInput.value;

    let res = await fetch('/user/signUp',{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({
            userId:id,
            pw:pw,
            pwCheck:pwCheck
        })
    })
    let data = await res.json();
    if(data.result === "success"){
        alert('회원가입을 축하드립니다.')
        window.location.href = "/user/signin";
    }else{
        alert(data.msg)
        return;
    }
}


signUpBtn.addEventListener('click', signup)