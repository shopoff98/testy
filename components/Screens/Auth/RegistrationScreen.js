import React, { useState, useEffect } from "react";
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
import { AntDesign } from '@expo/vector-icons';
import { authSignUpUser } from "../../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../firebase/config";
import { authSlice } from "../../../redux/auth/authReducer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signUp } from "../../../redux/auth/authOperations";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const initialState = {
    login: "",
    mail: "",
    password: ""
}



export default function RegistrationScreen({ navigation }) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [registrationData, setRegistrationData] = useState(initialState);
    const [isVisiblePass, setIsVisiblePass] = useState(true)
    const window = useWindowDimensions();
    const dispatch = useDispatch();



    const keyboardHide = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
    };

    function onSubmitForm() {
        dispatch(authSignUpUser(registrationData))
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground style={{ ...styles.image }} source={require('../../../assets/images/bcg-image.jpg')}>
                    <KeyboardAwareScrollView>
                        <View style={{ ...styles.form }}>
                            <View style={styles.imageBox}>
                                <Image style={styles.imageProfile} />
                                <AntDesign style={styles.icon} name="pluscircleo" size={25} color="#FF6C00" />
                            </View>
                            <Text style={styles.formTitle}>Регистрация</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Логин"
                                onFocus={() => setIsShowKeyboard(true)}
                                value={registrationData.login}
                                onChangeText={(value) => {
                                    setRegistrationData((prevstate) =>
                                        ({ ...prevstate, login: value }))
                                }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Адрес электронной почты"
                                onFocus={() => {
                                    setIsShowKeyboard(true)
                                    console.log({ isShowKeyboard })
                                }
                                }
                                value={registrationData.mail}
                                onChangeText={value => {
                                    setRegistrationData((prevstate) =>
                                        ({ ...prevstate, mail: value }))
                                }}
                            />
                            <View style={styles.passwordInputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Пароль"
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={registrationData.password}
                                    secureTextEntry={isVisiblePass}
                                    onChangeText={value => {
                                        setRegistrationData((prevstate) =>
                                            ({ ...prevstate, password: value }))
                                    }}
                                />
                                <Text onPress={() => setIsVisiblePass(!isVisiblePass)} style={styles.visiblePasswordText}>Показать</Text>
                            </View>
                            <TouchableOpacity style={styles.logInBtn} activeOpacity={0.8} onPress={onSubmitForm}><Text style={styles.btnText}>Зарегистрироваться</Text></TouchableOpacity>
                            <View style={styles.haveAccBox}>
                                <Text style={styles.addOptionBtn}>Уже есть аккаунт?<Text onPress={() => navigation.navigate("Login")}> Войти</Text></Text>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        // alignItems: "center",
    },

    imageBox: {
        alignItems: 'center',
        position: "relative"
    },

    icon: {
        position: "absolute",
        right: 110,
        top: 90
    },


    form: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: 549,
        justifyContent: 'center',
        marginTop: 253,

    },

    imageProfile: {
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: "#F6F6F6",
        marginBottom: 32,
    },

    input: {
        marginHorizontal: 16,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        height: 50,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        borderStyle: 'solid',
        marginBottom: 16,
        paddingLeft: 16,
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
    },

    formTitle: {
        textAlign: "center",
        fontWeight: "500",
        marginBottom: 33,
        fontFamily: "Roboto-Regular",
        fontWeight: "500",
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 0.01,
        color: "#212121",
        fontStyle: "normal"
    },

    passwordInputBox: {
        position: 'relative',

    },

    visiblePasswordText: {
        color: "#1B4371",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        lineHeight: 19,
        position: 'absolute',
        right: 40,
        top: 15
    },

    visiblePassword: {
        position: 'absolute',
        right: 40,
        top: 15
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



    addOptionBtn: {
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#1B4371"
    },

    haveAccBox: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 66,
    }
})