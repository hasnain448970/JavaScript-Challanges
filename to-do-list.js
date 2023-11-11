document.addEventListener("DOMContentLoaded", setupItems);

const groceryInput = document.querySelector(".input");
const addButton = document.querySelector("button.add");
let editFlag=false;
let elementId="";

let groceriesContainer = document.querySelector("div.grocery-container");
const alert = document.querySelector("p.alert");
const clearAll = document.querySelector(".clear-btn");

addButton.addEventListener("click", addItems);


clearAll.addEventListener("click", () => {
    localStorage.clear();
    groceriesContainer.innerHTML = "";
});

function addItems(e) {
    e.preventDefault(); // Prevent form submission

    const inputValue = groceryInput.value.trim();


    if (inputValue!="") {
        displayAlert("Please enter an item", "red");
        return;
    }
    if(!editFlag){
    const div = document.createElement("div");
    div.classList.add("grocery-list");
    div.innerHTML = `
        <article class="grocery-item">${inputValue}</article>
        <div class="btns-cssontainer">
            <button class="edit"><i class="fas fa-pen-to-square edit-icon"></i></button>
            <button class="delete"><i class="fas fa-trash delete-icon"></i></button>
        </div>`;

    groceriesContainer.appendChild(div);
    displayAlert("Successfully added", "green");
    groceryInput.value = ""; }
    else {
        const title=groceriesContainer.querySelectorAll(".grocery-item");
         title.forEach((ele)=>{
          if(ele.dataset.id===elementId)
          {
            ele.textContent=inputValue;
            groceryInput.value="";
          }
         })
    }

}

function displayAlert(msg, color) {
    alert.textContent = msg;
    alert.style.color = color;
    alert.classList.add("show-alert");

    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove("show-alert");
    }, 2000);
}

function addToLocalStorage(item) {
    let items = getFromLocalStorage();
    items.push(item);
    localStorage.setItem("groceryItems", JSON.stringify(items));
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("groceryItems")) || [];
}

function setupItems() {
    const items = getFromLocalStorage();

    items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("grocery-list");
        div.innerHTML = `<article class="grocery-item">${item}</article>
            <div class="btns-container">
                <button class="edit"><i class="fas fa-pen-to-square edit-icon"></i></button>
                <button class="delete"><i class="fas fa-trash delete-icon"></i></button>
            </div>`;

        groceriesContainer.appendChild(div);
    });
}

groceriesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
        const item = e.target.closest(".grocery-list");
        const itemName = item.querySelector(".grocery-item").textContent;

        groceriesContainer.removeChild(item);
        displayAlert(`Item "${itemName}" deleted successfully`, "red");
        addToLocalStorage(itemName); }
        else if (e.target.classList.contains("edit-icon")) {
         editItems(e.target);
             }
        else{

        }
});

function editItems(editbtn){
    editFlag=true;
    let id=Date.now().toString();
    console.log(editbtn)
    let item$= editbtn.closest(".grocery-list");
    const element= item$.querySelector(".grocery-item");
     element.setAttribute("data-id",id);
     elementId=element.dataset.id;
     groceryInput.focus();}



