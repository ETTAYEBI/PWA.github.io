const container = document.querySelector(".container")
const phones = [
  {name:"IphoneX",image:"phone1.jpg"},
  {name:"IphoneXS",image:"phone2.jpg"},
  {name:"Iphone11",image:"phone3.jpg"},
  {name:"Iphone11Pro",image:"phone4.jpg"},
  {name:"Iphone12",image:"phone5.jpg"},
  {name:"Iphone12Pro",image:"phone6.jpg"},
  {name:"Iphone13",image:"phone7.jpg"},
  {name:"Iphone13Pro",image:"phone8.jpg"},
  {name:"Iphone14",image:"phone9.jpg"}
]

const showPhones = ()=>{
  let e=""
  phones.forEach(({name:a,image:n})=>e+=`
                <div class="card">
                  <img class="card--avatar" alt="${a}" src=./assets/images/${n} />
                  <h1 class="card--title">${a}</h1>
                  <a class="card--link" href="#">Technology</a>
                </div>
                `)
  container.innerHTML=e
}

document.addEventListener("DOMContentLoaded",showPhones);