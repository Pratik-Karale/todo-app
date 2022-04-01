import {Todo} from "./Todo.js"

class TodoCollection{
    constructor(collectionName){
        this.todos=[]
        this.name=collectionName
    }
    addTodo(todoName,todoDate){
        this.todos.push(new Todo(todoName,todoDate))
    }
    deleteTodo(todoName){
        this.todos=this.todos.filter((todo)=>todo.name!==todoName)
    }
}

export {TodoCollection}