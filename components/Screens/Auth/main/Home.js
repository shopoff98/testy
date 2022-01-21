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

import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 



import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Tab = createBottomTabNavigator();

export default function Home(){
    return(
    <Tab.Navigator
        initialRouteName="PostsScreen"
         screenOptions={{tabBarActiveTintColor: '#fff',
    tabBarStyle:{height:83},
    headerTitleAlign:"center",
    }} 
    tabBarOptions={{ showLabel: false }}
    >
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused, color, size }) => (<View style={{...styles.iconBox, backgroundColor: focused ? "#FF6C00": "ffffff"}}><AntDesign name="appstore-o" size={size} color={focused ? '#fff': "#212121"} /></View>),
                // title:"Публикации",
                headerRight:()=>(<View style={styles.headerIcon}><Feather name="log-out" size={24} color="black" /></View>)
            }}
            name="PostsScreen"
            component={PostsScreen} />
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused, color, size }) =>
                 (
                 <View 
                 style={{...styles.iconBox, backgroundColor: focused ? "#FF6C00": "ffffff"}}>
                     <AntDesign
                      name="plus"
                       size={size} 
                       color={focused ? '#fff': "#212121"} />
                       </View>),
                title:"Создать публикацию",
            }}
            name="DefaultScreen"
            component={CreatePostsScreen} />
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused, color, size }) => (<View style={{...styles.iconBox, backgroundColor: focused ? "#FF6C00": "ffffff"}}><MaterialCommunityIcons name="account" size={size} color={focused ? '#fff': "#212121"} /></View>),
                title:"Профиль"
            }}
            name="ProfileScreen"
            component={ProfileScreen} />
    </Tab.Navigator>
)
}

const styles = StyleSheet.create({
    iconBox:{
        width:70,
        padding:15, 
        borderRadius:20,
        alignItems:"center"
    },
    
    headerIcon:{
        marginRight:10,
    }
})