import {useState} from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default ()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors}= useRequest({
        url :'/api/users/signin',
        method :'post',
        body: {
            email, password
        },
        onSuccess: ()=> Router.push('/')
    });

    const formSubmit=async (event)=>{
        event.preventDefault();
        doRequest();
    }

    return (
        <form onSubmit= {formSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Email Adress</label>
                <input value= {email} onChange={event=>setEmail(event.target.value)} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input value= {password} onChange={ event=>setPassword(event.target.value)} type="password" className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}