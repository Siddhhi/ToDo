import { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";

import { FaEdit } from "react-icons/fa";
import CurrentDate from './component/Cuurentdate';

function App() {
  const [todo, settodo] = useState("") //input
  const [todos, settodos] = useState([]) //exisiting todo
  const [finished, setfinished] = useState(true)

  // load data
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
    let todos=JSON.parse(localStorage.getItem("todos"))}
    settodos(todos)
  }, [])
  
  // save data
  const saveTols = (params) => { 
    localStorage.setItem("todos",JSON.stringify(todos))
   }
  // add function
  const handleadd = () => { 
    settodos([...todos,{id : uuidv4(),todo, isCompleted: false}])
    settodo("")
    console.log(todos)
    saveTols();
   }
   // edit function
  const handleedit = (e,id) => { 
    let t= todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{return item.id!==id })
    settodos(newtodos)
    saveTols();
   }
  // delete function
  const handledelete = (e,id) => { 
    let newtodos=todos.filter(item=>{return item.id!==id })
    settodos(newtodos)
    saveTols();
   }
   //input function
   const handlechange = (e) => { 
      settodo(e.target.value)
    }
    //checkbox function
    const handleCheckbox = (e) => { 
      let id= e.target.name;
      let index= todos.findIndex(item=>{
        return item.id=== id;
      })
      let newtodos=[...todos];
      newtodos[index].isCompleted=!newtodos[index].isCompleted;
      settodos(newtodos)
      saveTols();
     }
     //finished 
     const toggleFinished = (e) => { 
        setfinished(!finished)
      }
     
  return (
    <>
      <Navbar/> 
      <div className="mx-3 md:container md:mx-auto   my-5 bg-black rounded-xl p-5 min-h-[70vh] md:w-1/2">
      <h1 className='font-bold text-3xl text-center text-white'><CurrentDate/></h1>
          <div className="addtodo text-white my-5 flex flex-col gap-4">
            <h2 className=' text-lg font-bold'>Add a todo</h2>
            <input onChange={handlechange} value={todo} type="text" className='w-full rounded-lg  text-black px-5 py-2' />
            <button onClick={handleadd} disabled={todo.length<=2}className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm disabled:bg-violet-700 rounded-md font-bold  '>Save</button>
          </div>
          <input onChange={toggleFinished}type="checkbox" className='text-white' checked={finished} id="" /> <span className='text-white'>Show Finished</span>
          <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-white"></hr>
          <h2 className='font-bold  text-white '>Your todos</h2>
            <div className="todos  text-white ">
            {todos.length===0 && <div className='m-5'>No todos</div>}
            {todos.map(item=>{
            return (finished || !item.isCompleted) &&<div key={item.id} className="todo flex x m-5 justify-between md:w-1/2 ">
              <div className='flex gap-10 '>
              <input name={item.id} type="checkbox" onChange={handleCheckbox} checked={item.isCompleted}  id="" />
              <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleedit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md font-bold mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handledelete(e,item.id)}}className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md font-bold mx-1'><MdDelete /></button>
              </div>
            </div>
            })}
          </div>
        
      </div>
    </>
  )
}

export default App
