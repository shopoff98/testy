import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    Pressable,
    useWindowDimensions
} from "react-native";

import ProfileScreen from "./ProfileScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { Feather } from '@expo/vector-icons';
import { auth } from "../../../../firebase/config";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authSlice } from "../../../../redux/auth/authReducer";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NestedScreen = createNativeStackNavigator();

export default function DefProfileScreen() {
    const dispatch = useDispatch();

    function signOutUser() {
        signOut(auth).then(() => {
            dispatch(authSlice.actions.signOutUser())
        }).catch(error => console.log(error))
    }

    return (
        <NestedScreen.Navigator
            screenOptions={{ headerTitleAlign: "center", }}>
            <NestedScreen.Screen
                options={{ headerRight: () => (<TouchableOpacity onPress={signOutUser} style={styles.headerIcon}><Feather name="log-out" size={24} color="black" /></TouchableOpacity>), }}
                name="Профиль"
                component={ProfileScreen}
            />
            <NestedScreen.Screen name="Comments" component={CommentsScreen} />
            <NestedScreen.Screen name="Map" component={MapScreen} />
        </NestedScreen.Navigator>
    );
};

const styles = StyleSheet.create({
    iconBox: {
        width: 70,
        padding: 15,
        borderRadius: 20,
        alignItems: "center"
    },

    headerIcon: {
        marginRight: 10,
    }
})