import React from 'react';
import '../index.css';

const User = (props) => {
    return (
    <tr className="userTable__row">
        <td className="userTable__data">{props.nickname}</td>
        <td className="userTable__data">{props.email}</td>
        <td className="userTable__data">{props.ip}</td>
        <td className="userTable__data">
            <button 
            type="button" 
            className="userTable__removeButton"
            onClick={props.onRemoveButtonClick.bind(null, props.email)}>
            x  
            </button>
        </td>
    </tr>
    )
}

export default User;