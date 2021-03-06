import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    callback: Function;
}

function SignUp(props: Props) {

    const [usernameMessage, setUsernameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setUsernameMessage('');
        setPasswordMessage('');
        e.preventDefault();

        const u = e.currentTarget.username.value;
        const p = e.currentTarget.password.value;

        if (u.length < 5) {
            setUsernameMessage('Username must be at least 5 characters.')
            return
        }

        if (p.length < 8) {
            setPasswordMessage('Password must be at least 8 characters.')
            return
        }

        if (disabled === false) {
            setDisabled(true);

            axios.post(process.env.REACT_APP_API_URL + 'signup', {}, {
                headers: {
                    api_key: process.env.REACT_APP_API_KEY!,
                    username: u,
                    password: p,
                },
                validateStatus: (status) => (status === 200 || status === 400)
            }).then(res => {
                if (res.status === 200) {
                    console.log('signed up');
                    props.callback();
                } else {    
                    switch (res.data.error) {
                        case "ERROR: duplicate key value violates unique constraint \"users_username_key\" (SQLSTATE 23505)":
                            setUsernameMessage('Username already taken.');
                            break;
                        case "no username provided":
                            setUsernameMessage('Please enter username.')
                            break;
                        case "no password provided":
                            setPasswordMessage('Please enter password.')
                            break;
                        default:
                            console.log(res.data.error);
                            break;
                    }
                }
                setDisabled(false);
            }).catch(err => {
                console.log(err);
                setDisabled(false);
            })
        }
    }

    return (
        <div className="fixed overflow-y-auto flex justify-center pt-40 transition-opacity">

            <div className="">
                <div className="overflow-hidden rounded-lg w-96 h-fit mx-auto my-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="flex justify-center">
                                <h1 className="pb-3 text-xl font-notosans">Sign Up</h1>
                            </div>
                            <div className="col-span-6 sm:col-span-3 mt-3">
                                <label className="block text-md font-notosans text-gray-700">Username</label>
                                <input autoFocus type="text" name='username' id="username" autoComplete="username" className="mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm text-md border-gray-300 rounded-md" />
                                <label className="block text-sm font-notosans pt-2 text-red-400">{usernameMessage}</label>
                            </div>
                            <div className="col-span-6 sm:col-span-3 mt-3">
                                <label className="block text-md font-notosans text-gray-700">Password</label>
                                <input type="password" name='password' id="password" autoComplete="password" className="mt-1 focus:ring-secondary focus:border-secondary block w-full shadow-sm text-md border-gray-300 rounded-md" />
                                <label className="block text-sm font-notosans pt-2 text-red-400">{passwordMessage}</label>
                            </div>

                        </div>
                        <div className="px-4 py-3 bg-white text-center sm:px-6">
                            <button type="submit" disabled={disabled} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-secondary disabled:bg-gray-300 hover:bg-secondaryHover focus:outline-none">
                                {disabled ? "Signing up..." : "Sign up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;