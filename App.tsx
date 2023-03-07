/* eslint-disable react-native/no-inline-styles */
import {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type EmbeddedHomeStackParamList = {
  Home: undefined;
  Stream: {streamId: string};
};

type TabNavigatorParamList = {
  EmbeddedHomeStack: NavigatorScreenParams<EmbeddedHomeStackParamList>;
};

type RootStackParamList = {
  TabNavigator: NavigatorScreenParams<TabNavigatorParamList>;
  Modal: undefined;
};

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<EmbeddedHomeStackParamList>();

function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const openModal = useCallback(() => {
    navigation.push('Modal');
  }, [navigation]);

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

type StreamProps = NativeStackScreenProps<EmbeddedHomeStackParamList, 'Stream'>;

function StreamScreen({route}: StreamProps) {
  const {streamId} = route.params;
  console.log('Stream iD: ' + streamId);
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Stream</Text>
    </View>
  );
}

function EmbeddedHomeStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group
        screenOptions={{
          title: '',
          headerBackTitleVisible: false,
          headerStyle: {backgroundColor: '#fff'},
          headerShadowVisible: false,
          headerTintColor: '#121212',
        }}>
        <HomeStack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <HomeStack.Screen
          name="Stream"
          options={{headerShown: true}}
          component={StreamScreen}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="EmbeddedHomeStack"
      backBehavior="history">
      <Tab.Screen name="EmbeddedHomeStack" component={EmbeddedHomeStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function Modal() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const gotoSettings = useCallback(() => {
    navigation.replace('TabNavigator', {
      screen: 'EmbeddedHomeStack',
      params: {
        screen: 'Stream',
        initial: false,
        params: {
          streamId: 'foo',
        },
      },
    });
  }, [navigation]);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
        flex: 1,
        backgroundColor: 'purple',
      }}>
      <Pressable onPress={gotoSettings}>
        <Text>Goto Stream</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerBackTitleVisible: false}}
        />
        <RootStack.Screen
          options={{
            presentation: 'modal',
            contentStyle: {backgroundColor: 'transparent'},
          }}
          name="Modal"
          component={Modal}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
