import React from 'react';
import './UserForm.css';

const UserForm = (props) => {
        return (
            <section>
                <form onSubmit={props.onSubmit} id="title" className="addForm" noValidate>
                   <h1>Crypto users</h1> 
                    <label htmlFor="nickname" className="addForm__label">Nickname</label>
                    <input
                        type="text" 
                        name="nickname" 
                        id="nickname"
                        className="addForm__input"
                        value={props.value.nickname} 
                        onChange={props.onChange} 
                        required>
                     </input>
                    {props.errors.nickname === "" ?
                         null : 
                         <div className="error">{props.errors.nickname}</div>
                    }
                    <label htmlFor="email" className="addForm__label">Email</label>
                    <input
                     type="email" 
                     name="email" 
                     id="email" 
                     className="addForm__input"  
                     value={props.value.email} 
                     onChange={props.onChange} 
                     required> 
                     </input> 
                    {props.errors.email === "" ?
                     null :
                     <div className="error">{props.errors.email}</div> 
                     }       
                    <label htmlFor="ip" className="addForm__label" >IP address</label> 
                    <input 
                    type="text"  
                    name="ip" 
                    id="ip" 
                    className="addForm__input" 
                    value={props.value.ip} 
                    onChange={props.onChange} 
                    required>
                    </input> 
                    {props.errors.ip === "" ?
                     null :
                    <div className="error">{props.errors.ip}</div> 
                    }       
                    <button type="submit" className="addForm__button">Add User</button>
                </form>
            </section>
        )
    }
    
export default UserForm;
