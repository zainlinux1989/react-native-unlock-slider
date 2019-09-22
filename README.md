# react-native-unlock-slider

Unlock sliding button with slider thumb and background styling.

![Sliding](https://github.com/zainlinux1989/react-native-unlock-slider/blob/master/slide.gif)

## Install

```shell
npm i --save react-native-unlock-slider
```

## Usage

```jsx
import React from 'react';
import {Text, Image, Alert, View} from 'react-native';

import Slider from 'react-native-unlock-slider'

const App = () => {
  return (
    <View>
        <Slider
            childrenContainer={{ backgroundColor: 'rgba(255,255,255,0.0)'}}
            slideOverStyle={{backgroundColor: 'yellow', borderBottomRightRadius: 5, borderTopRightRadius: 5}}
            onEndReached={() => {
              Alert.alert('Attention', 'Unlocked!');
            }}
            isOpacityChangeOnSlide={true}
            containerStyle={{
              margin: 8,
              backgroundColor: 'white',
              borderRadius: 10,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            thumbElement={
              <Image
                  style={{
                    width: 50,
                    margin: 4,
                    borderRadius: 5,
                    height: 50,
                    backgroundColor: 'red',
                  }}
                  source={{
                    uri:
                        'https://facebook.github.io/react-native/docs/assets/favicon.png',
                  }}
              />
            }
        >
          <Text style={{fontWeight: '700'}}>{'PLEASE SLIDE TO UNLOCK PHONE'}</Text>
        </Slider>
    </View>
  );
};

export default App;
```

## Props

Prop                  | Type     | Optional | Default                   | Description
--------------------- | -------- | -------- | ------------------------- | -----------
childrenContainer     | Object   | Yes      | {}                        | Use to provide style to children component
containerStyle        | Object   | Yes      | {}                        | set container style
slideOverStyle        | Object   | Yes      | {backgroundColor: 'rgba(255,255,255,0.0)', borderBottomRightRadius: 0, borderTopRightRadius: 0},                         | set thumb leaving side color, while sliding from left to right. 
isOpacityChangeOnSlide          | Bool   | Yes      | false                       | Reduce opacity of child component while sliding.
thumbElement                  | Element   | Yes      | <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />                         | Slider thumb view, add any other view
onEndReached | Function   | Yes      | () => {}                | Callback function call when slider reached to end
---

Extend existing library.
Credit to: [gutioliveira](https://github.com/gutioliveira/react-native-slide-to-unlock).
