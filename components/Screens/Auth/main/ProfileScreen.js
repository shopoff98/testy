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
import { auth } from "../../../../firebase/config";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authSlice } from "../../../../redux/auth/authReducer";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function ProfileScreen({ navigation }) {
    const [userPosts, setUserPosts] = useState([]);
    const { userId, nickname } = useSelector(state => state.authSignUp)
    const dispatch = useDispatch();

    function signOutUser() {
        signOut(auth).then(() => {
            dispatch(authSlice.actions.signOutUser())
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    async function getAllPosts() {
        const q = await query(collection(db, "posts"), where("userId", "==", userId));
        await onSnapshot(q, ((data) =>
            setUserPosts(data.docs.map((doc) => (
                { ...doc.data(), id: doc.id }
            ))))
        )
    }
    return (<View style={s.container}>
        <ImageBackground style={s.backImage} source={require('../../../../assets/images/bcg-image.jpg')}>
            <View style={s.form}>
                <View style={s.imageProfileBox}>
                    <View style={s.adaWrap}>
                        <Image style={s.imageProfile} />
                        <AntDesign style={s.icon} name="pluscircleo" size={25} color="#FF6C00" />
                    </View>
                </View>
                <TouchableOpacity onPress={signOutUser}
                    style={s.headerIcon}>
                    <Feather name="log-out"
                        size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={s.profileName}>
                    {nickname}
                </Text>
                <FlatList
                    data={userPosts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={s.box}>
                            <View style={s.imageBox}>
                                <Image source={{ uri: item.updatePhoto }} style={s.image} />
                            </View>
                            <View style={s.title}><Text style={s.titleText}>{item.name}
                            </Text>
                            </View>
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
            </View>
        </ImageBackground>
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

    },

    profileName: {
        textAlign: "center",
        fontWeight: "500",
        marginBottom: 33,
        fontFamily: "Roboto-Regular",
        fontWeight: "500",
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 0.01,
        color: "#212121",
        fontStyle: "normal",
        marginTop: 92,
    },

    titleText: {
        fontWeight: "500",
        fontFamily: "Roboto-Medium",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0.01,
        color: "#212121",
        fontStyle: "normal"
    },

    addInfo: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    loc: {
        flexDirection: "row",
    },
    form: {
        position: "relative",
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: 549,
        justifyContent: 'center',
        marginTop: 253,

    },

    backImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    },

    iconBox: {
        width: 70,
        padding: 15,
        borderRadius: 20,
        alignItems: "center"
    },

    headerIcon: {
        marginRight: 10,
        position: "absolute",
        right: 10,
        top: 30
    },
    photoiconwrap: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    imageProfile: {
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: "#F6F6F6",
        marginBottom: 32,
    },
    imageProfileBox: {
        alignItems: 'center',
        position: "absolute",
        top: -50,
        right: "50%",
        left: "50%"
    },

    icon: {
        position: "absolute",
        right: -10,
        top: 90
    },
    addWrap: {
        position: "relative"
    }

})