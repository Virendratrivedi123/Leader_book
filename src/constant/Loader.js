import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
const height = Dimensions.get("window").height;
export default Loader = (props) => {
    return (
        props.loading
            ?
            <View style={styles.loader1}>
                <ActivityIndicator size="large" color='grey' style={{height:"16%", width:"30%",borderRadius:10, backgroundColor:"white", alignSelf:"center"}} />
            </View>
            :
            null
    )
}

const styles = StyleSheet.create({
    loader1: {
        // rgb(54,122,223)' />
        // backgroundColor: 'rgba(245,245,245, 0.7)',
        height: Dimensions.get('window').height- height * 0.12,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        // height:100,
        // width:100,
        backgroundColor: "rgba(52, 52, 52, 0.1)",
    }
});