import React, { useEffect, useState } from 'react';

const Error = (props) => {

    const [errors, setErrors] = useState([]); 

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors]) 


    return (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                {
                    errors.map(error => {
                        return(
                            <li>{ error }</li>
                        )
                    })
                }
            </ul>
        </div>
    )

}

export default Error; 