import { Animated, Dimensions, Easing } from "react-native";
// header for screens
import { Header, Icon } from "../components";
import { argonTheme, tabs } from "../constants";

import AboutScreen from "../screens/About";
import AgreementScreen from "../screens/Agreement";
import Articles from "../screens/Articles";
import Beauty from "../screens/Beauty";
import Cart from "../screens/Cart";
import Category from "../screens/Category";
import Chat from "../screens/Chat";
// drawer
import CustomDrawerContent from "./Menu";
import Elements from "../screens/Elements";
import Fashion from "../screens/Fashion";
import Gallery from "../screens/Gallery";
// screens
import Home from "../screens/Home";
import NotificationsScreen from "../screens/Notifications";
// Notifications
import PersonalNotifications from "../screens/PersonalNotifications";
import PrivacyScreen from "../screens/Privacy";
// import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Product from "../screens/Product";
import CommunityPost from "../screens/CommunityPost";
import Profile from "../screens/Profile";
import React from "react";
import Register from "../screens/Register";
import Search from "../screens/Search";
// settings
import SettingsScreen from "../screens/Settings";
import SystemNotifications from "../screens/SystemNotifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import LeaderBoard from "../screens/LeaderBoard";
import LeaderBoardProfile from "../screens/LeaderBoard";
import Login from "../screens/Login";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function NotificationsStack(props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === "Requests") {
                        iconName = "user";
                    } else if (route.name === "System") {
                        iconName = "database";
                    }
                    // You can return any component that you like here!
                    return <Icon name={iconName} family="entypo" size={22} color={color} style={{ marginTop: 10 }} />;
                },
                headerShown: false,
            })}
            tabBarOptions={{
                activeTintColor: argonTheme.COLORS.PRIMARY,
                inactiveTintColor: "gray",
                labelStyle: {
                    fontFamily: "open-sans-regular",
                },
            }}
        >
            <Tab.Screen name="Requests" component={PersonalNotifications} />
            {/* <Tab.Screen name="System" component={SystemNotifications} /> */}
        </Tab.Navigator>
    );
}

function ElementsStack(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                mode: "card",
                headerShown: "screen",
            }}
        >
            <Stack.Screen
                name="Elements"
                component={Elements}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Elements" navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
        </Stack.Navigator>
    );
}

function SettingsStack(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                mode: "card",
                headerShown: "screen",
            }}
        >
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Settings" scene={scene} navigation={navigation} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Agreement"
                component={AgreementScreen}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="Agreement" scene={scene} navigation={navigation} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Privacy"
                component={PrivacyScreen}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="Privacy" scene={scene} navigation={navigation} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="About" scene={scene} navigation={navigation} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="NotificationsSettings"
                component={NotificationsScreen}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="Requests" scene={scene} navigation={navigation} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="Shopping Cart" scene={scene} navigation={navigation} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Requests"
                component={NotificationsStack}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="Requests" scene={scene} navigation={navigation} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
        </Stack.Navigator>
    );
}

function ArticlesStack(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                mode: "card",
                headerShown: "screen",
            }}
        >
            <Stack.Screen
                name="Articles"
                component={Articles}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Articles" navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
        </Stack.Navigator>
    );
}

function LeaderBoardStack(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                mode: "card",
                headerShown: "screen",
            }}
        >
            <Stack.Screen
                name="LeaderBoard"
                component={LeaderBoard}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header transparent title="LeaderBoard" white navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationsStack}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="Notifications " scene={scene} navigation={navigation} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
        </Stack.Navigator>
    );
}

function ProfileStack(props) {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{
                mode: "card",
                headerShown: "screen",
            }}
        >
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header transparent white title="Profile" navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#FFFFFF" },
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="Shopping Cart" navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#FFFFFF" },
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationsStack}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back title="Notifications" navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#FFFFFF" },
                }}
            />
        </Stack.Navigator>
    );
}

function HomeStack(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                mode: "card",
                headerShown: "screen",
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Home" search options navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Beauty"
                component={Beauty}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Beauty" back tabs={tabs.beauty} navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Category"
                component={Category}
                options={{
                    header: ({ navigation, scene }) => {
                        const { params } = scene.descriptor;
                        const title = (params && params.headerTitle) || "Category";
                        return <Header title={title} back navigation={navigation} scene={scene} />;
                    },
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Fashion"
                component={Fashion}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Fashion" back tabs={tabs.fashion} navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Product"
                component={Product}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="" back white transparent navigation={navigation} scene={scene} />
                    ),
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="CommunityPost"
                component={CommunityPost}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="" back white transparent navigation={navigation} scene={scene} />
                    ),
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Gallery"
                component={Gallery}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header back transparent white title="" navigation={navigation} scene={scene} />
                    ),
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Rachel Brown" back navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Search" back navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title="Shopping Cart" back navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" },
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationsStack}
                options={{
                    header: ({ navigation, scene }) => <Header title="" back navigation={navigation} scene={scene} />,
                    cardStyle: { backgroundColor: "#FFFFFF" },

                    // headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}

function AppStack(props) {
    return (
        <Drawer.Navigator
            style={{ flex: 1 }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerStyle={{
                backgroundColor: "white",
                width: width * 0.8,
            }}
            screenOptions={{
                activeTintcolor: "white",
                inactiveTintColor: "#000",
                activeBackgroundColor: "transparent",
                itemStyle: {
                    width: width * 0.75,
                    backgroundColor: "transparent",
                    paddingVertical: 16,
                    paddingHorizonal: 12,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                },
                labelStyle: {
                    fontSize: 18,
                    marginLeft: 12,
                    fontWeight: "normal",
                },
            }}
            initialRouteName="HomeDrawer"
        >
            <Drawer.Screen
                name="HomeDrawer"
                component={HomeStack}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="ProfileDrawer"
                component={ProfileStack}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="AccountDrawer"
                component={Register}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="ElementsDrawer"
                component={ElementsStack}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="ArticlesDrawer"
                component={ArticlesStack}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="SettingsDrawer"
                component={SettingsStack}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="LeaderBoard"
                component={LeaderBoardStack}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
}

export default function OnboardingStack(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                mode: "card",
                headerShown: false,
            }}
        >
            {/* <Stack.Screen
                name="Onboarding"
                component={Pro}
                option={{
                    headerTransparent: true,
                }}
            /> */}
            <Stack.Screen name="App" component={AppStack} />
        </Stack.Navigator>
    );
}
