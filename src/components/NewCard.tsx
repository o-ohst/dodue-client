import colors from "../common/colors";
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    setIsNewCardOpen: Function,
    callback: Function,
}

function NewCard(props: Props) {

    // eslint-disable-next-line
    const [selectedColor, setSelectedColor] = useState(-1);
    const [errorMessage, setErrorMessage] = useState('');
    const closeModal = () => {
        props.setIsNewCardOpen(false);
    }
    const handleColorChange = (e: any) => { setSelectedColor(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setErrorMessage('');
        e.preventDefault();

        if (e.currentTarget.newname.value === '') {
            setErrorMessage("Please enter a name.")
            return 
        }

        if (selectedColor === -1) {
            setErrorMessage("Please select a color.")
            return
        }

        const data = {name: e.currentTarget.newname.value , color: selectedColor}

        axios.post(process.env.REACT_APP_API_URL + 'categories/new', data, {
            withCredentials: true,
            headers: {
                api_key: process.env.REACT_APP_API_KEY!,
            }
        }).then(res => {
            if (res.headers.error === undefined && res.status === 200) {
                props.callback();
            }
        }).catch(err => {
            console.log(err)
        }
        )
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center pt-40 bg-gray-400 bg-opacity-75 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="drop-shadow-md">
                <div className="shadow overflow-hidden rounded-lg w-96 h-fit mx-auto my-auto">
                    <form action="#" method="POST" onSubmit={handleSubmit}>
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="flex justify-between">
                                <h1 className="pb-3 text-xl font-notosans">New Category</h1>
                                <button onClick={closeModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="gray">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block text-md font-notosans text-gray-700">Name</label>
                                <input type="text" name="newname" id="name" autoComplete="off" className="mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-md border-gray-300 rounded-md" />
                            </div>
                            <div className="col-span-6 sm:col-span-3 mt-3">
                                <label className="block text-md font-notosans text-gray-700">Color</label>
                            </div>
                            <div className="mt-2">
                                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                                    <input style={{ background: colors[i] }} className='w-8 h-8 mr-2 border-none  focus:ring-gray-400 focus:border-gray-400 checked:ring-2 checked:ring-offset-2 checked:ring-gray-400' key={i} type='radio' name='color' value={i} onChange={handleColorChange}></input>
                                ))}
                            </div>
                            <label className="block text-sm font-notosans pt-2 text-red-400">{errorMessage}</label>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-secondary hover:bg-secondaryHover focus:outline-none">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewCard;