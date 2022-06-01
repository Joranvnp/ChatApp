import React, {useState} from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native-web";
import { signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';

export default function Login({navigation}) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    // const [messages, setMessages] = useState([])
    const onHandleLogin = () => {
        if (user !== '' && password !== '') {
            signInWithEmailAndPassword(auth, user, password)
            .then(() => console.log('Login réussi'))
            .catch(err => console.log('Erreur: ${err}'));
        }
    }

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Se connecter</Text>
            <TextInput
                style={styles.input}
                placeholder='Entrez un login'            
                autoCapitalize='none'
                keyboardType="email-address"
                textContentType='emailAdress'
                autofocus={true}
                value={user}
                onChangeText={text => setUser(text)}
                >
            </TextInput>
            <TextInput
                style={styles.input}
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                value={password}
                onChangeText={text => setPassword(text)}
        />
        <Button onPress={onHandleLogin} color='grey' title='Se connecter'></Button>
        <Button
            onPress={() => navigation.navigate('Signup')} title='Crée un compte'></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    title: {
        fontsize: 24,
        fontWeight: '600',
        color:'black',
        alignSelf: 'center',
        paddingBottom: 24
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 20,
        fontsize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 15
    },
});