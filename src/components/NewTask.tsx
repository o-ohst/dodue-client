import colors from "../common/colors";
import React, { useState } from 'react';

interface Props {
    setIsNewTaskOpen: Function;

}

function NewTask(props: Props) {

    const [selectedColor, setSelectedColor] = useState(-1);
    const closeModal = () => {
        props.setIsNewTaskOpen(false);
    }
    const handleColorChange = (e: any) => { setSelectedColor(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center pt-40 bg-gray-400 bg-opacity-75 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="drop-shadow-md">
                <div className="shadow overflow-hidden rounded-lg w-96 h-fit mx-auto my-auto">
                    <form action="#" method="POST" onSubmit={handleSubmit}>
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="flex justify-between">
                                <h1 className="pb-3 text-lg font-notosans">New Task</h1>
                                <button onClick={closeModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="gray">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block text-sm font-notosans text-gray-700">Task</label>
                                <input type="text" id="name" autoComplete="off" className="mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondaryHover focus:outline-none">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewTask;