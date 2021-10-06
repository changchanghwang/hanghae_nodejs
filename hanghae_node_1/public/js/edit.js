const submitEditBtn = document.getElementsByClassName('submitEdit')[0];
const passwordInput = document.getElementsByClassName('pwCheck')[0];
const titleInput = document.getElementsByClassName('titleE')[0];
const descInput = document.getElementsByClassName('descE')[0];

const url = new URLSearchParams(window.location.search);
const cardId = url.get('cardId');

async function submitEdit(){
  let pw = passwordInput.value;
  let title = titleInput.value;
  let desc = descInput.value;
  let res = await fetch(`/edit/edt/${cardId}`,{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      pw:pw,
      title:title,
      desc:desc,
    })
  })
  let data = await res.json();
  if(data.result === "success"){
    alert('수정완료!')
    window.location.href = `/detail?cardId=${cardId}`
  }else{
    alert('비밀번호를 확인해주세요')
    window.location.href = `/edit?cardId=${cardId}`
  }
}

submitEditBtn.addEventListener('click',submitEdit)