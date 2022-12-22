import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {
			console.log(username);
			console.log(password);
	};
    return (
        <View style={styles.page}>
            <TextInput 
            value={username} 
            onChangeText={setUsername} 
            placeholder='User name' 
            style={styles.input} 
            autoCapitalize="none"
            />

            <TextInput 
            value={password} 
            onChangeText={setPassword}  
            placeholder='Password' 
            style={styles.input} 
            secureTextEntry
            />
            
            <Pressable style={styles.button} onPress={signIn}>
                <Text>Sign in</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 10,
        alignItems: 'stretch',
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        padding: 10,
        marginVertical: 5,
        zIndex:10
    },
    button: {
        padding: 10,
        backgroundColor: 'dodgerblue',
        marginVertical: 5,
        alignItems: 'center'
    },
});

export default LoginScreen;