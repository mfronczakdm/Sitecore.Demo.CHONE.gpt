import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateEventScreen } from "../screens/CreateEvent";
import { CreateAthleteScreen } from "../screens/CreateAthlete";
import { AthleteDetailScreen } from "../screens/AthleteDetail";
import { EventDetailScreen } from "../screens/EventDetail";
import { SplashScreen } from "../screens/SpashScreen";
import { Tabs } from "./Tabs";

const Stack = createNativeStackNavigator();

export const Stacks = ({ connected, setConnected }) => {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      {connected ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddEvent"
            component={CreateEventScreen}
            options={{ title: "Add Event" }}
          />
          <Stack.Screen
            name="AddAthlete"
            component={CreateAthleteScreen}
            options={{ title: "Add Athlete" }}
          />
          <Stack.Screen
            name="AthleteDetail"
            component={AthleteDetailScreen}
            options={{ title: "Athlete Detail" }}
          />
          <Stack.Screen
            name="EventDetail"
            component={EventDetailScreen}
            options={{ title: "Event Detail" }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Splash"
          component={() => <SplashScreen setConnected={setConnected} />}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};