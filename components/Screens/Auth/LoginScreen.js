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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const initialState = {
    mail: "",
    password: ""   
} 



export default function LoginScreen({navigation}) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [registrationData, setRegistrationData] = useState(initialState);
    const window = useWindowDimensions();


    const keyboardHide = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
    };


    function onSubmitForm() {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        setRegistrationData(initialState)
        console.log(registrationData)
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground style={{ ...styles.image }} source={require('../../../assets/images/bcg-image.jpg')}>
                    <KeyboardAwareScrollView >
                        <View style={{ ...styles.form }}>
                            <Text style={styles.formTitle}>Войти</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Адрес электронной почты"
                                onFocus={() => {
                                    setIsShowKeyboard(true)
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
                                    secureTextEntry={true}
                                    onChangeText={value => {
                                        setRegistrationData((prevstate) =>
                                            ({ ...prevstate, password: value }))
                                    }}
                                />
                                <TouchableOpacity 
                                style={styles.visiblePassword} 
                                activeOpacity={0.8}>
                                    <Text 
                                    style={styles.visiblePasswordText}>
                                        Показать
                                        </Text>
                                        </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                            style={styles.logInBtn} 
                            activeOpacity={0.8} 
                            onPress={onSubmitForm}>
                                <Text style={styles.btnText}>
                                    Зарегистрироваться
                                    </Text>
                                    </TouchableOpacity>
                            <View style = {styles.haveAccBox}>
                            <Text 
                            style={styles.addOptionBtn}>
                                Нет аккаунта? 
                                <Text onPress ={() => navigation.navigate("Registration")}>
                                    Зарегистрироваться
                                    </Text>
                                    </Text>
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

    form: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: 549,
        justifyContent: 'center',
        marginTop: 253,

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
        color:"#1B4371"
    },

    haveAccBox: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 144,
    }
})

