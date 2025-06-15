import React, { useEffect, useState } from 'react';
import axios from "axios"
import SingleUserDb from './SingleUserDb';
import { Box, Typography, Stack } from '@mui/material';

const UserListDb = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("tokenKey"); // "Bearer eyJhbGciOi..."
            const response = await axios.get("http://localhost:8080/api/user", {
                headers: {
                    Authorization: token
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Kullanıcıları çekerken hata oluştu:", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const handleUserDeleted = () => {
        fetchUsers();
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" className='user-list'>
            <Stack direction="row" spacing={2} mb={4} alignItems="center">
                <Typography variant="h6">Users from Database</Typography>

            </Stack>
            <ul>
                {users.map((user, index) => (
                    <li key={index}><SingleUserDb user={user} onUserDeleted={handleUserDeleted} /></li>
                ))}
            </ul>
        </Box>
    )
};

export default UserListDb;