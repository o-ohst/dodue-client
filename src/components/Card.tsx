import Label from './Label';
import List from './List';
import axios from 'axios';
import { useState } from 'react';

interface Task {
    taskInfo: string,
    taskId: number,
}

interface Category {
    categoryName: string,
    categoryId: number,
    categoryColor: number,
    setIsNewTaskOpen: Function,
    setThisCategory: Function,
    tasks: Task[],
    callback: Function,
}

function Card(props: Category) {

    const [disabled, setDisabled] = useState(false);

    const openNewTask = () => {
        props.setIsNewTaskOpen(true)
        props.setThisCategory(props.categoryId)
    }

    const deleteCategory = () => {
        if (disabled === false) {

            setDisabled(true);
            axios.delete(process.env.REACT_APP_API_URL + 'categories/delete', {
                withCredentials: true,
                headers: {
                    api_key: process.env.REACT_APP_API_KEY!,
                    category_id: props.categoryId.toString(),
                }
            }).then(res => {
                if (res.status === 200) {
                    props.callback();
                }
            }).catch(err => {
                console.log(err);
                setDisabled(false);
            }
            )
        }
    }

    return(
        <div id={props.categoryId.toString()} className='bg-white font-notosans rounded-2xl drop-shadow-md p-5 mr-10 min-w-fit h-fit'>
            <div className='flex'>
                <Label name={props.categoryName} color={props.categoryColor} ></Label>
                <button className='my-auto ml-auto' onClick={openNewTask}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 drop-shadow-sm align-middle" fill="none" viewBox="0 0 24 24" stroke="gray">
                        <path stroke-width="1.5" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
            {(props.tasks.length === 0) && (
                <button onClick={deleteCategory} className='mt-3 mr-2 text-lg underline text-gray-400'>Delete card</button>
            )}
            <List tasks={props.tasks}/>
        </div>
    )
}

export default Card;