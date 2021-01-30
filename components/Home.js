import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Login from './Login';
import HomeTabs from './HomeTabs';

function Home() {

    const user = useSelector(state => state.user.user);
    return (user ? <HomeTabs /> : <Login />);
}

export default Home;
