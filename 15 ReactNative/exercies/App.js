import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native'

import A from './components/A'

class App extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <View style={{ backgroundColor: '#08e', flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.son}>app...</Text>
                    <A></A>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    son: {
        color: '#f90',
        fontSize: 20,
        textAlign: 'center'
    }
})

export default App;