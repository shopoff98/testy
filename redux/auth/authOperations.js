import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authSlice } from "./authReducer";
import { useDispatch } from "react-redux";

// export const authSignUpUser = ({ email, password, nickname }) => async (
//     dispatch,
//     getState
// ) => {
//     try {
//         await createUserWithEmailAndPassword(auth, email, password);
//         const user = await auth.currentUser;
//         await updateProfile(user, {
//             displayName: nickname
//         })

//         const updateUserSuccess = await auth.currentUser;
//         await dispatch(authSlice.actions.updateUserProfile(updateUserSuccess))

//     } catch (error) {
//         console.log("error", error);

//         console.log("error.message", error.message);
//     }
// };


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
            console.log(updateUserSuccess.uid)
            console.log(updateUserSuccess.displayName)
            return updateUserSuccess

        } catch (error) {
            console.log(error)
        }


    }
)

// export const authSingInUser = createAsyncThunk(
//     "auth/login",
//     async ({ mail, password }) => {
//         try {
//             const response = await signInWithEmailAndPassword(auth, mail, password)
//             return response
//         } catch (error) {
//             console.log(error)
//         }


//     }
// )


export const authStateChangeUser = createAsyncThunk(
    'auth/state',
    async () => {
        try {
            await onAuthStateChanged(auth, (user => {
                if (user) {
                    const userUpdateProfile = {
                        nickname: user.displayName,
                        userId: user.uid,
                        stateChange: true
                    }
                    return userUpdateProfile
                }
            }
            ))
        }
        catch (error) {
            console.log(error)
        }



    }
)
