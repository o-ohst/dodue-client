import { useState } from 'react';
import axios from 'axios';
import { stringify } from 'querystring';

interface Task {
    taskInfo: string;
    taskId: number;
}

function ListItem(props:Task) {
    const [isChecked, setIsChecked] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);
    let audio = new Audio("/thock.m4a");
    const handleChange = () => {
        setInputDisabled(true);
        const data = { task_id: props.taskId, done: (!isChecked).toString() }
        setIsChecked(!isChecked);
        audio.play();
    
        axios.put(process.env.REACT_APP_API_URL + 'tasks/done', data, {
            withCredentials: true,
            headers: {
                api_key: process.env.REACT_APP_API_KEY!,
            }
        }).then(res => {
            if (res.headers.error === undefined && res.status === 200) {
                console.log("done task success")
            }
        }).catch(err => {
            console.log(err)
        }
        )

        setInputDisabled(false);
        
    };

    return (
        
        <div className="mt-3 flex">
            <input disabled={inputDisabled} className="w-6 h-6 align-middle text-primary focus:ring-gray-200 focus:ring-opacity-0 border border-gray-300 rounded" id="1" type='checkbox' checked={isChecked} onChange={handleChange} />
            <div className={'mx-2 text-lg align-middle font-notosans select-none cursor-pointer w-fit' + (isChecked ? ' line-through text-gray-400' : ' text-gray-800')} onClick={handleChange} >{props.taskInfo}</div>
        </div>
        
    )
}

export default ListItem;