import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from "axios"
import SingleUser from './SingleUser'

const UserList = forwardRef((props, ref) => {

    const [users, setUsers] = useState([]);
    const [resetSignal, setResetSignal] = useState(0);

    const fetchUsers = async () => {
        const response = await axios.get("https://randomuser.me/api/?results=5")
        setUsers(response.data.results)
        handleReset();
    }
    useImperativeHandle(ref, () => ({
        refreshUsers() {
            fetchUsers();
        }
    }));
    const handleReset = () => {
        setResetSignal(prev => prev === 0 ? 1 : 0); 
    };
    useEffect(() => {
        fetchUsers();
        console.log(users);
    }, [])

    return (
        <div className='user-list'>
            <ul>
                {users.map((user, index) => (
                    <li ><SingleUser user={user} resetSignal={resetSignal} key={index} /></li>
                ))}
            </ul>
        </div>
    )
});

export default UserList;