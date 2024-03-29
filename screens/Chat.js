import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import TypingIndicator from "react-native-gifted-chat/lib/TypingIndicator"
import { render } from 'react-dom';
import { State } from 'react-native-gesture-handler';

export default function Chat({ navigation }) {
    const [messages, setMessages] = useState([]);

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Erreur', error));
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <Text>Se déconnecter</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });
        return () => unsubscribe();
    }, []);
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        setIsTyping(false);
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    const [isTyping, setIsTyping] = useState(false);
    const [customText, setCustomText] = useState('');

    return (
        <GiftedChat
            text={customText}
            onInputTextChanged={(text) => {
                console.log('toast');
                if (text != '') {
                    setIsTyping(true);
                } else {
                    setIsTyping(false);
                }
                // setIsTyping(!isTyping);
                setCustomText(text)
            }}
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/700',
            }}
            isTyping={isTyping}
        ></GiftedChat>
    );

}