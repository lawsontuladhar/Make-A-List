import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL: "Add-Your-Firebase-Link-Here"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsListInDB = ref(database, "ItemLists")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function(){
   let inputValue = inputFieldEl.value

   push(itemsListInDB, inputValue)
   
   clearInputFieldEl()
})

onValue(itemsListInDB, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            
            let currentItemId = currentItem[0]

            let currentItemValue = currentItem[1]
            
            
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No Items Here... Yet"
    }
})

function clearShoppingListEl(){
shoppingListEl.innerHTML = "";
}

function clearInputFieldEl(){
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item){ 
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function(){
        let exactLOcationOfDB = ref(database, `ItemLists/${itemID}`)
    
        remove(exactLOcationOfDB)
    })
    
    shoppingListEl.append(newEl)
}

