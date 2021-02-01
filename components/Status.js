import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react'
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../redux/currentTab/CurrentTabActions';

function Status() {

    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            dispatch(setCurrentTab("STATUS"))
        }, [])
    );

    return (
        <View style={{
                flex: 1, 
                justifyContent: "center", 
                alignItems: "center"
            }}
        >
            <Text>Yet to be implemented</Text>
        </View>
    )
}

export default Status
