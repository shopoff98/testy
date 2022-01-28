import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
}
    from "firebase/auth";
import { auth } from "../../firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authSlice } from "./authReducer";
import { useDispatch } from "react-redux";

export const authSignUpUser = createAsyncThunk(
    'auth/register',
    async ({ mail, password, login }) => {
        try {
            await createUserWithEmailAndPassword(auth, mail, password)
            const user = await auth.currentUser;
            await updateProfile(user, {
                displayName: login
            })

            const updateUserSuccess = await auth.currentUser;
            return updateUserSuccess

        } catch (error) {
            console.log(error)
        }


    }
)

export const authSingInUser = createAsyncThunk(
    "auth/login",
    async ({ mail, password, nickname }) => {
        try {
            const response = await signInWithEmailAndPassword(auth, mail, password)
            return response
        } catch (error) {
            console.log(error)
        }


    }
)

