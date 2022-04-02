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
    this.get=(collectionName)=>collections.find((currentCollection)=>collectionName==currentCollection.name)
    this.collections=()=>collections
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
    const collectionBtn=parseTohtml(`
    <button class="collection-btn">${collectionName}</button>
    `)
    getAppElem().querySelector(".collections-nav").appendChild(collectionBtn)
    collectionBtn.addEventListener("click",()=>{
        changeCollectiontab(allCollections.get(collectionName))
    })
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
    collectionTab.querySelector("#add-todo-btn").addEventListener("click",()=>{
        const todoName=collectionTab.querySelector("#add-todo-name-input").value
        const todoDate=collectionTab.querySelector("#add-todo-date-input").value
        addTodoElem(todoName,todoDate)
        currentCollection.add(todoName,todoDate)
    })
    collectionTab.style.display="none"
    getAppElem().appendChild(collectionTab)
}

function changeCollectiontab(collection){
    currentCollection=collection
    const collectionTab=document.querySelector(".current-collection-container")
    removeAllTodos()
    collectionTab.style.display=""
    collectionTab.querySelector(".collection-name").innerText=collection.name
    for(const todo of collection.todos){
        addTodoElem(todo.name,todo.date)
    }
}

function addTodoElem(todoName,todoDate){
    const collectionTodosElem=document.querySelector(".collection-todos")
    if(currentCollection.name=="Inbox"){
        const currentCollection=findCollectionFor(todoName)
    }
    const todoElem=parseTohtml(`
    <div class="todo-container" data-todo-name="${todoName}">
        <input type="checkbox" class="todo-check">
        <input type="text" class="todo-name" value="${todoName}"></input>
        <input type="date" class="todo-date" value="${todoDate}"></input>
    </div>
    `)

    todoElem.querySelector(".todo-check").addEventListener("click",()=>{
        // removeTodoElem(todoElem)  
        todoElem.remove() 
        currentCollection.delete(currentCollection.get(todoName))
    })
    todoElem.querySelector(".todo-name").addEventListener("focusin",(evt)=>{
        evt.target.addEventListener("focusout",()=>{
            currentCollection.get(todoName).name=evt.target.value
        },{once:true})
    })
    todoElem.querySelector(".todo-date").addEventListener("focusin",(evt)=>{
        evt.target.addEventListener("focusout",()=>{
            currentCollection.get(todoName).date=evt.target.value
        },{once:true})
    })
    collectionTodosElem.appendChild(todoElem)

}

function removeAllTodos(){
    document.querySelectorAll(".todo-container").forEach((todoElem)=>todoElem.remove())
}

function addTodayTabBtn(){
    const inboxTabBtn=parseTohtml(`
    <button class="collection-btn" style="background: none;color: black;border: 2px solid black;">
        Inbox
    </button>
    `)
    getAppElem().querySelector(".collections-nav").appendChild(inboxTabBtn)
    const inboxTabCollection=allCollections.get("Inbox")
    inboxTabBtn.addEventListener("click",()=>{
        changeCollectiontab(inboxTabCollection)
        const todaysTodos=getAllTodos().filter((todo)=>todo.date==new Date().toISOString().slice(0,10))
        for(const todo of todaysTodos){
            addTodoElem(todo.name,todo.date)
        }
    })
    changeCollectiontab(inboxTabCollection)
    const todaysTodos=getAllTodos().filter((todo)=>todo.date==new Date().toISOString().slice(0,10))
    for(const todo of todaysTodos){
        addTodoElem(todo.name,todo.date)
    }
}

function findCollectionFor(todoName){
    return allCollections.collections().find((collection)=>collection.todos.some((todo)=>todo.name==todoName))
}
function getAllTodos(){
    let todos=[]
    for(const collection of allCollections.collections()){
        todos=[...todos,...collection.todos]
    }
    return todos
}

let currentCollection=null
allCollections.add(new TodoCollection("Inbox"))

addAppContainer()
addNav()
addSideBar()
showCollectionTab()
addTodayTabBtn()
changeCollectiontab(allCollections.get("Inbox"))


setInterval(()=>{
    console.log(JSON.stringify(allCollections.collections()))
},1000)

