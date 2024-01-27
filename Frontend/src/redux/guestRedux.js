import { createSlice } from '@reduxjs/toolkit'

const guestRedux = createSlice({
    name: "guest",
    initialState: {
        guestInfo: null,
        isFetching: false,
        error: null,
    },
    reducers: {
        setGuestInfoStart: (state) => {
            state.isFetching = true
            state.error = null
        },
        setGuestInfoSuccess: (state, action) => {
            state.isFetching = false
            state.guestInfo = action.payload
            state.error = null
            
        },
        setGuestInfoFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload 
          
        },
        resetGuestInfo: (state) => {
            state.guestInfo = null
            state.isFetching = false
            state.error = null
  
        }
    
    }
})


export const { setGuestInfoStart, setGuestInfoSuccess, setGuestInfoFailure, resetGuestInfo } = guestRedux.actions;
export default guestRedux.reducer;
