import React, { useState ,useEffect} from 'react'
import bgImage from "./assets/pic.jpg"

function App() {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")

  //load todos when mount
    useEffect(() => {
  try {
    const savedtodo = localStorage.getItem("todos")
    if (savedtodo) {
      setTodos(JSON.parse(savedtodo))
    }
  } catch (error) {
    console.error("Error loading todos:", error)
  }
}, [])

    //saved todo on localstorage
      useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todos)) //converts array-->string
      }, [todos])

      //add todo 
      const addTodo=()=>{
        if(input.trim()==="")return //preventing empty task
        const newTodo={text:input,completed:false}
        setTodos([...todos,newTodo])//Take all old todos and copy them then add newTodo at the end
        setInput("")// After adding task, we clear the input field.
      }

      //updating the todo by clicked on it
        const toggleTodo = (index) => {
        const updated = todos.map((todo, i)=>i=== index ? { ...todo, completed: !todo.completed } : todo)
        setTodos(updated)
      }
      
      //delete doto or done
        const deleteTodo=(index)=>{
        const updated=todos.filter((_,i)=>i!==index)
        setTodos(updated)
      }
      //filter
        const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed
        if (filter === "completed") return todo.completed
        return true
    })


  return (
    <div className="min-h-screen flex items-center justify-center"  style={{ backgroundImage: `url(${bgImage})` }}>
      
      <div className="w-full max-w-md border rounded-xl p-6 shadow">

          <h1 className="text-2xl font-bold text-center mb-1">Todo List</h1>
          <p className="text-center text-gray-500 mb-4">Stay focused, get things done</p>

          <div className="flex gap-2 mb-4">
            <input type="text"value={input}onChange={(e) => setInput(e.target.value)}  onKeyDown={(e) =>{if (e.key === "Enter") addTodo()}}placeholder="Add new task..."className="flex-1 border rounded-lg px-3 py-2 outline-none"/>
            <button onClick={addTodo} className="bg-pink-500 text-white px-4 py-2 rounded-lg">+ Add</button>
          </div>
          <div className="flex justify-center gap-2 mb-4">{["all", "active", "completed"].map((item, index) => (
            <button key={index}onClick={() => setFilter(item)}className={`px-3 py-1 border rounded-md text-sm ${filter === item ? "bg-pink-500 text-white" : ""}`}>
              {item}</button>))}
            </div>

        <div className="space-y-2">{filteredTodos.length === 0 ? (<p className="text-center text-gray-400">No tasks yet</p>
          ) : (filteredTodos.map((todo, index) => (
              <div key={index} className="flex justify-between items-center border p-2 rounded">
                
                <div className="flex items-center gap-2">
                  <input type="checkbox"checked={todo.completed} onChange={() => toggleTodo(index)}/>
                  <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.text} </span>
                </div>

                <button onClick={() => deleteTodo(index)} className="text-pink-500">❌</button>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default App
