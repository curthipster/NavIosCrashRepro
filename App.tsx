/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function HomeScreen() {
  const navigation = useNavigation();
  function openModal() {
    navigation.push('Modal');
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable onPress={openModal}>
        <Text>Open modal</Text>
      </Pressable>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function Modal() {
  const navigation = useNavigation();
  function gotoSettings() {
    navigation.replace('TabNavigator', {
      screen: 'Settings',
    });
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
      }}>
      <Pressable onPress={gotoSettings}>
        <Text>Goto Settings</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen
          options={{presentation: 'modal'}}
          name="Modal"
          component={Modal}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
