const editBtn = document.getElementsByClassName('editBtn')[0];
const delBtn = document.getElementsByClassName('deleteBtn')[0];
const modiForm = document.getElementsByClassName('modiForm')[0];
const detailForm = document.getElementsByClassName('detailForm')[0];
const submitDel = document.getElementsByClassName('del-submit-btn')[0];
const deleteModal = document.getElementsByClassName('del-background')[0];
const passwordCheck = document.getElementsByClassName('passwordCheck')[0];
const cancelBtn = document.getElementsByClassName('del-close-btn')[0];
const submitComment = document.getElementsByClassName('commentForm')[0];
const commentInput = document.getElementsByClassName('commentInput')[0];
const commentWrap = document.getElementsByClassName('commentWrap')[0];
const editInput = document.getElementsByClassName('editInputWrap');

const url = new URLSearchParams(window.location.search);
const cardId = url.get('cardId');
//삭제확인 모달창
function delModal(){
  deleteModal.classList.remove('hidden');
}
function canModal(){
  deleteModal.classList.add('hidden');
}


//삭제
async function del(){
  let pw = passwordCheck.value;
  let res = await fetch(`/detail/del/${cardId}`, {
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
  }else if(data.result =='Fail'){
    alert("틀렸다. 너. 비밀번호.")
    window.location.href ="/";
  }else if(data.result =='Error'){
    alert("로그인 해주세요.")
    window.location.href ="/user/signin";
  }
}

//댓글기능
async function comment(){
  let comments = commentInput.value;
  let res = await fetch('/comment', {
    method:'POST',
    headers:{'Content-Type':"application/json"},
    body:JSON.stringify({
      comment:comments,
      cardId:cardId
    })
  })
  let data = await res.json();
  if(data.result =="Error"){
    alert("로그인을 해주세요");
    window.location.href = "/user/signin";
  }else if(data.result =="Fail"){
    alert("내용을 입력해주세요");
    return;
  }else{
    window.location.href=`/detail?cardId=${cardId}`
  }
}
//댓글 편집 모달
function editComment(id){
  document.getElementsByClassName(id)[0].classList.toggle('hidden');
  document.getElementsByClassName(id)[1].classList.toggle('hidden');
}

//댓글 편집 기능
async function editCommentApi(id){
  let comment = document.getElementById(id).value;
  let commentId = id;
  let res = await fetch('/comment',{
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      comment:comment,
      commentId:commentId,
    })
  })
  let data = await res.json();
  console.log(data.result);
  if(data.result == "success"){
    window.location.href =`/detail?cardId=${cardId}`;
  }else if(data.result == "Fail"){
    alert("댓글을 입력해주세요.");
    return;
  }
} 

//댓글 삭제 모달
function deleteCommentModal(id){
  document.getElementsByClassName(id)[2].classList.toggle('hidden');
}

//댓글 삭제 기능
async function deleteComment(id){
  let commentId = id;
  let res = await fetch('/comment', {
    method:'DELETE',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      commentId:commentId,
    })
  })
  let data = await res.json();
  if(data.result =="success"){
    window.location.href =`/detail?cardId=${cardId}`;
  }else{
    alert('오류');
  }
}

//이벤트추가
submitComment.addEventListener('submit', comment)
cancelBtn.addEventListener('click', canModal);
submitDel.addEventListener('click', del)
delBtn.addEventListener('click', delModal);