import React, { Component } from 'react';

import { View, PanResponder, Animated } from 'react-native';

import PropTypes from 'prop-types';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.canReachEnd = true;
        this.totalWidth = 0;
        this.state = {
            offsetX: new Animated.Value(0),
            squareWidth: 0,
            childOpacity: 1,
        };
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return !this.canReachEnd;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.canReachEnd = true;
            },
            onPanResponderMove: (evt, gestureState) => {
                const margin = this.totalWidth - this.state.squareWidth * 1.025;
                if(this.props.isLeftToRight === true){
                    if (gestureState.dx <= 0){
                        this.setState({ offsetX: new Animated.Value(gestureState.dx) , childOpacity: 1-(gestureState.dx/margin)});
                    }
                    else if (gestureState.dx > 0 && gestureState.dx <= margin) {
                        this.setState({ offsetX: new Animated.Value(gestureState.dx) , childOpacity: 1-(gestureState.dx/margin)});
                    }
                    else if (gestureState.dx > margin) {
                        this.setState({childOpacity: 0});
                        this.onEndReached();
                        return;
                    }
                }
                else{
                    if(gestureState.dx < -margin){
                        this.setState({childOpacity: 0});
                        this.onEndReached();
                        return;
                    }
                    else if (gestureState.dx > -margin && gestureState.dx < 0) {
                        this.setState({ offsetX: new Animated.Value(-gestureState.dx) , childOpacity: 1-(-gestureState.dx/margin)});
                    }
                    else if (gestureState.dx <= 0) {
                        this.setState({ offsetX: new Animated.Value(-gestureState.dx) , childOpacity: 1-(-gestureState.dx/margin)});
                    }
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.resetBar();
                this.canReachEnd = true;
            },
            onShouldBlockNativeResponder: (evt, gestureState) => true,
        });
    }

    onEndReached = () => {
        this.canReachEnd && this.props.onEndReached();
        this.canReachEnd = false;
        this.resetBar();
    };

    resetBar() {
        Animated.timing(this.state.offsetX, { toValue: 0, useNativeDriver: true }).start();
        this.setState({childOpacity: 1, offsetX: new Animated.Value(0)})
    }

    render() {
        return (
            <View
                onLayout={event => {
                    this.totalWidth = event.nativeEvent.layout.width;
                }}
                style={[this.props.containerStyle, { alignItems: this.props.isLeftToRight === true ? 'flex-start' : 'flex-end' }]}
            >
                <Animated.View
                    onLayout={event => {
                        this.setState({ squareWidth: event.nativeEvent.layout.width });
                    }}
                    style={[{ transform: [{ translateX: this.state.offsetX }]}, this.props.slideOverStyle]}
                    {...this._panResponder.panHandlers}
                >
                    {this.props.thumbElement}
                </Animated.View>

                <View
                    style={[
                        { alignSelf: 'center', position: 'absolute', zIndex: -1, opacity: this.props.isOpacityChangeOnSlide === true ? this.state.childOpacity : 1},
                        this.props.childrenContainer,
                    ]}
                >
                    {this.props.children}
                </View>

                <View
                    style={[
                        { alignSelf: this.props.isLeftToRight === true ? 'flex-start' : 'flex-end', position: 'absolute', width: this.state.offsetX._value, height: 100},
                        this.props.slideOverStyle
                    ]}
                >
                </View>
            </View>
        );
    }
}

Slider.propTypes = {
    isLeftToRight: PropTypes.bool,
    childrenContainer: PropTypes.object,
    containerStyle: PropTypes.object,
    slideOverStyle: PropTypes.object,
    isOpacityChangeOnSlide: PropTypes.bool,
    thumbElement: PropTypes.element,
    onEndReached: PropTypes.func,
};

Slider.defaultProps = {
    isLeftToRight: true,
    childrenContainer: {},
    containerStyle: {},
    slideOverStyle: {backgroundColor: 'rgba(255,255,255,0.0)', borderBottomLeftRadius:0, borderBottomRightRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 },
    isOpacityChangeOnSlide: false,
    thumbElement: <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />,
    onEndReached: () => {},
};
