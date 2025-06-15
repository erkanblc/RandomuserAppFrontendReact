import React, { useEffect, useState } from 'react';
import axios from "axios"
import SingleUser from './SingleUser'
import { Box, TextField, Button, Typography, Stack } from '@mui/material';

const UserList = ({username}) => {
    const [users, setUsers] = useState([]);
    const [resultsCount, setResultsCount] = useState(9);
    const [resetSignal, setResetSignal] = useState(false);

    const fetchUsers = async (count) => {
        try {
            const response = await axios.get(`https://randomuser.me/api/?results=${count}`)
            setUsers(response.data.results)
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]); // Hata durumunda listeyi temizle
        }
    }

    useEffect(() => {
        // Sayfa yüklendiğinde varsayılan sayıda kullanıcıyı getir
        fetchUsers(resultsCount);
    }, []) // Boş dependency array, sadece mount olduğunda çalışır

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 1 && value <= 12) {
            setResultsCount(value);
        } else if (event.target.value === '') {
             setResultsCount(''); // Boş bırakıldığında state'i temizle
        }
    };

    const handleFetchClick = () => {
        if (resultsCount >= 1 && resultsCount <= 12) {
             fetchUsers(resultsCount);
             setResetSignal(prev => !prev);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" className='user-list'>
            <Stack direction="row" spacing={2} mb={4} alignItems="center">
                <Typography variant="h6">Gösterilecek Kullanıcı Sayısı (1-12):</Typography>
                <TextField
                    type="number"
                    value={resultsCount}
                    onChange={handleInputChange}
                    inputProps={{
                        min: 1,
                        max: 12,
                        step: 1,
                    }}
                    sx={{ width: 80 }}
                    size="small"
                />
                <Button variant="contained" onClick={handleFetchClick}>Getir</Button>
            </Stack>
            <ul>
                {users.map((user, index) => (
                    <li key={index}><SingleUser user={user} resetSignal={resetSignal}/></li>
                ))}
            </ul>
        </Box>
    )
};

export default UserList;