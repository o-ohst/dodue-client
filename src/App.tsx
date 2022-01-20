import Card from "./components/Card";
import React, { useState, useEffect } from 'react';
import NewCard from "./components/NewCard";
import NewTask from "./components/NewTask";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

// const categories = [{ categoryName: 'CS1101S', categoryId: 1, categoryColor: 0 },
// { categoryName: 'Orientation', categoryId: 2, categoryColor: 1 },
// { categoryName: 'CCA', categoryId: 3, categoryColor: 2 },
// ];

type Category = {
  categoryName: string,
  categoryId: number,
  categoryColor: number,
}

interface Task {
  taskInfo: string,
  taskId: number,
  categoryId: number,
}

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [thisCategory, setThisCategory] = useState(-1);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [categories, setCategories] = useState<Category[]>([{ "categoryId": 5, "categoryName": "CS2040S", "categoryColor": 0 }, { "categoryId": 6, "categoryName": "CVWO", "categoryColor": 1 }, { "categoryId": 7, "categoryName": "Orientation", "categoryColor": 2 }, { "categoryId": 8, "categoryName": "UTW1001C", "categoryColor": 3 }, { "categoryId": 9, "categoryName": "General", "categoryColor": 4 }]);
  // const [tasks, setTasks] = useState<Task[]>([{ "taskId": 6, "taskInfo": "watch lecture", "categoryId": 5 }, { "taskId": 7, "taskInfo": "do problem set", "categoryId": 5 }, { "taskId": 8, "taskInfo": "laundry", "categoryId": 9 }, { "taskId": 9, "taskInfo": "call meeting", "categoryId": 7 }, { "taskId": 10, "taskInfo": "prepare poster", "categoryId": 7 }, { "taskId": 11, "taskInfo": "plan games", "categoryId": 7 }, { "taskId": 12, "taskInfo": "readings", "categoryId": 8 }]);

  const openNewCard = () => { setIsNewCardOpen(true) };
  const openLogIn = () => { setIsLogInOpen(true) };

  useEffect(() => {
    console.log(localStorage.getItem('loggedIn'));
    if (localStorage.getItem('loggedIn') === 'true') {
      setLoggedIn(true);
      loadData();
    }
  }, []);


  const loadData = () => {
    axios.get(process.env.REACT_APP_API_URL + 'categories', {
      withCredentials: true,
      headers: {
        api_key: process.env.REACT_APP_API_KEY!,
      }
    }).then(res => {
      if (res.data.error === undefined && res.status === 200) {
        console.log('get categories success');
        const data: Category[] = [];
        res.data.map((c: any) => data.push({ categoryId: c.category_id, categoryName: c.name, categoryColor: c.color }))
        setCategories(data);
      } else {
        console.log(res.data.error);
      }
    }).catch(err => {
      console.log(err);
    })

    axios.get(process.env.REACT_APP_API_URL + 'tasks', {
      withCredentials: true,
      headers: {
        api_key: process.env.REACT_APP_API_KEY!,
      }
    }).then(res => {
      if (res.data.error === undefined && res.status === 200) {
        console.log('get tasks success');
        const data: Task[] = [];
        res.data.map((t: any) => data.push({ taskId: t.task_id, taskInfo: t.name, categoryId: t.category_id }))
        setTasks(data);
      } else {
        console.log(res.data.error);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const onSignUp = () => {
    openLogIn();
    toast.success('Sign up success!');
  }

  const onLogIn = () => {
    setLoggedIn(true);
    setIsLogInOpen(false);
    toast.success('Log in success!');
    loadData();
    localStorage.setItem('loggedIn', 'true')
  }

  

  return (
    <div className="App flex flex-col h-screen">

      <Toaster />

      {isLogInOpen && (
        <LogIn callback={onLogIn} setIsLogInOpen={setIsLogInOpen}></LogIn>
      )}
      {isNewCardOpen && (
        <NewCard setIsNewCardOpen={setIsNewCardOpen}></NewCard>
      )}
      {isNewTaskOpen && (
        <NewTask categoryId={thisCategory} setIsNewTaskOpen={setIsNewTaskOpen}></NewTask>
      )}

      <header className="App-header bg-primary h-24 md:h-28 drop-shadow-md px-10 md:px-14 flex">
        <h1 className='drop-shadow-md font-questrial text-[2.2rem] md:text-[2.8rem] text-white my-auto'>
          dodue
        </h1>
        {loggedIn || (
          <button className='my-auto ml-auto' onClick={openLogIn}>
            <h1 className=' font-questrial text-[1.7rem] md:text-[1.7rem] text-white my-auto' >log in</h1>
          </button>
        )}
        {loggedIn && (
          <button className='my-auto ml-auto' onClick={openNewCard}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="white">
              <path stroke-width="1.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}

      </header>

      {loggedIn || (<div className="flex justify-center w-full h-full bg-background">
        <SignUp callback={onSignUp}></SignUp>
      </div>  
      )}

      {loggedIn && (<div className='bg-background w-full h-full px-12 py-24 flex overflow-x-scroll '>
        {categories.map(category => (
          <Card setThisCategory={setThisCategory} setIsNewTaskOpen={setIsNewTaskOpen} categoryName={category.categoryName} categoryId={category.categoryId} categoryColor={category.categoryColor} tasks={tasks.filter(t => t.categoryId === category.categoryId)}></Card>
        ))}
      </div>)}
    </div>
  );
}

export default App;
