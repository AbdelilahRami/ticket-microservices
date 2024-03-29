import axios from 'axios';
import Axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {

    const [errors, setErrors] = useState(null);


    const doRequest = async() => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            onSuccess();
            return response;
        } catch (error) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops...</h4>
                    <ul className="my-0">
                        {error.response.data.errors.map(err => (<li key={err.message}>{err.message}</li>))}
                    </ul>
                </div>
            )
        }
    };
    return {doRequest, errors}
};