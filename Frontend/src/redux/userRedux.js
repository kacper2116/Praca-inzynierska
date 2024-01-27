import { createSlice } from '@reduxjs/toolkit'
import { resetGuestInfo } from './guestRedux'; 

const userRedux = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: null,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
            state.error = null
            resetGuestInfo(state)

        },
        loginFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload 
          
        },
        logoutUser: (state) => {
            state.currentUser = null
            state.isFetching = false
            state.error = null
  
        },
        resetError: (state) => {
            state.error = null
            
        },
        

    }
})


export const { loginStart, loginSuccess, loginFailure, logoutUser, resetError } = userRedux.actions
export default userRedux.reducer