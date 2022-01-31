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
    useWindowDimensions,
    FlatList
} from "react-native";
import { useEffect, useState } from "react";

import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { onSnapshot, doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/config";


export default function DefaultScreenPosts({ route, navigation }) {
    const [posts, setPosts] = useState([]);

    async function getAllPost() {
        await onSnapshot(collection(db, "posts"), ((data) =>
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        ))
    }

    useEffect(() => {
        getAllPost();
    }, [])
    return (
        <View
            style={s.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={s.box}>
                        <View style={s.imageBox}>
                            <Image source={{ uri: item.updatePhoto }} style={s.image} />
                        </View>
                        <View style={s.title}><Text style={s.titleText}>{item.name}</Text></View>
                        <View style={s.addInfo}>
                            <View style={s.loc}>
                                <TouchableOpacity onPress={() => navigation.navigate("Comments", { postId: item.id })}>
                                    <EvilIcons
                                        name="comment"
                                        size={24}
                                        color="black" />
                                </TouchableOpacity>
                                <Text>0</Text>
                            </View>
                            <View style={s.loc}>
                                <TouchableOpacity onPress={() => navigation.navigate("Map", { item })}>
                                    <EvilIcons
                                        name="location"
                                        size={24}
                                        color="black" />
                                </TouchableOpacity>
                                <Text>{item.nameLocation}</Text>
                            </View>
                        </View>
                    </View>
                }
            />
        </View>)
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        //  alignItems:"center"
        paddingBottom: 10
    },

    box: {
        marginHorizontal: 16
    },

    imageBox: {
        marginTop: 32,
        height: 240,
        // borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
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

    title: {
        marginTop: 8,
        marginBottom: 11,
    },

    titleText: {
        fontWeight: "500",
        color: "#212121",
        fontSize: 16,
    },

    addInfo: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    loc: {
        flexDirection: "row",
    }
})