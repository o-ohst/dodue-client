import Card from "./components/Card";
import { useState } from 'react';
import NewCard from "./components/NewCard";
import NewTask from "./components/NewTask";

const categories = [{ categoryName: 'CS1101S', categoryId: 1, categoryColor: 0 },
{ categoryName: 'Orientation', categoryId: 2, categoryColor: 1 },
{ categoryName: 'CCA', categoryId: 3, categoryColor: 2 },
];

function App() {

  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const openNewCard = () => { setIsNewCardOpen(true) };


  return (
    <div className="App flex flex-col h-screen">

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
        <button className='my-auto ml-auto' onClick={openNewCard}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-width="1.5" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </header>

      <div className='bg-background w-full h-full px-12 py-24 flex overflow-x-scroll'>
        {categories.map(category => (
          <Card setIsNewTaskOpen={setIsNewTaskOpen} categoryName={category.categoryName} categoryId={category.categoryId} categoryColor={category.categoryColor}></Card>
        ))}
      </div>
    </div>
  );
}

export default App;
