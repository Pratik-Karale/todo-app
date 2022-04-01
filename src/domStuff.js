function parseToElem(str){
    const tempDiv=document.createElement("div")
    tempDiv.innerHTML=str
    return tempDiv.querySelector("*:first-child")
}

function makeCollectionBtns(allCollections){
    let collectionsNav
    if(!document.querySelector(".collections-nav")){
        console.log(1231231434)
        collectionsNav=document.createElement("aside")
        collectionsNav.classList.add("collections-nav")
        getAppElem().appendChild(collectionsNav)
    }
    for(const collection of allCollections){
        makeCollectionBtn(collection)
    }
}

function makeCollectionBtn(collection){
    const collectionsNav=document.querySelector(".collections-nav")
    const collectionBtn=parseToElem(`<button class="collection-btn">${collection.name}</button>`)
    // collectionBtn.addEventListener("click",()=>showCollectionTab(collection))
    collectionsNav.appendChild(collectionBtn)
    return collectionBtn
}

function showCollectionTab(collection){
    let collectionTab;
    if(!document.querySelector(".current-collection-container")){
        collectionTab=document.createElement("div")
        collectionTab.classList.add("current-collection-container")
        getAppElem().appendChild(collectionTab)
    }
    collectionTab=document.querySelector(".current-collection-container")
    collectionTab.setAttribute("data-todo-name",collection.name)
    collectionTab.innerHTML=`<h2 class="collection-name">${collection.name}</h2>
    <div class="collection-todos"  data-collection-name="${collection.name}"></div>`
    
    addNewTodoInput()
    for(const todo of collection.todos){
        addTodoElem(todo)
    }
}
function addTodoElem(todo){
    const collectionTodosElem=document.querySelector(".collection-todos")
    const todoContainer=parseToElem(`
        <div class="todo-container" data-todo-name="${todo.name}">
            <input type="checkbox" class="todo-check">
            <h4 class="todo-name">${todo.name}</h4>
            <h5 class="todo-date">${todo.date}</h5>
        </div>
        `)
    todoContainer.querySelector(".todo-check").add
    collectionTodosElem.appendChild(todoContainer)
}
function getAppElem(){
    return document.querySelector("#app")
}

function displayDashboard(allCollections){
    const appElem=parseToElem(`<div id="app">
    <nav><span id=""logo>Just Do IT!</span></nav>
  </div>`)
  document.body.appendChild(appElem)
  makeCollectionBtns(allCollections)
  addNewCollectionInput()
  if(allCollections[0]){
      showCollectionTab(allCollections[0])
  }
}
function addNewCollectionInput(){
    const collectionInput=parseToElem(`
    <div class="add-collection-container">
        <input type="text" id="add-collection-input"></input>
        <button id="add-collection-btn">✔️</button>
    </div>
    `)
    const collectionsNav=document.querySelector(".collections-nav")
    collectionsNav.insertBefore(collectionInput,collectionsNav.children[0])
}

function addNewTodoInput(){
    const todoInput=parseToElem(`
    <div class="add-todo-container">
        <input type="text" id="add-todo-name-input"></input>
        <input type="date" id="add-todo-date-input"></input>
        <button id="add-todo-btn">Add</button>
    </div>
    `)
    const todoCollectionContainer=document.querySelector(".collection-todos")
    if(todoCollectionContainer.children[0]){
        collectionsNav.insertBefore(todoInput,todoCollectionContainer.children[0])
    }else{
        todoCollectionContainer.appendChild(todoInput)
    }
}


function addOnNewCollectionListener(callbackFunc){
    const collectionBtn=document.querySelector("#add-collection-btn")
    collectionBtn.addEventListener("click",()=>{
        const collectionInput=document.querySelector("#add-collection-input")
        if(collectionInput.value)callbackFunc(collectionInput.value);
        collectionInput.value=""
    })
}
function addOnNewTodoListener(callbackFunc){
    const todoBtn=document.querySelector("#add-todo-btn")
    todoBtn.addEventListener("click",()=>{
        const collectionName=document.querySelector("[data-collection-name]").getAttribute("data-collection-name")
        const todoNameInput=document.querySelector("#add-todo-name-input")
        const todoDateInput=document.querySelector("#add-todo-date-input")
        if(todoNameInput.value)callbackFunc(todoNameInput.value,todoDateInput.value,collectionName);
        todoNameInput.value=""
        todoDateInput.value=""
    })
}
function addOnDeleteTodoListener(todoName,callbackFunc){
    const todo=[...document.querySelectorAll(".todo-container")].find((todoElem)=>todoElem.innerText.includes(todoName))
    const checkBox=todo.children[0]
    checkBox.addEventListener("click",()=>{
        todo.remove()
        callbackFunc(todoName)
    })

}

function addOnCollectionBtnClick(callback){
    document.querySelector
}
export {displayDashboard,makeCollectionBtns,addOnNewCollectionListener,showCollectionTab,makeCollectionBtn,addOnNewTodoListener,addTodoElem,addOnDeleteTodoListener}