/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {store} from "./src/store";
import RadialChooser from "react-native-radial-chooser";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            timesRounded: 0,
            ringProgress: 0.6,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <RadialChooser longPressDelay={300}
                               backgroundColor={"#e6e6e6"} tintColor={"#f77a52"}
                               innerRadius={50} outerRadius={60}
                               progress={this.state.ringProgress}
                               timesRounded={this.state.timesRounded}
                               onTimesRoundedChange={(timesRounded) =>
                                   this.setState(o => {return {timesRounded}})}
                               onRingProgressChange={(ringProgress) =>
                                   this.setState(o => {return {ringProgress}})}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
