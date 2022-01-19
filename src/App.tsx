import Card from "./components/Card";
import React, { useState } from 'react';
import NewCard from "./components/NewCard";
import NewTask from "./components/NewTask";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useCookies } from "react-cookie";
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

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  // const [userId, setUserId] = useCookies(['user_id']);
  // const [token , setToken] = useCookies(['token']);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const openNewCard = () => { setIsNewCardOpen(true) };
  const openLogIn = () => { setIsLogInOpen(true) };
  const signUpToast = () => { toast('Success!') }

  const onSignUp = () => {
    openLogIn();
    toast.success('Sign up success!');
  }

  const onLogIn = () => {
    setLoggedIn(true);
    setIsLogInOpen(false);
    toast.success('Log in success!');
    axios.get(process.env.REACT_APP_API_URL + 'categories', {
      headers: {
        api_key: process.env.REACT_APP_API_KEY!,
        // user_id: userId as string,
        // token: token as string,
      }
    }).then(res => {
      if (res.data.error === undefined && res.status === 200) {
        console.log('get categories success');
      } else {
        console.log(res.data.error);
      }
    }).catch(err => {
      console.log(err.toJSON());
    })
  }


  return (
    <div className="App flex flex-col h-screen">

      <Toaster/>
      
      {isLogInOpen && (
        <LogIn callback={onLogIn} setIsLogInOpen={setIsLogInOpen}></LogIn>
      )}
      {isNewCardOpen && (
        <NewCard setIsNewCardOpen={setIsNewCardOpen}></NewCard>
      )}
      {isNewTaskOpen && (
        <NewTask setIsNewTaskOpen={setIsNewTaskOpen}></NewTask>
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

      {loggedIn && (<div className='bg-background w-full h-full px-12 py-24 flex overflow-x-scroll'>
        {categories.map(category => (
          <Card setIsNewTaskOpen={setIsNewTaskOpen} categoryName={category.categoryName} categoryId={category.categoryId} categoryColor={category.categoryColor}></Card>
        ))}
      </div>)}
    </div>
  );
}

export default App;
