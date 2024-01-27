import { publicRequest } from "../requestMethods"
import { setGuestInfoStart, setGuestInfoSuccess, setGuestInfoFailure, resetGuestInfo } from "./guestRedux"
import { clearCart } from "./cartRedux"

export const addGuest = (email) => async (dispatch) => {
   
    try {
        dispatch(setGuestInfoStart());
        const guestInfo = { email };
        dispatch(setGuestInfoSuccess(guestInfo));
    } catch (error) {
        dispatch(setGuestInfoFailure(error.message));
    }

}


export const removeGuest = () => (dispatch) => {
    dispatch(resetGuestInfo());
  };