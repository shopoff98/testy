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
    const [comment, setComment] = useState(null);
    const { postId, updatePhoto } = route.params;
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
        <View style={s.wrapContent}>
            <FlatList data={comment}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View>
                        <View style={s.imageBox}>
                            <Image source={{ uri: updatePhoto }} style={s.image} />
                        </View>
                        <View>
                            <TextInput style={s.inputComment}>
                                {comment ? item.comment : "Нет коментариев"}
                            </TextInput>
                        </View>
                    </View>
                } />
        </View>
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
        justifyContent: "space-between",
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
    },
    wrapContent: {
        justifyContent: "flex-start"
    },
    imageBox: {
        marginTop: 32,
        height: 240,
        // borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 32,
    },

    image: {
        // borderStyle: "solid",
        borderColor: "#E8E8E8",
        borderWidth: 1,
        height: 240,
        overflow: "hidden",
        borderRadius: 8,
        width: "100%",
        justifyContent: "center",
    },
    inputComment: {
        width: 299,
        height: 75,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        borderRadius: 6,
        marginLeft: 10,


    }
})