const titleInput = document.getElementsByClassName('sb_title')[0];
const descInput = document.getElementsByClassName('sb_desc')[0];
const submitBtn = document.getElementsByClassName('submit_btn')[0];
const authorInput = document.getElementsByClassName('sb_author')[0];
const pwInput = document.getElementsByClassName('sb_password')[0];

async function submitCard(){
    let title = titleInput.value;
    let desc = descInput.value;
    let author = authorInput.value;
    let pw = pwInput.value;
    console.log(author, pw)

    let res = await fetch('/api/submit',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            title:title,
            desc:desc,
            author:author,
            pw:pw
        })
    })
    let data = await res.json();
    if(data.result === "success"){
        window.location.href ="/"
    }
}


submitBtn.addEventListener('click', submitCard)