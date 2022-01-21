import { useState } from 'react';
import axios from 'axios';

interface Task {
    taskInfo: string;
    taskId: number;
}

function ListItem(props:Task) {
    const [isChecked, setIsChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    let audio = new Audio("/thock.m4a");
    const handleChange = () => {
        audio.play();
    
        if (disabled === false) {

            setDisabled(true);

            axios.put(process.env.REACT_APP_API_URL + 'tasks/done', {}, {
                withCredentials: true,
                headers: {
                    api_key: process.env.REACT_APP_API_KEY!,
                    task_id: props.taskId.toString(),
                    done: (!isChecked).toString(),
                },
                validateStatus: (status) => (status === 200 || status === 400)
            }).then(res => {
                if (res.status === 200) {
                    console.log("done task success")
                    setIsChecked(!isChecked);
                } else {
                    console.log(res.data.error);
                }
                setDisabled(false);
            }).catch(err => {
                console.log(err)
                setDisabled(false);
            }
            )

        }
        
    };

    return (
        
        <div className="mt-3 flex">
            <input className="w-6 h-6 align-middle text-primary focus:ring-gray-200 cursor-pointer focus:ring-opacity-0 border border-gray-300 rounded disabled:bg-gray-300" id={props.taskId.toString()} type='checkbox' disabled={disabled} checked={isChecked} onChange={handleChange} />
            <div className={'mx-2 text-lg align-middle font-notosans select-none cursor-pointer w-fit' + (isChecked ? ' line-through text-gray-400' : ' text-gray-800')} onClick={handleChange} >{props.taskInfo}</div>
        </div>
        
    )
}

export default ListItem;