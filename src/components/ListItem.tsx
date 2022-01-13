import { useState } from 'react';

interface Task {
    taskInfo: string;
}

function ListItem(props:Task) {
    const [isChecked, setIsChecked] = useState(false);
    let audio = new Audio("/thock.m4a");
    const handleChange = () => {
        setIsChecked(!isChecked);
        audio.play();
    };

    return (
        
        <div className="mt-3 flex">
            <input className="w-6 h-6 align-middle text-primary focus:ring-gray-200 focus:ring-opacity-0 border border-gray-300 rounded" id="1" type='checkbox' checked={isChecked} onChange={handleChange} />
            <div className={'mx-2 text-lg align-middle font-notosans select-none cursor-pointer w-56' + (isChecked ? ' line-through text-gray-400' : ' text-gray-800')} onClick={handleChange} >{props.taskInfo}</div>
        </div>
        
    )
}

export default ListItem;