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
} from '@react-navigation/native-stack';

type EmbeddedHomeStackParamList = {
  Home: undefined;
  DeepEmbedded: undefined;
};

type TabNavigatorParamList = {
  EmbeddedHomeStack: NavigatorScreenParams<EmbeddedHomeStackParamList>;
  AnotherTab: undefined;
};

type RootStackParamList = {
  TabNavigator: NavigatorScreenParams<TabNavigatorParamList>;
  ModalOne: undefined;
  ModalTwo: undefined;
};

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<EmbeddedHomeStackParamList>();

function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const openModal = useCallback(() => {
    navigation.push('ModalOne');
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

function AnotherTabScreen() {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Just another tab</Text>
    </View>
  );
}

function DeepEmbeddedScreen() {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Deep embedded screen</Text>
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
          name="DeepEmbedded"
          options={{headerShown: true}}
          component={DeepEmbeddedScreen}
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
      {/* tab bar isn't customized (ruled out by removing custom tab bar in our app) */}
      <Tab.Screen name="EmbeddedHomeStack" component={EmbeddedHomeStack} />
      <Tab.Screen name="AnotherTab" component={AnotherTabScreen} />
    </Tab.Navigator>
  );
}

function ModalOne() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const gotoDeepEmbedded = useCallback(
    () =>
      navigation.replace('TabNavigator', {
        screen: 'EmbeddedHomeStack',
        params: {
          screen: 'DeepEmbedded',
          initial: false,
        },
      }),
    [navigation],
  );

  const gotoModalTwo = useCallback(
    () => navigation.replace('ModalTwo'),
    [navigation],
  );

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
        flex: 1,
        backgroundColor: 'purple',
        gap: 20,
      }}>
      <Text>Modal</Text>
      <Pressable onPress={gotoDeepEmbedded}>
        <Text>Goto DeepEmbedded</Text>
      </Pressable>
      <Pressable onPress={gotoModalTwo}>
        <Text>Goto Modal Two</Text>
      </Pressable>
    </View>
  );
}

function ModalTwo() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const pop = useCallback(
    () => navigation.pop(),

    [navigation],
  );

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
        flex: 1,
        backgroundColor: 'purple',
        gap: 20,
      }}>
      <Text>Another Modal</Text>
      <Pressable onPress={pop}>
        <Text>Close</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* Diff: No linking config, no datadog (ruled out by deleting both in our app)*/}
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
          name="ModalOne"
          component={ModalOne}
        />
        <RootStack.Screen
          options={{
            presentation: 'modal',
            contentStyle: {backgroundColor: 'transparent'},
          }}
          name="ModalTwo"
          component={ModalTwo}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
