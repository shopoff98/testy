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

import DefaultScreenPosts from "./DefaultScreenPosts";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { Feather } from '@expo/vector-icons'; 

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NestedScreen = createNativeStackNavigator();

export default function PostsScreen(){
    return (
        <NestedScreen.Navigator
        screenOptions={{headerTitleAlign:"center",}}>
          <NestedScreen.Screen
          options={{headerRight:()=>(<View style={styles.headerIcon}><Feather name="log-out" size={24} color="black" /></View>),}}
            name="Публикации"
            component={DefaultScreenPosts}
          />
          <NestedScreen.Screen name="Comments" component={CommentsScreen} />
          <NestedScreen.Screen name="Map" component={MapScreen} />
        </NestedScreen.Navigator>
      );
    };

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