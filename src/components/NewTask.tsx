import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    setIsNewTaskOpen: Function,
    categoryId: number,
    callback: Function,
}

function NewTask(props: Props) {

    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(false); //button disabled to prevent duplicate submissions

    const closeModal = () => {
        props.setIsNewTaskOpen(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setErrorMessage('');

        if (e.currentTarget.newname.value === '') {
            setErrorMessage("Please enter a name.")
            return
        }

        if (e.currentTarget.newname.value.length > 20) {
            setErrorMessage("Task name is too long")
            return
        }

        if (disabled === false) {

            setDisabled(true);

            const data = { name: e.currentTarget.newname.value, category_id: props.categoryId }

            axios.post(process.env.REACT_APP_API_URL + 'tasks/new', data, {
                withCredentials: true,
                headers: {
                    api_key: process.env.REACT_APP_API_KEY!,
                },
                validateStatus: (status) => (status === 200 || status === 400)
            }).then(res => {
                if (res.status === 200) {
                    props.callback();
                } else {
                    setErrorMessage(res.data.error);
                }
                setDisabled(false);
            }).catch(err => {
                console.log(err)
                setDisabled(false);
            })
            
        }
        
            
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center pt-40 bg-gray-400 bg-opacity-75 transition-opacity">
            <div className="drop-shadow-md">
                <div className="shadow overflow-hidden rounded-lg w-96 h-fit mx-auto my-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="flex justify-between">
                                <h1 className="pb-3 text-xl font-notosans">New Task</h1>
                                <button type="button" onClick={closeModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="gray">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block text-md font-notosans text-gray-700">Task</label>
                                <input autoFocus type="text" name="newname" id="name" autoComplete="off" className="mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-md border-gray-300 rounded-md" />
                                <label className="block text-sm font-notosans pt-2 text-red-400">{errorMessage}</label>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" disabled={disabled} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-secondary disabled:bg-gray-300 hover:bg-secondaryHover focus:outline-none">
                                {disabled ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewTask;