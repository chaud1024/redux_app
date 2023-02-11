import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USER_URL)
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users;

export const selectUserByID = (state, userId) => state.users.find(user => user.id === userId);
// state와 userId를 가지는 selectUserByID
// state.user를 call
// pass in 했던 user.id와 userId가 일치하는 user를 find

export default usersSlice.reducer