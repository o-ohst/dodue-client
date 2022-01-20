import Label from './Label';
import List from './List';

interface Task {
    taskInfo: string,
    taskId: number,
}

interface Category {
    categoryName: string,
    categoryId: number,
    categoryColor: number,
    setIsNewTaskOpen: Function,
    tasks: Task[],
}

function Card(props:Category) {

    const openNewTask = () => {props.setIsNewTaskOpen(true)}

    return(
        <div className='bg-white font-notosans rounded-2xl drop-shadow-md p-5 mr-10 min-w-fit h-fit'>
            <div className='flex'>
                <Label name={props.categoryName} color={props.categoryColor} ></Label>
                <button className='my-auto ml-auto' onClick={openNewTask}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 drop-shadow-sm align-middle" fill="none" viewBox="0 0 24 24" stroke="gray">
                        <path stroke-width="1.5" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
            <List tasks={props.tasks}/>
        </div>
    )
}

export default Card;