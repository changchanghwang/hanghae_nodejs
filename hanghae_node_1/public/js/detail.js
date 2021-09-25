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
const commentForm2 = document.getElementsByClassName('commentForm2');
const commentInput2 = document.getElementsByClassName('commentInput2');
const submitComment2 = document.getElementsByClassName('submitComment2');
const comments = document.getElementsByClassName('comment');
const commentDepths = document.getElementsByClassName('commentDepth');

// for(let commentDepth of commentDepths){
//   console.log(commentDepth.value);
// }
// for(let comment of comments){
//   console.log(comment.id);
// }

const url = new URLSearchParams(window.location.search);
const cardId = url.get('cardId');

//삭제확인 모달창
function delModal(){
  deleteModal.classList.remove('hidden');
}
function canModal(){
  deleteModal.classList.add('hidden');
}
//댓글달기
function commentModal(i){
  commentModal[i].classList.remove('hiddenComment')
}


//삭제
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

//댓글기능
async function comment(){
  let comments = commentInput.value;
  let res = await fetch('/detail', {
    method:'POST',
    headers:{'Content-Type':"application/json"},
    body:JSON.stringify({
      comment:comments,
      cardId:cardId
    })
  })
  let data = await res.json();
  console.log(data.result);
  if(data.result =="error"){
    alert("내용을 입력해주세요");
    return
    // helpComment.classList.add('warn');
    // helpComment.innerHTML="내용을 입력해주세요";
  }else{
    window.location.href=`/detail?cardId=${cardId}`
    // helpComment.classList.remove('warn');
    // helpComment.innerHTML="";
  }
}

//이벤트추가
submitComment.addEventListener('submit', comment)
cancelBtn.addEventListener('click', canModal);
submitDel.addEventListener('click', del)
delBtn.addEventListener('click', delModal);
