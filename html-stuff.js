`<button class="collection-btn">${collection.name}</button>`
`<h2 class="collection-name">${collection.name}</h2>
    <div class="collection-todos"  data-collection-name="${collection.name}"></div>`
`
<div class="todo-container" data-todo-name="${todo.name}">
    <input type="checkbox" class="todo-check">
    <input type="text" class="todo-name" value="${todo.name}"></input>
    <input type="date" class="todo-date" value="${todo.date}"></input>
</div>
`


`<div id="app">
    <nav><span id=""logo>Just Do IT!</span></nav>
  </div>`

  `
  <div class="add-collection-container">
      <input type="text" id="add-collection-input"></input>
      <button id="add-collection-btn">✔️</button>
  </div>
  `

  `
  <div class="add-todo-container">
      <input type="text" id="add-todo-name-input"></input>
      <input type="date" id="add-todo-date-input"></input>
      <button id="add-todo-btn">Add</button>
  </div>
  `
