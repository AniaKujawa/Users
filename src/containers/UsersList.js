import React from 'react';
import User from './User';
import './UsersList.css';
import {FaTrashAlt} from 'react-icons/fa';

const UsersList = (props) => {
    return (
        <div className="box">
         {props.isEmpty ? null :
                        <select
                        defaultValue="sort-by"
                        onChange={props.sort}
                        className="userTable__sort">
                            <option value="sort-by" disabled>Sort by...</option>
                            <option value="nickname">Nickname</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                        </select> }
                        {props.isEmpty ? null :
                         <button 
                            type="button" 
                            className="userTable__removeAllButton"
                            onClick={props.removeAll}>
                            <FaTrashAlt /> Remove all users
                            </button>
                        }
         <table className="userTable">
            <thead className="userTable__header">
                <tr>
                        <th className="userTable__headerTitle">Nickname</th>
                        <th className="userTable__headerTitle">Email</th>
                        <th className="userTable__headerTitle">IP address</th>
                        <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.users.map(user =>
                                    <User 
                                    nickname={user.nickname} 
                                    email={user.email} 
                                    ip={user.ip} 
                                    key={user.email}
                                    onRemoveButtonClick={props.remove} />
                            )}
                        </tbody>
                        </table>
                    </div>
                
                )
}

export default UsersList;