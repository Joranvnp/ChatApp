import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../config/firebase";
// import Login from "./Login";

export default function Signup({navigation}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const onHandleSignup = () => {
        if (user !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, user, password)
            .then(() => console.log("Enregistrement effectué"))
            .catch(err => console.log("Login err: ${err}"));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crée un compte</Text>
            <TextInput
                style={styles.input}
                placeholder='Entrez un utilisateur'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='login'
                value={user}
                onChangeText={text => setUser(text)}
            >
            </TextInput>
            <TextInput
                style={styles.input}
                placeholder='Entrez un mot de passe'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                value={password}
                onChangeText={text => setPassword(text)}
            >
            </TextInput>
            <Button onPress={onHandleSignup} color='grey' title='Crée un compte'></Button>
            <Button
                onPress={() => navigation.navigate('Login')}
                title='Se connecter'
            >
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
      paddingHorizontal: 12
    },
    title: {
      size: 24,
      fontWeight: '600',
      color: '#444',
      alignSelf: 'center',
      paddingBottom: 24
    },
    input: {
      backgroundColor: '#fff',
      marginBottom: 20,
      size: 16,
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 8,
      padding: 12
    },
  });