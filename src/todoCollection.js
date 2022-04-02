import {Todo} from "./Todo.js"

class TodoCollection{
    constructor(collectionName){
        this.todos=[]
        this.name=collectionName
    }
    add(todoName,todoDate){
        this.todos.push(new Todo(todoName,todoDate))
    }
    delete(todoName){
        this.todos=this.todos.filter((todo)=>todo.name!==todoName)
    }
    get(todo){
        return this.todos.find((t)=>todo==t)
    }
}

export {TodoCollection}