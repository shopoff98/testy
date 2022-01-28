import React from "react";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingViewBase
} from "react-native";
import { useState, useEffect } from "react";
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { storage, db } from "../../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from 'nanoid';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { authSignUpUser } from "../../../../redux/auth/authOperations";


export default function CreatePostsScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [name, setName] = useState('');
    const [nameLocation, setNameLocation] = useState('');
    const [myLocation, setMyLocation] = useState(null);
    const { userId, nickname } = useSelector(state => state.authSignUp)



    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            const Loc = await Location.getCurrentPositionAsync();
            setMyLocation(Loc)
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    async function takePhoto() {
        const myLocation = await Location.getCurrentPositionAsync();
        setLocation(myLocation.coords);
        const photo = await camera.takePictureAsync();
        setPhoto(photo.uri)
    }

    async function uploadPotoToServer() {
        try {
            const response = await fetch(photo);
            const file = await response.blob();
            const uniqueId = nanoid();
            const storageRef = await ref(storage, `imagesPosts/${uniqueId}`)
            await uploadBytes(storageRef, file)
            const savedPhoto = await getDownloadURL(ref(storage, `imagesPosts/${uniqueId}`));
            return savedPhoto

        } catch (error) {
            console.log(error)
        }
    }

    async function sendPostToServer() {
        try {
            const updatePhoto = await uploadPotoToServer();
            const post = await setDoc(doc(db, "posts", "postId"), {
                updatePhoto,
                name,
                nameLocation,
                location,
                userId,
                nickname
            })
            return post
        } catch (error) {
            console.log(error)
        }
    }
    async function sendPost() {
        sendPostToServer();
        await navigation.navigate("Публикации", { location, photo, name, nameLocation })
        resetPost()
    }

    function resetPost() {
        setPhoto(null);
        setLocation(null);
        setNameLocation('')
        setName('')
    }




    return (
        <View style={s.container}>
            <KeyboardAwareScrollView >
                <View>
                    {photo ?
                        <View style={s.imageBox}>
                            <ImageBackground source={{ uri: photo }} style={s.image}>
                                <TouchableOpacity
                                    onPress={takePhoto}
                                    style={{ ...s.photoIcon, backgroundColor: 'rgba(255, 255, 255, 0.3)', }}>
                                    <MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        :
                        <Camera style={s.camera} ref={setCamera}>
                            <TouchableOpacity
                                onPress={takePhoto}
                                style={{ ...s.photoIcon, backgroundColor: "#fff", }}>
                                <MaterialIcons
                                    name="photo-camera" size={24}
                                    color="#BDBDBD" />
                            </TouchableOpacity>
                        </Camera>
                    }
                </View>
                {photo ? <View>
                    <Text style={s.loadPhotoText}>Редактировать фото</Text>
                </View> :
                    <View>
                        <Text style={s.loadPhotoText}>Загрузите фото</Text>
                    </View>}
                <View style={s.inputBox}><TextInput
                    placeholder="Название..."
                    placeholderTextColor={"#BDBDBD"}
                    value={name}
                    onChangeText={value => {
                        setName(value)
                    }}
                ></TextInput>
                </View>
                <View style={s.locationInput}>
                    {
                        <EvilIcons name="location" size={24} color="black" />
                    }
                    <TextInput
                        style={{ width: "100%" }}
                        placeholder="Местность..."
                        placeholderTextColor={"#BDBDBD"}
                        value={nameLocation}
                        onChangeText={value => {
                            setNameLocation(value)
                        }}
                    >
                    </TextInput>
                </View>
                <TouchableOpacity
                    onPress={sendPost}
                    style={s.logInBtn}
                    activeOpacity={0.8} >
                    <Text style={s.btnText}>
                        Опубликовать
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>

    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        //  alignItems:"center"
    },

    camera: {
        position: "relative",
        marginTop: 32,
        height: 240,
        marginHorizontal: 16,
        borderColor: "#E8E8E8",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",

    },

    photoIcon: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    imageBox: {

        marginHorizontal: 16,
        marginTop: 32,
        height: 240,
        // borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",


    },

    image: {
        borderStyle: "solid",
        borderColor: "#E8E8E8",
        borderWidth: 1,
        height: 240,
        overflow: "hidden",
        borderRadius: 8,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

    },

    loadPhotoText: {
        color: "#BDBDBD",
        marginLeft: 16,
        marginTop: 8,
    },
    inputBox: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        marginHorizontal: 16,
        marginTop: 48,
        paddingBottom: 10,
    },

    locationInput: {
        flexDirection: "row",
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        marginHorizontal: 16,
        marginTop: 48,
        paddingBottom: 10,
    },

    logInBtn: {
        backgroundColor: '#FF6C00',
        marginHorizontal: 32,
        height: 51,
        borderRadius: 100,
        marginTop: 43,
        justifyContent: "center",
        alignItems: 'center',

    },

    btnText: {
        color: "#fff",
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
    },
})
