import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Login from './Login';
import HomeTabs from './HomeTabs';

function Home() {

    const currentTabName = useSelector(state => state.currentTabName.currentTabName);
    const user = useSelector(state => state.user.user);
    const route = useRoute();

    useEffect(() => {
        route.params?.setCurrentTabName(currentTabName);
    }, [currentTabName])

    return (user 
                ? <HomeTabs 
                    isMenuVisible={route.params?.isMenuVisible}
                    setIsMenuVisible={route.params?.setIsMenuVisible} /> 
                : <Login />);
}

export default Home;
