// function views(){
//     fetch('/view',{
//         method:'GET',
//         headers:{'Content-Type':'application/json'}
//     })
//     .then((res)=>{
//         return res.json();
//     })
//     .then((data)=>{
//         let card = data.card
//         console.log(card.length)
//         for(let i=0; i<card.length; i++){
//         console.log('a')
//         let title = card[i]['title'];
//             let desc = card[i]['desc'];
//             let time = card[i]['submitTime']
    
//             document.getElementById('aa').appendChild(`
//             <div class="ListBg">
//                 <div class="ListFlex">
//                     <div class="click-wrap">
//                         <div class="imgHidden-box">
//                             <img src="/img/linkgather.png" class="classImg" />
//                             <h3 class="title"> ${title} </h3>
//                             <h4 class="desc"> ${desc} </h4>
//                             <span class="time"> ${time}</span>
//                             <hr/>
//                         </div>
//                     </div>
//                 </div>
//             </div>`)
//         }
//     })
    
// }

// window.addEventListener('DOMContentLoaded', views);