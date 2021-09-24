const editBtn = document.getElementsByClassName('editBtn')[0];
const delBtn = document.getElementsByClassName('deleteBtn')[0];
const modiForm = document.getElementsByClassName('modiForm')[0];
const detailForm = document.getElementsByClassName('detailForm')[0];
const submitDel = document.getElementsByClassName('del-submit-btn')[0];
const deleteModal = document.getElementsByClassName('del-background')[0];
const passwordCheck = document.getElementsByClassName('passwordCheck')[0];
const cancelBtn = document.getElementsByClassName('del-close-btn')[0];

const url = new URLSearchParams(window.location.search);
const cardId = url.get('cardId');


function delModal(){
  deleteModal.classList.remove('hidden');
}
function canModal(){
  deleteModal.classList.add('hidden');
}

async function del(){
  let pw = passwordCheck.value;
  let res = await fetch(`/api/detail/${cardId}`, {
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      pw:pw
    })
  })
  let data = await res.json();
  if(data["result"] =="success"){
    alert("삭제 완료!");
    window.location.href ="/";
  }
}

cancelBtn.addEventListener('click', canModal);
submitDel.addEventListener('click', del)
delBtn.addEventListener('click', delModal);
