import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import articles from "../constants/articles";
import { HeaderHeight } from "../constants/utils";
import { Icon, Card } from "../components";

class CommunityPost extends React.Component {
    render() {
        const { title, content } = this.props;

        return (
            <Block flex row style={styles.communitypost}>
                <Block>
                    <Image style={{ width: "40%" }} source={Images.iOSLogo} />
                </Block>
                <Block flex row>
                    <Text>{title}</Text>
                    <Text>{content}</Text>
                </Block>
            </Block>
        );
    }
}

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
    render() {
        const { navigation } = this.props;

        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}
                    >
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width, marginTop: "25%" }}>
                            <Block flex style={styles.profileCard}>
                                <Block middle style={styles.avatarContainer}>
                                    <Image source={Images.ProfilePicture2} style={styles.avatar} />
                                </Block>
                                {/* <Block style={styles.info}>
                                    <Block middle row space="evenly" style={{ marginTop: 20, paddingBottom: 24 }}>
                                        <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }}>
                                            CONNECT
                                        </Button>
                                        <Button small style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}>
                                            MESSAGE
                                        </Button>
                                    </Block>
                                    <Block row space="between">
                                        <Block middle>
                                            <Text
                                                size={18}
                                                color="#525F7F"
                                                style={{ marginBottom: 4, fontFamily: "open-sans-bold" }}
                                            >
                                                2K
                                            </Text>
                                            <Text
                                                style={{ fontFamily: "open-sans-regular" }}
                                                size={12}
                                                color={argonTheme.COLORS.TEXT}
                                            >
                                                Orders
                                            </Text>
                                        </Block>
                                        <Block middle>
                                            <Text
                                                color="#525F7F"
                                                size={18}
                                                style={{ marginBottom: 4, fontFamily: "open-sans-bold" }}
                                            >
                                                10
                                            </Text>
                                            <Text
                                                style={{ fontFamily: "open-sans-regular" }}
                                                size={12}
                                                color={argonTheme.COLORS.TEXT}
                                            >
                                                Photos
                                            </Text>
                                        </Block>
                                        <Block middle>
                                            <Text
                                                color="#525F7F"
                                                size={18}
                                                style={{ marginBottom: 4, fontFamily: "open-sans-bold" }}
                                            >
                                                89
                                            </Text>
                                            <Text
                                                style={{ fontFamily: "open-sans-regular" }}
                                                size={12}
                                                color={argonTheme.COLORS.TEXT}
                                            >
                                                Comments
                                            </Text>
                                        </Block>
                                    </Block>
                                </Block> */}
                                <Block flex>
                                    <Block middle style={styles.nameInfo}>
                                        <Text style={{ fontFamily: "open-sans-regular" }} size={28} color="#32325D">
                                            Jessica Jones
                                        </Text>
                                        <Text
                                            size={14}
                                            color="#32325D"
                                            style={{ marginTop: 10, fontFamily: "open-sans-light" }}
                                        >
                                            MeUnity
                                        </Text>
                                        <Text
                                            size={16}
                                            color="#32325D"
                                            style={{ marginTop: 10, fontFamily: "open-sans-light" }}
                                        >
                                            <Icon name="location-on" family="MaterialIcons" size={14} color={"black"} />
                                            &nbsp; Woodlands, Woodgrove
                                        </Text>
                                    </Block>

                                    <Block flex space="evenly" row style={{ marginTop: 40 }}>
                                        <Block middle>
                                            <Text h4>380</Text>
                                            <Text>hearts received</Text>
                                        </Block>
                                        {/* <Block middle>
                                            <TouchableOpacity onPress={() => navigation.navigate("HomeDrawer")}>
                                                <Image source={Images.ProfileGiveHand} />
                                            </TouchableOpacity>
                                        </Block> */}
                                        <Block middle>
                                            <Text h4>380</Text>
                                            <Text>hearts given</Text>
                                        </Block>
                                    </Block>

                                    {/* Divider */}
                                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                                        <Block style={styles.divider} />
                                    </Block>
                                    {/* <Block middle>
                                        <Text
                                            size={16}
                                            color="#525F7F"
                                            style={{ textAlign: "center", fontFamily: "open-sans-regular" }}
                                        >
                                            An artist of considerable range, Jessica name taken by Melbourne …
                                        </Text>
                                        <Button
                                            color="transparent"
                                            textStyle={{
                                                color: "#233DD2",
                                                fontWeight: "500",
                                                fontSize: 16,
                                                fontFamily: "open-sans-regular",
                                            }}
                                        >
                                            Show more
                                        </Button>
                                    </Block> */}

                                    {/* Lower Bottom */}
                                    <Block row style={{ paddingVertical: 14 }} space="between">
                                        <Text bold size={16} color="#525F7F" style={{ marginTop: 3 }}>
                                            Community
                                        </Text>
                                        {/* <Button
                                            small
                                            color="transparent"
                                            textStyle={{ color: "#5E72E4", fontSize: 14 }}
                                        >
                                            View all
                                        </Button> */}
                                    </Block>
                                    <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                                        {/* <Block row space="between" style={{ flexWrap: "wrap" }}>
                                            {Images.Viewed.map((img, imgIndex) => (
                                                <Image
                                                    source={{ uri: img }}
                                                    key={`viewed-${img}`}
                                                    resizeMode="cover"
                                                    style={styles.thumb}
                                                />
                                            ))}
                                        </Block> */}
                                        <Block>
                                            {articles.map((elem, index) => (
                                                // <CommunityPost title={elem.title} content={elem.content} key={index} />
                                                <Card item={elem} key={index} horizontal />
                                            ))}
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                            <Block style={{ marginBottom: 80 }} />
                        </ScrollView>
                    </ImageBackground>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === "android" ? -HeaderHeight + 70 : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1,
        paddingBottomBottom: 50,
    },
    profileContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1,
    },
    profileBackground: {
        width: width,
        height: height / 2,
    },
    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    info: {
        paddingHorizontal: 40,
    },
    avatarContainer: {
        position: "relative",
        marginTop: -50,
    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0,
    },
    nameInfo: {
        marginTop: 15,
    },
    iconLocation: {
        marginRight: 20,
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },
    communitypost: {
        backgroundColor: "#E9ECEF",
        width: "100%",
        marginBottom: 30,
        padding: 20,
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure,
    },
});

export default Profile;
