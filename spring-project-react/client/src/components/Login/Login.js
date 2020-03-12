import React, { useState } from 'react';

import './Login.scss';
import loginRequest from '../../middleware/loginRequest';

const Login = props => {

    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = data;

    const dataHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async e => {
        e.preventDefault();

        try {
            const result = await loginRequest({ username, password });
            result.onload = () => {
                if(result.status === 202){
                    props.history.push('/');
                }else {
                    console.log(result.response);
                }
            }
        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        <form className='form__container' onSubmit={submitHandler}>
            <div className='username__container'>
                <label>Username:</label>
                <input className='username__input' type='text' id='username' name='username' onChange={dataHandler} />
            </div>
            <div className='password__container'>
                <label>Password:</label>
                <input className='password__input' type='password' id='password' name='password' onChange={dataHandler} />
            </div>
            <div className='btn__container'>
                <button type='submit' className='btn__submit'>Submit</button>
            </div>
        </form>
    );
};

export default Login;
