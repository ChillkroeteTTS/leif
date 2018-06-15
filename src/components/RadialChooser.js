import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    SvgText,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import React, {Component} from 'react';
import {identity} from "../basicfunctions"

type Props = {};

const BUTTON_RADIUS = 50;
const BORDER_RADIUS = 15;
const RADIAL_CHOOSER_DIA = 120;
const RADIUS = (RADIAL_CHOOSER_DIA / 2) - BORDER_RADIUS;
const STROKE = 2 * Math.PI * RADIUS;
const LONG_PRESS_DELAY = 300;

const rcbStyles = StyleSheet.create({
    th: {
        borderRadius: BUTTON_RADIUS
    },
    container: {
        width: RADIAL_CHOOSER_DIA,
        height: RADIAL_CHOOSER_DIA,
        alignItems: "center",
        justifyContent: "center",
    },
    svgContainer: {transform: [{rotate: "-90deg"}]}
});

function layerSwitch(lastDeg, deg) {
    const isInsideBounds = ({upper, lower}) => deg <= upper && deg >= lower;
    const wasInsideBounds = ({upper, lower}) => lastDeg <= upper && lastDeg >= lower;
    const leftArea = {lower: 340, upper: 360};
    const rightArea = {lower: 0, upper: 20};

    if (isInsideBounds(rightArea) && wasInsideBounds(leftArea))
        return 1;
    else if (wasInsideBounds(rightArea) && isInsideBounds(leftArea))
        return -1;
    else return 0;
}

class LoadingRing extends Component {

}

//https://codepen.io/xgad/post/svg-radial-progress-meters
export default class RadialChooser extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showTimeSlider: false,
            ringProgress: 0.5,
            touchState: {
                lastGrant: null,
                isSelected: false,
                lastDeg: 0
            },
            timesRounded: 0
        };
    }

    reset = () => {
        console.log("reset!");
        this.state.touchState.lastGrant = null;
        this.state.touchState.isSelected = false;
        this.state.initialPos = null;
        this.state.lastDeg = 0;
    };

    updateRadialState = (evt) => {
        const pageX = evt.nativeEvent.pageX;
        const pageY = evt.nativeEvent.pageY;

        if (this.state.touchState.isSelected)
            this.setState(oldState => {
                const diffX = pageX - oldState.initialPos.x;
                const diffY = oldState.initialPos.y - pageY;
                const rad = Math.atan2(diffY, diffX);
                let deg = (rad * 180) / Math.PI;


                deg = deg - 90;

                if (diffX <= 0 && diffY >= 0) {
                    deg = -(270 + (90 - deg))
                }
                deg = -deg;

                oldState.timesRounded += layerSwitch(this.state.touchState.lastDeg, deg);

                oldState.ringProgress = deg / 360;
                oldState.touchState.lastDeg = deg;
                return oldState;
            });
    };

    render() {
        return (

            <View style={rcbStyles.container}
                  onPress={identity}
                  onStartShouldSetResponder={(evt) => true}
                  onMoveShouldSetResponder={(evt) => true}
                  onResponderGrant={(evt) => {
                      this.setState(oldState => {
                          oldState.touchState.lastGrant = Date.now();
                          return oldState;
                      });
                      const pageX = evt.nativeEvent.pageX;
                      const pageY = evt.nativeEvent.pageY;
                      setTimeout(() => {
                              if (this.state.touchState.lastGrant
                                  && (Date.now() - this.state.touchState.lastGrant) <= (LONG_PRESS_DELAY + 50)) {
                                  console.log('LongPress');
                                  this.setState(oldState => {
                                      oldState.touchState.isSelected = true;
                                      oldState.initialPos = {
                                          x: pageX,
                                          y: pageY
                                      };
                                      return oldState;
                                  });
                              }
                          }, LONG_PRESS_DELAY
                      )
                  }}
                  onResponderReject={this.reset}
                  onResponderRelease={this.reset}
                  onResponderMove={this.updateRadialState}>
                <View style={rcbStyles.svgContainer}>
                    <Text>{this.state.ringProgress}</Text>
                    <Text>{this.state.touchState.isSelected.toString()}</Text>
                    <Text>{this.state.timesRounded.toString()}</Text>
                    <Svg width={RADIAL_CHOOSER_DIA} height={RADIAL_CHOOSER_DIA}
                         viewBox={"0 0 120 120"}>
                        <Circle cx={RADIAL_CHOOSER_DIA / 2} cy={RADIAL_CHOOSER_DIA / 2}
                                r={RADIUS}
                                fill={"none"} stroke={"#e6e6e6"}
                                strokeWidth={BORDER_RADIUS}/>

                        <Circle cx={RADIAL_CHOOSER_DIA / 2} cy={RADIAL_CHOOSER_DIA / 2}
                                r={RADIUS}
                                fill={"none"} stroke={"#f77a52"}
                                strokeWidth={BORDER_RADIUS}
                                strokeDasharray={STROKE}
                                strokeDashoffset={STROKE * (1 - this.state.ringProgress)}/>
                    </Svg>
                </View>
            </View>
        );
    }
}