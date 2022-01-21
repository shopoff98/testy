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

export default function CommentsScreen(){
    return(<View style={s.container}>
    <Text>CommentScreen</Text>
</View>)
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        //  alignItems:"center"
    }})