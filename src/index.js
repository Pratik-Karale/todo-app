import "./style.css"
import {Todo} from "./Todo.js"
import {TodoCollection} from "./todoCollection.js"

function parseTohtml(str){
    const tempDiv=document.createElement("div")
    tempDiv.innerHTML=str
    return tempDiv.querySelector("*:first-child")
}

const getAppElem=()=>document.querySelector("#app")
const allCollections=new (function(){
    const collections=[]
    this.add=(collection)=>collections.push(collection)
    this.delete=(collection)=>collections.splice(collections.indexOf(collection),1)
    this.get=(collectionName)=>this.collection.find((currentCollection)=>collectionName==currentCollection.name)
})()


function addAppContainer(){
    document.body.appendChild(parseTohtml(`<div id="app"></div>`))
}

function addNav(){
    getAppElem().appendChild(parseTohtml(`
    <nav><span id="" logo>Just Do IT!</span></nav>
    `))
}
function addCollectionBtn(collectionName){
    getAppElem().querySelector(".collections-nav").appendChild(parseTohtml(`
    <button class="collection-btn">${collectionName}</button>
    `))
}

function addSideBar(){
    const sideBar=parseTohtml(`
    <aside class="collections-nav">
    <div class="add-collection-container">
    <input type="text" id="add-collection-input">
    <button id="add-collection-btn">✔️</button>
    </div>
    </aside>
    `)
    getAppElem().appendChild(sideBar)
    const collectionNameInput=sideBar.querySelector("#add-collection-input")
    const collectionSubmitBtn=sideBar.querySelector("#add-collection-btn")
    collectionSubmitBtn.addEventListener("click",()=>{
        const inputName=collectionNameInput.value
        addCollectionBtn(inputName)
        currentCollection=new TodoCollection(inputName)
        allCollections.add(currentCollection)
        changeCollectiontab(currentCollection)
    })
}
function showCollectionTab(){
    const collectionTab=parseTohtml(`
    <div class="current-collection-container">
      <h2 class="collection-name"></h2>
      <div class="collection-todos" data-collection-name="">
        <div class="add-todo-container">
          <input type="text" id="add-todo-name-input">
          <input type="date" id="add-todo-date-input">
          <button id="add-todo-btn">Add</button>
        </div>
      </div>
    </div>
    `)
    collectionTab.style.display="none"
    getAppElem().appendChild(collectionTab)
}

function changeCollectiontab(collection){
    currentCollection=collection
    const collectionTab=document.querySelector(".current-collection-container")
    collectionTab.style.display=""
    collectionTab.querySelector(".collection-name").innerText=collection.name
    for(const todo of collection.todos){
        addTodoElem(todo)
    }
}

function addTodoElem(todo){
    const collectionTodosElem=document.querySelector(".collection-todos")
    collectionTodosElem.appendChild(parseTohtml(`
    <div class="todo-container" data-todo-name="${todo.name}">
        <input type="checkbox" class="todo-check">
        <input type="text" class="todo-name" value="${todo.name}"></input>
        <input type="date" class="todo-date" value="${todo.date}"></input>
    </div>
    `))
}



addAppContainer()
addNav()
addSideBar()
showCollectionTab()

let currentCollection=null
