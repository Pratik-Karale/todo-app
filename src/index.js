import { Todo } from "./Todo"
import { TodoCollection } from "./todoCollection"
import "./style.css"
import {displayDashboard,addOnNewCollectionListener,showCollectionTab,makeCollectionBtn,addOnNewTodoListener,addTodoElem,addOnDeleteTodoListener} from "./domStuff.js"







let allCollections=[]
function updateLocalStorage(){
    localStorage.setItem("app",JSON.stringify(allCollections))
}


if(!localStorage.getItem("app")){
    localStorage.setItem("app",JSON.stringify([]))
}else{
    allCollections=JSON.parse(localStorage.getItem("app"))
}
// allCollections[0].todos=[new Todo("dfgsfggrtyrtu gh fgjhyh",1234545),new Todo("dfgsfggrtyrtu gh fgjhyh",1234545),new Todo("dfgsfggrtyrtu gh fgjhyh",1234545),]
// allCollections[1].todos=[new Todo("dff sdffg",1234545),new Todo("dff sdffg",1234545),new Todo("dff sdffg",1234545),]
displayDashboard(allCollections)
if(document.querySelector(".collection-btn")){
    document.querySelectorAll(".collection-btn")
    .forEach(collectionBtn => {
        collectionBtn.addEventListener("click",()=>{
            console.log("clicked collection btn")
            updateCollectionTab(allCollections.find(collection=>collection.name==collectionBtn.innerText))
        })
    });
}


addOnNewCollectionListener((collectionName)=>{
    const currentCollection=new TodoCollection(collectionName)
    const collectionBtn=makeCollectionBtn(currentCollection)
    collectionBtn.addEventListener("click",()=>{
        console.log("clicked collection btn")
        updateCollectionTab(currentCollection)
    })
    allCollections.push(currentCollection)
    updateCollectionTab(currentCollection)
    updateLocalStorage()
})
function updateCollectionTab(currentCollection){
    showCollectionTab(currentCollection)
    console.log(JSON.stringify(allCollections))
    addOnNewTodoListener((todoName,todoDate,collectionName)=>{
        console.log(collectionName)
        console.log(collectionName)
        const currentTodo=new Todo(todoName,todoDate)
        allCollections.find((collection)=>collection.name=collectionName).todos.push(currentTodo)
        addTodoElem(currentTodo)
        updateLocalStorage()
        addOnDeleteTodoListener(todoName,()=>{
            currentCollection.deleteTodo(todoName)
            updateLocalStorage()
        })
        console.log(JSON.stringify(allCollections))
    })
}