let tasks = []

const form = document.getElementById("taskForm")
const input = document.getElementById("taskInput")
const list = document.getElementById("taskList")

const sortCreated = document.getElementById("sortCreated")
const sortUpdated = document.getElementById("sortUpdated")
const sortStatus = document.getElementById("sortStatus")
const resetSort = document.getElementById("resetSort")

// PURE FUNCTIONS
const createTask = text => ({
  id: Date.now(),
  text,
  completed:false,
  createdAt: new Date(),
  updatedAt: new Date()
})

const toggleTask = task => ({
  ...task,
  completed: !task.completed,
  updatedAt: new Date()
})

const updateTask = (task,newText) => ({
  ...task,
  text:newText,
  updatedAt: new Date()
})

// RENDER
const renderTasks = () => {
  list.innerHTML=""

  if(tasks.length===0){
    const p = document.createElement("p")
    p.textContent="Список завдань пустий"
    list.appendChild(p)
    return
  }

  tasks.forEach(task => {
    const li = document.createElement("li")
    li.className="task"
    if(task.completed) li.classList.add("completed")

    // чекбокс для статусу
    const checkbox = document.createElement("input")
    checkbox.type="checkbox"
    checkbox.checked = task.completed
    checkbox.addEventListener("change", ()=>{
      tasks = tasks.map(t=> t.id===task.id ? toggleTask(t) : t)
      renderTasks()
    })

    const span = document.createElement("span")
    span.textContent = task.text
    if(task.completed) span.style.textDecoration="line-through"

    const buttons = document.createElement("div")
    buttons.className="task-buttons"

    const editBtn = document.createElement("button")
    editBtn.textContent="Редагувати"
    editBtn.className="edit"
    editBtn.onclick = ()=>{
      const inputText = document.createElement("input")
      inputText.type="text"
      inputText.value = task.text
      li.replaceChild(inputText, span)
      inputText.focus()

      inputText.addEventListener("blur", ()=>{
        const newText = inputText.value.trim()
        if(newText){
          tasks = tasks.map(t=> t.id===task.id ? updateTask(t,newText) : t)
        }
        renderTasks()
      })

      inputText.addEventListener("keydown",(e)=>{
        if(e.key==="Enter"){
          inputText.blur()
        }
      })
    }

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent="Видалити"
    deleteBtn.className="delete"
    deleteBtn.onclick = ()=>{
      tasks = tasks.filter(t=> t.id!==task.id)
      renderTasks()
    }

    buttons.append(editBtn, deleteBtn)
    li.append(checkbox, span, buttons)
    list.appendChild(li)
  })
}

// ADD TASK
form.addEventListener("submit", e=>{
  e.preventDefault()
  const text = input.value.trim()
  if(!text) return
  tasks = [...tasks, createTask(text)]
  input.value=""
  renderTasks()
})

// SORTING
sortCreated.onclick=()=>{
  tasks=[...tasks].sort((a,b)=>a.createdAt-b.createdAt)
  renderTasks()
}
sortUpdated.onclick=()=>{
  tasks=[...tasks].sort((a,b)=>a.updatedAt-b.updatedAt)
  renderTasks()
}
sortStatus.onclick=()=>{
  tasks=[...tasks].sort((a,b)=>a.completed-b.completed)
  renderTasks()
}
resetSort.onclick=()=>{
  tasks=[...tasks]
  renderTasks()
}

renderTasks()