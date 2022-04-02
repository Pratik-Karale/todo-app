import {Todo} from "./Todo.js"
//  tion.get
class TodoCollection{
    constructor(collectionName){
        this.todos=[]
        this.name=collectionName
    }
    add(todoName,todoDate){
        this.todos.push(new Todo(todoName,todoDate))
    }
    delete(todo){
        this.todos=this.todos.filter((t)=>t!==todo)
    }
    get(todoName){
        return this.todos.find((t)=>todoName==t.name)
    }
}

export {TodoCollection}