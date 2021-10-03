const logoutBtn = document.getElementsByClassName('toLogout')[0];

async function logout(){
    const res = await fetch('/logout',{
        method:'GET',
        headers:{"Content-Type":"application/json"},
    })
    const data = await res.json();
    if(data.result ==="success"){
        alert("로그아웃.")
        window.location.href = '/'
    }
}

logoutBtn.addEventListener('click',logout);