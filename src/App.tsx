/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { Component } from 'react';
import {
    Platform,
    TouchableHighlight,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { store } from "./store";
//import RadialCounter from "react-native-radial-counter";
import RadialCounter from "./components/RadialCounter";

interface MinuteSelectorProps {
    tint: string,
    tintDisabled: string
}

class MinuteSelector extends Component<MinuteSelectorProps> {

    diameter = 100;
    state: {
        timesRounded: number,
        ringProgress: number,
        showRadial: boolean
    };

    constructor(props: MinuteSelectorProps) {
        super(props);
        this.state = {
            timesRounded: 0,
            ringProgress: 0.0,
            showRadial: false
        };
    }

    render() {
        return (
            <View style={[styles.container, { width: this.diameter, height: this.diameter }]}>
                <RadialCounter
                    containerStyle={styles.svgContainer}
                    longPressDelay={300}
                    backgroundColor={"#e6e6e6"} tintColor={this.props.tint}
                    innerRadius={this.diameter / 2 - 10} outerRadius={this.diameter / 2}
                    progress={this.state.ringProgress}
                    timesRounded={this.state.timesRounded}
                    onTimesRoundedChange={(timesRounded) =>
                        this.setState(o => {
                            return { timesRounded: Math.max(timesRounded, 0) }
                        })}
                    onRingProgressChange={(ringProgress) =>
                        this.setState(o => {
                            return { ringProgress }
                        })}
                    buttonOptions={{
                        useButton: true,
                        buttonColor: this.props.tint,
                        buttonActiveColor: this.props.tintDisabled,
                        gap: 15
                    }} />
                <View pointerEvents={'none'} style={{ alignItems: 'center' }}>
                    <Text style={styles.countText}>{Math.round(this.state.timesRounded * 30 + this.state.ringProgress * 30)}</Text>
                    <Text style={styles.countText}>{"minutes"}</Text>
                </View>
            </View>
        );
    }
}


export default class App extends Component<any> {
    render() {
        return (
            <View style={{
                flexDirection: "row", backgroundColor: '#f0f5f8', height: "100%",
                justifyContent: "center", paddingTop: 30
            }}>
                <MinuteSelector tint={"#459c20"} tintDisabled={"#acd8b0"} />
                <MinuteSelector tint={"#ab0f0e"} tintDisabled={"#ff5962"} />
                <MinuteSelector tint={"#4348f7"} tintDisabled={"#8881ff"} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    svgContainer: {
        position: "absolute"
    },
    countText: {
        fontSize: 12,
        color: "white"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
