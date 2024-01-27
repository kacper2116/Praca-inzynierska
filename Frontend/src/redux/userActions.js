import { publicRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux"
import { clearCart } from "./cartRedux"
import { resetGuestInfo } from "./guestRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())

   
    try {
        const res = await publicRequest.post('/auth/login', user)
        const token = res.data.token

        dispatch(loginSuccess(token))
        dispatch(resetGuestInfo())
    } catch (error) {
       
        if (error.response) {
            const errorMessage = error.response.data.message     
            console.log(errorMessage)
               
            dispatch(loginFailure(errorMessage))

        }else if(error.request){
            dispatch(loginFailure('Błąd po stronie serwera'));
        }else{
            dispatch(loginFailure('Wystąpił nieznany błąd'));
        }

    }

}



export const logout = () => async (dispatch) => {
    // Dodaj logikę czyszczenia tokenów sesji, czyścisz dane z localStorage itp.
    // ...

    dispatch(logoutUser());
    dispatch(clearCart());

};
