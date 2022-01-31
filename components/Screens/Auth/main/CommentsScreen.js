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
import { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { db } from "../../../../firebase/config";
import { doc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

export default function CommentsScreen({ route }) {
    const [comment, setComment] = useState();
    const { postId } = route.params;
    const { nickname } = useSelector(state => state.authSignUp)

    useEffect(() => {
        getAllPost()
    }, [])

    async function addComment() {
        await addDoc(collection(db, "posts", `${postId}`, "comments"), { comment, nickname });
    }

    async function getAllPost() {
        await onSnapshot(collection(db, "posts", `${postId}`, "comments"), ((data) =>
            setComment(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        ))
    }


    return (<View style={s.container}>
        <FlatList data={comment}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <View><Text>
                {item.nickname}
            </Text>
                <Text>
                    {item.comment}
                </Text>
            </View>
            } />
        < View style={s.wrap}>
            <TextInput
                style={s.input}
                placeholder="Комментировать..."
                // value={registrationData.mail}
                onChangeText={setComment}
            />
            <TouchableOpacity style={s.icon} onPress={addComment}>
                <AntDesign name="arrowup" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    </View >)
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#fff",
        //  alignItems:"center"
    },
    input: {
        marginHorizontal: 16,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        height: 50,
        borderColor: '#E8E8E8',
        borderRadius: 100,
        borderStyle: 'solid',
        marginBottom: 16,
        paddingLeft: 16,
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
    },
    wrap: {
        position: "relative",
    },
    icon: {
        backgroundColor: "#FF6C00",
        position: "absolute",
        right: 30,
        top: 10,
        width: 34,
        height: 34,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    }
})