// Selecting DOM elements
import { shopItemsData } from "./data.js";
const container = document.querySelector("body .container");
const items_count = document.querySelector(".items-count");
const total_bill = document.querySelector(".total-bill");
const clearAll=document.querySelector("button.clear-cart");

let decreaseByOne;
let increaseByOne;
let toSearch;
let cart_items=(JSON.parse(localStorage.getItem("selectedItems"))||[]).filter((i)=>{
return i.item>0
});
let final_products= shopItemsData.filter((x,index)=>{
  return  cart_items.find((y)=>{
    return y.id==x.id;
  })
})

// Initialize the page with data from local storage


// Function to add items to the container
function add_Items() {
  const itemsToAdd =final_products.map((item) => {
    return `
      <div class="item my-8 border border-2 border-gray-500 p-1 relative">
        <div class="image-container w-full object-cover">
          <img src="${item.img}" alt="">
        </div>
        <span class="absolute top-[7px] right-[10px]" ><i class="fa-solid fa-xmark ${item.id} fa-2x text-red-500"></i></span>
        <div class="item-info">
          <h3 class="item-name capatelized italic text-center text-lg font-mono font-bold ">${item.name}</h3>
          <p class="description font-mono ">${item.desc}</p>
          <div class="text-center my-4">
            <span class="price mx-4">${item.price}$</span>
            <i class="fa-solid fa-plus add" data-id=${item.id}></i>
            <span class="items-count mx-4" id=${item.id}>0</span>
            <i class="fa-solid fa-minus remove" data-id=${item.id}></i>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = itemsToAdd.join("");

  // Adding event listeners to the plus and minus icons
  container.querySelectorAll("i").forEach((icons) => {
    icons.addEventListener("click", (e) => {
      updateProducts(e);
    });
  });
}
add_Items();
find_total();
takeFromLocalStorageAndUpdateUi();
calculateBill();

// Function to update the cart and local storage when items are added or removed
function updateProducts(e) {
  if (e.target.classList.contains("add")) {
    // Incrementing count and updating the UI
    increaseByOne(e.target,e.target.dataset.id);
    calculateBill();
  
  } else if (e.target.classList.contains("remove")) {
    // Decrementing count and updating the UI
    decreaseByOne(e.target,e.target.dataset.id);
    calculateBill();

  } }
 decreaseByOne=function (target,id){
    toSearch=cart_items.find((x)=>{
      return x.id==id;
    });
    if(toSearch.item==0) return;
    if(toSearch.item==undefined) return;
      toSearch.item--;
      target.previousElementSibling.innerHTML--
      find_total();
  
    
    addToStorage(cart_items); }
  
  
   increaseByOne=function(target,Id){
    toSearch=cart_items.find((x)=>{
      return x.id==Id;
    });
    
    if(toSearch==undefined){
      cart_items.push({
        id:Id,
        item:1
      })
    }
    else {
      toSearch.item++;
      target.nextElementSibling.innerHTML++;
  
    }
    find_total();
    addToStorage(cart_items);
  
  
  }
  
  
  // // Function to add items to local storage
  function addToStorage(products) {
    localStorage.setItem("selectedItems", JSON.stringify(cart_items));
  }
  
    function find_total(){
      let totalSelected=cart_items.reduce((x,y)=>{
        return x+y.item;
      },0)
      items_count.innerHTML=totalSelected; }

      function takeFromLocalStorageAndUpdateUi(){
        cart_items.forEach((ele)=>{
        container.querySelector(`span[id="${ele.id}"]`).innerHTML=ele.item;
        
        })
      }
      function calculateBill(){
        let total=final_products.reduce((x,y,i)=>{
          return x+(y.price*cart_items[i].item);

        },0)
        if(total==0)
       document.body.innerHTML=`    <nav class="h-[6rem] bg-stone-950"><ul class="flex  items-center justify-between lg:px-32 w-screen h-full border border-blue-500 bg-black-500 sm:px-16"><li class="text-xl text-white">Shopping cart</li>
       <li class="relative"><a href="cart.html" class="text-white"><i class="fa-solid fa-cart-shopping fa-2x"></i></a><span class="items-count absolute top-[-5px] right-[10px] text-red-500 text-lg">0</span></li></ul></nav><p class="xl:w-3/12 lg:w-2/6  md:w-4/6 sm:w-5/6 border border-2 text-lg font-bold bg-red-500 text-white mx-auto mt-8 mb-0 px-4">your total bill is:<span class="total-bill">0</span></p> <a href="shopping-cart.html"><button class="border border-2 border-gray-500 bg-indigo-500  text-white mx-2 px-4 rounded list-style-none decoration-none mx-auto "><----Back to home</button></a>`
       else 
        total_bill.innerHTML=total;
      }

clearAll.addEventListener("click",clearCart);
function clearCart(){
  
  cart_items.forEach((x)=>{
    x.item=0;
  });
  addToStorage();
  calculateBill();
}
//delete 
container.querySelectorAll("span i").forEach((btn)=>{btn.addEventListener("click",(e)=>{removeItemFromCart(e)})});
function removeItemFromCart(e){
  console.log(e.target.className)
  let clicked=cart_items.find((x)=>{
    return !!x.id==e.target.classList.contains(`${x.id}`);
  });
  clicked.item=0;
  calculateBill();
  find_total();
  let item_to_delete=e.target.closest("div.item");
  item_to_delete.remove();
}