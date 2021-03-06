import React , {useState} from 'react';
import axios from 'axios';

interface Props {
    callback: Function,
    setIsLogInOpen: Function,
}

function LogIn(props: Props) {
    const [usernameMessage, setUsernameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [disabled, setDisabled] = useState(false);

    const closeModal = () => {
        props.setIsLogInOpen(false);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        setUsernameMessage('');
        setPasswordMessage('');

        const u = e.currentTarget.username.value;
        const p = e.currentTarget.password.value;

        if (u.length < 4) {
            setUsernameMessage('Please enter a valid username.')
            return
        }

        if (p.length < 4) {
            setPasswordMessage('Please enter a valid password.')
            return
        }

        if (disabled === false) {

            setDisabled(true);

            axios.post(process.env.REACT_APP_API_URL + 'login', {}, {
                withCredentials: true,
                headers: {
                    api_key: process.env.REACT_APP_API_KEY!,
                    username: e.currentTarget.username.value,
                    password: e.currentTarget.password.value,
                },
                validateStatus: (status) => (status === 200 || status === 400 )
            }).then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    console.log('logged in');
                    props.callback();
                } else {
                    console.log("not ok");
                    setPasswordMessage("Invalid login details.");
                }
                setDisabled(false);
            }).catch(err => {
                console.log(err);
                setDisabled(false);
            });
        }
        
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center pt-40 bg-gray-400 bg-opacity-75 transition-opacity">
            <div className="drop-shadow-md">
                <div className="shadow overflow-hidden rounded-lg w-96 h-fit mx-auto my-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="flex justify-between">
                                <h1 className="pb-3 text-xl font-notosans">Log in</h1>
                                <button type="button" onClick={closeModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="gray">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="col-span-6 sm:col-span-3 mt-3">
                                <label className="block text-md font-notosans text-gray-700">Username</label>
                                <input autoFocus type="text" name='username' id="username" autoComplete="username" className="mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-md border-gray-300 rounded-md" />
                                <label className="block text-sm font-notosans pt-2 text-red-400">{usernameMessage}</label>
                            </div>
                            <div className="col-span-6 sm:col-span-3 mt-3">
                                <label className="block text-md font-notosans text-gray-700">Password</label>
                                <input type="password" name='password' id="password" autoComplete="password" className="mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm sm:text-md border-gray-300 rounded-md" />
                                <label className="block text-sm font-notosans pt-2 text-red-400">{passwordMessage}</label>
                            </div>
                            
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" disabled={disabled} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-secondary hover:bg-secondaryHover disabled:bg-gray-300 focus:outline-none">
                                {disabled ? "Logging in..." : "Log in"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;