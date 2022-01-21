import React from "react";
import LoginScreen from "./components/Screens/Auth/LoginScreen";
import RegistrationScreen from "./components/Screens/Auth/RegistrationScreen";
import CreatePostsScreen from "./components/Screens/Auth/main/CreatePostsScreen";
import Home from "./components/Screens/Auth/main/Home";
import PostsScreen from "./components/Screens/Auth/main/PostsScreen";
import ProfileScreen from "./components/Screens/Auth/main/ProfileScreen";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet } from "react-native";


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function useRoute(isAuth) {
    if (!isAuth) {
        return (

            <AuthStack.Navigator>
                <AuthStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Registration"
                    component={RegistrationScreen} />
                <AuthStack.Screen options={{
                    headerShown: false,
                }}
                    name="Login"
                    component={LoginScreen} />
            </AuthStack.Navigator>
        )
    }
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarStyle: { height: 83 },
            headerTitleAlign: "center",
            tabBarShowLabel: false,
        }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused, color, size }) =>
                    (<View
                        style={{
                            ...styles.iconBox, backgroundColor: focused
                                ? "#FF6C00" : "ffffff"
                        }}>
                        <AntDesign
                            name="appstore-o"
                            size={size} color={focused ? '#fff' : "#212121"} /></View>),
                    headerRight: () => (<View
                         style={styles.headerIcon}>
                             <Feather 
                             name="log-out" 
                             size={24} 
                             color="black" />
                             </View>),
                    headerShown: false,
                }}
                name="PostsScreen"
                component={PostsScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon:
                     ({ focused, color, size }) =>
                      (<View 
                       style={{ ...styles.iconBox, backgroundColor: focused ? 
                        "#FF6C00" : 
                        "ffffff" }}>
                            <AntDesign 
                            name="plus"
                             size={size} 
                             color={focused ? '#fff' : 
                             "#212121"} />
                             </View>),
                }}
                name="Создать публикацию"
                component={CreatePostsScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: 
                    ({ focused, color, size }) => 
                    (<View style={{ ...styles.iconBox, backgroundColor: 
                        focused ? "#FF6C00" :
                         "ffffff" }}>
                             <MaterialCommunityIcons 
                             name="account" 
                             size={size} 
                             color={focused ? 
                                '#fff' : 
                                "#212121"} />
                                </View>),
                    title: "Профиль"
                }}
                name="ProfileScreen"
                component={ProfileScreen} />
        </Tab.Navigator>
    )
}

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