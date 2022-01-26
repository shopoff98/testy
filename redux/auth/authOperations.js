import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authSlice } from "./authReducer";


export const authSignUpUser = createAsyncThunk(
    'auth/register',
    async ({ mail, password, login }) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, mail, password)
            console.log(response)
        } catch (error) {
            console.log(error)
        }


    }
)





export const authSingInUser = createAsyncThunk(
    "auth/login",
    async ({ mail, password }) => {
        try {
            const response = await signInWithEmailAndPassword(auth, mail, password)
            console.log(response)
        } catch (error) {
            console.log(error)
        }


    }
)




// const authSingInUser = () => async (dispatch, getState) => {

// };