import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://itemchecklist-b7892-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "shoppingList")

const shoppingListEl = document.querySelector("#shopping-list")
const inputField = document.querySelector("#input-field")
const addButton = document.querySelector("#add-button")

addButton.addEventListener("click",function(){
    let inputValue = inputField.value;
    if(inputValue != "")
        push(itemsInDB, inputValue);
    inputField.value = "";
})

onValue(itemsInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        shoppingListEl.innerHTML = "";
        for(let i=0;i<itemsArray.length;i++){
            let currentItem = itemsArray[i];
            let currentItemId = currentItem[0];
            let currentItemValue = currentItem[1];
            appendItemstoShoppingListEl(currentItem);
        }
    }
    else{
        shoppingListEl.innerHTML = "No items added"
    }
})

function appendItemstoShoppingListEl(item){
    // shoppingListEl.innerHTML += `<li> ${itemValue} </li> `
    let itemID = item[0];
    let itemValue = item[1];
    if(itemValue!=""){
        let newEl = document.createElement("li");
        newEl.textContent = itemValue;
        newEl.addEventListener("dblclick", function(){
        let exactLocation = ref(database, `shoppingList/${itemID}`);
        remove(exactLocation);
        })
    shoppingListEl.append(newEl);
    }
}


