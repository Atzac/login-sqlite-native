import React from "react";
import Login from "./src/screens/login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/screens/register";
import Home from "./src/screens/home";
import { Provider } from "./src/context";
import Edit from "./src/screens/edit";

export default function App() {
  const Stack = createNativeStackNavigator();
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Provider>
        <Navigator
          initialRouteName="Login"
          screenOptions={{
            //define navigation screen settings
            headerShown: false,
            contentStyle: {
              backgroundColor: "#fff",
            },
          }}
        >
          <Screen name="Login" component={Login} />
          <Screen name="Register" component={Register} />
          <Screen name="Home" component={Home} />
          <Screen name="Edit" component={Edit} />
        </Navigator>
      </Provider>
    </NavigationContainer>
  );
}
