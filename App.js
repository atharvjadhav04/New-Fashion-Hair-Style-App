import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { BookingProvider } from "./src/context/BookingContext";
import { LanguageProvider } from "./src/context/LanguageContext";
import { AuthProvider } from "./src/context/AuthContext";
export default function App() {

  return (

    <SafeAreaProvider>

      <LanguageProvider>

        <AuthProvider>

          <BookingProvider>

            <AppNavigator />

          </BookingProvider>

        </AuthProvider>

      </LanguageProvider>

    </SafeAreaProvider>

  );

}