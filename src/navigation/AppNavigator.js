import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import BottomTabs from "./BottomTabs";
export default function AppNavigator() {
    return (
        <NavigationContainer>
            {/* <AuthNavigator /> */}
            <BottomTabs />
        </NavigationContainer>
    );
}