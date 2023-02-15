import React, { Component } from 'react'
import { Text, View, Dimensions, Platform } from 'react-native'

export default class A extends Component {
    render() {
        return (
            <View>
                <Text> dimensions练习 </Text>
                <View>
                    <Text>获取到的宽度是{Dimensions.get('window').width}</Text>
                    <Text>系统是{Platform.OS}</Text>
                </View>
            </View>
        )
    }
}

