import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    Pressable,
} from "react-native";
import { useFonts } from 'expo-font';

import * as Font from "expo-font";


const initialState = {
    login: "",
    mail: "",
    password: ""
}

export default function RegistrationScreen({ isShowKeyboard, keyboardHide, setShowKeyboard, dimensions }) {
    const [registrationData, setRegistrationData] = useState(initialState);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // const [loaded] = useFonts({
    //     "Roboto-Regular": require("../assets/fonts/font/Roboto-Regular.ttf"),
    // });

    // if (!loaded) {
    //     return null;
    // };

    function onSubmitForm() {
        { setShowKeyboard(false) };
        Keyboard.dismiss();
        setRegistrationData(initialState)

    }
    return (
        <View style={{ ...styles.form,
         marginBottom: isKeyboardVisible ? -175 : 0 ,
        //  width:dimensions
         }}>
            <Text style={styles.formTitle}>Регистрация</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Логин"
                    onFocus={() => { setShowKeyboard(true) }}
                    value={registrationData.login}
                    onChangeText={value => {
                        setRegistrationData((prevstate) =>
                            ({ ...prevstate, login: value }))
                    }}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Адрес электронной почты"
                    onFocus={() => { setShowKeyboard(true) }}
                    value={registrationData.mail}
                    onChangeText={value => {
                        setRegistrationData((prevstate) =>
                            ({ ...prevstate, mail: value }))
                    }}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    onFocus={() => { setShowKeyboard(true) }}
                    value={registrationData.password}
                    onChangeText={value => {
                        setRegistrationData((prevstate) =>
                            ({ ...prevstate, password: value }))
                    }}
                />
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.logInBtn} onPress={onSubmitForm}><Text style={styles.btnText} >Зарегистрироваться</Text></TouchableOpacity>
            <View style={styles.haveAccBox}>
                <Text>Уже есть аккаунт? Войти</Text>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // height: null,
        // justifyContent: 'flex-start',
        paddingBottom: 45,
        paddingTop: 92,
        marginBottom: 120

    },
    input: {
        marginHorizontal: 32,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        height: 50,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        borderStyle: 'solid',
        marginBottom: 16,
        paddingLeft: 16,
    },

    formTitle: {
        fontFamily: "Roboto-Regular",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "500",
        marginBottom: 32,
        // paddingTop:92
    },

    logInBtn: {
        backgroundColor: '#FF6C00',
        marginHorizontal: 32,
        height: 51,
        borderRadius: 100,
        marginTop: 40,
        justifyContent: "center",
        alignItems: 'center',

    },

    btnText: {
        color: '#fff',
        fontFamily: "Roboto-Regular",
    },

    haveAccBox: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        // paddingBottom:45
    }
})