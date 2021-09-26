const idInput = document.getElementsByClassName('idInput')[0];
const pwInput = document.getElementsByClassName('pwInput')[0];
const signInBtn = document.getElementsByClassName('signInBtn')[0];
const signInForm = document.getElementsByClassName('signInForm')[0];

async function signIn(){
    let id = idInput.value;
    let pw = pwInput.value;
    let expTime = new Date();
    console.log(id);
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
    if(data.result==="success"){
        document.cookie = `accessCookie=${data.accessToken}; Expires=${expTime}; path=/`
        window.location.href = "/"
    }else{
        alert('로그인에 실패');
    }
}

signInForm.addEventListener('submit',signIn);