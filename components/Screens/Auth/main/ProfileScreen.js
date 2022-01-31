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
    FlatList,
    LogBox
} from "react-native";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EvilIcons } from '@expo/vector-icons';


export default function ProfileScreen({ navigation }) {
    const [userPosts, setUserPosts] = useState([]);
    const { userId } = useSelector(state => state.authSignUp)

    useEffect(() => {
        getAllPosts()
    }, [])

    async function getAllPosts() {
        const q = await query(collection(db, "posts"), where("userId", "==", userId));
        await onSnapshot(q, ((data) =>
            setUserPosts(data.docs.map((doc) => (
                { ...doc.data() }
            ))))
        )
    }
    return (<View style={s.container}>
        <FlatList
            data={userPosts}
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
        justifyContent: "center",
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