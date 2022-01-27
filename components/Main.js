import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from "react";
import useRoute from "../route";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../redux/auth/authReducer";

export default function Main() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const stateChange = useSelector(state => state.authSignUp.stateChange)


    onAuthStateChanged(auth, (user) => {
        if (user) {
            const currentUser = {
                userId: user.uid,
                nickname: user.displayName,
                stateChange: true
            }
            dispatch(authSlice.actions.authStateChange(currentUser))
        }
    })

    const routing = useRoute(stateChange)

    return (
        <NavigationContainer>
            {routing}
        </NavigationContainer>
    )
}