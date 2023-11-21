
 import { shopItemsData } from "./data.js";
 
let container = document.querySelector("body .container");
const items_count = document.querySelector(".items-count");
let increament;
let decreament;
let search;
let products=JSON.parse(localStorage.getItem("selectedItems"))||[];

function addItems() {

  const itemsToAdd = shopItemsData.map((item) => {
    return `<div class="item  my-8 border border-2 border-gray-500 p-1"><div class="image-container w-full object-cover "><img src="${item.img}" alt=""></div><div class="item-info ">
    <h3 class="item-name capatelized italic text-center text-lg font-mono font-bold">${item.name}</h3>
    <p class="description font-mono ">${item.desc}</p><div class="text-center my-4"><span class="price mx-8">${item.price}$</span><i class="fa-solid fa-plus add" data-id=${item.id}></i><span class="items-count mx-4" id=${item.id}>0</span><i class="fa-solid fa-minus remove" data-id=${item.id}></i></div>
  </div>
</div> `;

      
  });
container.innerHTML=itemsToAdd.join("");
container.querySelectorAll("i").forEach((icons)=>{
  icons.addEventListener("click",(e)=>{
  
    updateNumberOfProducts(e);

  })

})
}
addItems();
takeFromLocalStorage();
find_total_items();

// Function to update the cart and local storage when items are added or removed
function updateNumberOfProducts(e) {
  // Checking if the clicked button has the "add" class
  if (e.target.classList.contains("add")) {
    increament(e.target,e.target.dataset.id);
        
      }
  else if (e.target.classList.contains("remove") ) {
      decreament(e.target,e.target.dataset.id);

      }};
decreament=function (target,id){
  search=products.find((x)=>{
    return x.id==id;
  });
  if(search.item==0) return;
  if(search.item==undefined) return;
    search.item--;
    target.previousElementSibling.innerHTML--
    find_total_items();

  
  addToLocalStorage(products); }


increament=function(target,Id){
  search=products.find((x)=>{
    return x.id==Id;
  });
  console.log(Id)
  if(search==undefined){
    products.push({
      id:Id,
      item:1
    })
    
    target.nextElementSibling.innerHTML++;
  }
  else {
    search.item+=1;
    target.nextElementSibling.innerHTML++;

  }
  find_total_items();
  addToLocalStorage(products);


}


// // Function to add items to local storage
function addToLocalStorage(products) {
  localStorage.setItem("selectedItems", JSON.stringify(products));
}

  function find_total_items(){
    console.log(products)
    let totalSelected=products.reduce((x,y)=>{
      return x+(y.item);
    },0)
    items_count.innerHTML=totalSelected;

  }
  
  function takeFromLocalStorage(){
    products.forEach((ele)=>{
    container.querySelector(`span[id="${ele.id}"]`).innerHTML=ele.item;
    
    })
  }

  
  



