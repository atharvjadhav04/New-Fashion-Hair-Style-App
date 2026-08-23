import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import CustomerNavigator from "./CustomerNavigator";
import AdminNavigator from "./AdminNavigator";

import { useAuth } from "../context/AuthContext";

export default function AppNavigator() {

    const { user } = useAuth();

    return (
        <NavigationContainer>

            {!user ? (
                <AuthNavigator />
            ) : user.role === "ADMIN" ? (
                <AdminNavigator />
            ) : (
                <CustomerNavigator />
            )}

        </NavigationContainer>
    );
}
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";

// import CustomerNavigator from "./CustomerNavigator";
// import AdminNavigator from "./AdminNavigator";

// export default function AppNavigator() {

//     // TEMPORARY TEST
//     const role = "ADMIN";

//     return (
//         <NavigationContainer>
//             {role === "ADMIN" ? (
//                 <AdminNavigator />
//             ) : (
//                 <CustomerNavigator />
//             )}
//         </NavigationContainer>
//     );
// }