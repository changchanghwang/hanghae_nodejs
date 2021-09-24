const editBtn = document.getElementsByClassName('editBtn')[0];
const delBtn = document.getElementsByClassName('deleteBtn')[0];
const modiForm = document.getElementsByClassName('modiForm')[0];
const detailForm = document.getElementsByClassName('detailForm')[0];
const submitDel = document.getElementsByClassName('del-submit-btn')[0];
const deleteModal = document.getElementsByClassName('del-background')[0];
const passwordCheck = document.getElementsByClassName('passwordCheck')[0];

const url = new URLSearchParams(window.location.search);
const cardId = url.get('cardId');

async function edit(){
  let res = await fetch(`api/detail/${cardId}`,{
    method:"GET",
    headers:{"Content-Type":"applcation/json"}
  })
  let data = await res.json();
  let card = data.card;
  detailForm.classList.add('hidden');
  modiForm.innerHTML=`
    <h3 class="title_d">제목: <input type="text" placeholder="제목을 입력해주세요" class="titleE" value="${card.title}"> </h3>
    <h4 class="desc_d">설명: <input type="text" placeholder="설명을 입력해주세요" class="descE" value="${card.desc}"></h4>
    <div class='etc_d'>
      <div class="author_d">작성자: <input type="text" placeholder="작성자를 입력해주세요" class="authorE" value="${card.author}""></div>
      <div class="time_d">비밀번호: <input type="password" placeholder="비밀번호를 확인해주세요" class="pwCheck"></div>
    </div>
    <div>
      <button class="submitEdit">수정하기</button>
      <button class="cancelEdit" onclick="window.location.href='/detail?cardId=${card._id}'">취소</button>
    </div>
  `

}

function delModal(){
  deleteModal.classList.remove('hidden');
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

submitDel.addEventListener('click', del)
editBtn.addEventListener('click',edit);
delBtn.addEventListener('click', delModal);

const submitEditBtn = document.querySelector('submitEdit');
console.log(submitEditBtn);
const passwordInput = document.getElementsByClassName('passCheck')[0];
const titleInput = document.getElementsByClassName('titleE')[0];
const descInput = document.getElementsByClassName('descE')[0];
const authorInput = document.getElementsByClassName('authorE')[0];

async function submitEdit(){
  let pw = passwordInput.value;
  let title = titleInput.value;
  let desc = descInput.value;
  let author = authorInput.value;

  let res = await fetch(`/api/detail/${cardId}`,{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body:{
      pw:pw,
      title:title,
      desc:desc,
      author:author
    }
  })
  let data = await res.json();
  let card = data.card;
  if(data.result === "success"){
    alert('수정완료!')
    window.location.href = `/detail?cardId=${card.id}`
  }
}

submitEditBtn.addEventListener('click',submitEdit)