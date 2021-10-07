const logoutBtn = document.getElementsByClassName('toLogout')[0];

//로그아웃
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

//좋아요
async function like(id){
    const cardId = id;
    const res = await fetch ('/like',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            cardId:cardId,
        })
    })
    const data = await res.json();
    console.log(data.result)
    if(data.result==="success"){
        alert('좋아요 완료');
        window.location.reload();
    }else if(data.result==="cancel"){
        alert('좋아요 취소');
        window.location.reload();
    }else if (data.result === "Error"){
        alert('로그인을 해주세요.')
        window.location.href = "/user/signin"
    }
}