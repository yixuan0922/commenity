import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Images from "../constants/Images";

import { Button } from "../components";

import articles from "../constants/articles";
import { HeaderHeight } from "../constants/utils";
import { Icon, Card } from "../components";
import Board from "../components/Board";
import entries from "../constants/entries";


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

class LeaderBoard extends React.Component {


    render() {
        const { navigation } = this.props;

        return (<ScrollView showsVerticalScrollIndicator={false} style={{ width,height, marginBottom: "25%",}} >
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}
                    >
                    <Block
                        flex = {0.6}
                        row
                        middle
                        style={{padding: 0, marginTop: -50}}
                    >
                        <Text h6 bold middle style={{ color: 'white' }}>
                            August 2023
                        </Text>
                    </Block>
                        
                        {/* <ScrollView showsVerticalScrollIndicator={false} style={{ width, marginTop: "25%" }}> */}
                            <Block flex style={[styles.profileCard]}>
                                <Block style={{ width: width * 0.85, height: 150,marginTop:-30 }} row>
                                    <Block flex>
                                        <Block middle style={styles.avatarContainer}>
                                            <Image source={Images.redhill} style={styles.avatarSecond} />
                                            <Block middle style={styles.scoring}><Text>2</Text></Block>
                                        </Block>
                                        <Block middle style={styles.nameInfo}>
                                            <Text style={{ fontFamily: "open-sans-bold" }} size={15} color="#32325D">
                                                {entries[1].location}
                                            </Text>
                                            <Text
                                                size={14}
                                                color="#32325D"
                                                style={{ marginTop: 5, fontFamily: "open-sans-light" }}
                                            >
                                                {entries[1].score}
                                            </Text>
                                        </Block>
                                    </Block>   
                                    <Block flex>
                                        <Block middle style={styles.avatarContainer}>
                                            <Image source={Images.redhill} style={styles.avatarFirst} />
                                            <Block middle style={styles.scoringFirst}><Text>1</Text></Block>
                                        </Block>
                                        <Block middle style={styles.nameInfo}>
                                            <Text style={{ fontFamily: "open-sans-bold" }} size={15} color="#32325D">
                                            {entries[0].location}
                                            </Text>
                                            <Text
                                                size={14}
                                                color="#32325D"
                                                style={{ marginTop: 5, fontFamily: "open-sans-light" }}
                                            >
                                                {entries[0].score}
                                            </Text>
                                        </Block>
                                    </Block> 
                                    <Block flex>
                                        <Block middle style={styles.avatarContainer}>
                                            <Image source={Images.bukitPanjang} style={styles.avatarThird} /> 
                                            <Block middle style={styles.scoring}><Text>3</Text></Block>
                                        </Block>
                                        <Block middle style={styles.nameInfo}>
                                            <Text style={{ fontFamily: "open-sans-bold" }} size={15} color="#32325D">
                                                {entries[2].location}
                                            </Text>
                                            <Text
                                                size={14}
                                                color="#32325D"
                                                style={{ marginTop: 5, fontFamily: "open-sans-light" }}
                                            >
                                                {entries[2].score}
                                            </Text>
                                        </Block>
                                    </Block>  
                                </Block>
                                <Block>
                                    {/* Divider */}
                                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                                        <Block style={styles.divider} />
                                    </Block>
                                    {/* Lower Bottom */}
                                    <Block row space="between">
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
                                            <ScrollView showsVerticalScrollIndicator={false} style={{  marginBottom: "25%" }}> 
                                            {/* {articles.map((elem, index) => (
                                                // <CommunityPost title={elem.title} content={elem.content} key={index} />
                                                <Card item={elem} key={index} horizontal />
                                            ))} */}
                                            <Block flex style={[styles.profileCard]}>
                                                {/* <Board item={entries[0]} />
                                                <Board item={entries[1]} />
                                                <Board item={entries[2]} /> */}
                                                {entries.slice(3).map((item, index) => {
                                                return <Board item={item} key={index} />;
                                                })}
                                            </Block>
                                            </ScrollView>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        {/* </ScrollView> */}
                    </ImageBackground>
                </Block>
            </Block>
            </ScrollView>
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
        marginTop: -90,
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
    scoring: {
        backgroundColor: 'lightgrey',
        borderRadius: 25,
        height: 25,
        width: 25,
        position: "absolute",
        top: 9,
        right: 12,
        marginTop: 35,
    },
    scoringFirst: {
        backgroundColor: 'lightgrey',
        borderRadius: 25,
        height: 25,
        width: 25,
        position: "absolute",
        top: 9,
        right: 12,
        marginTop: -15
    },
    avatarContainer: {
        position: "relative",
        marginTop: -50,
    },
    avatarFirst: {  
        width: 100,
        height: 100,
        borderRadius: 62,
        borderWidth: 0,
    },
    avatarSecond: {
        width: 90,
        height: 90,
        borderRadius: 62,
        borderWidth: 0,
        marginTop: 50,
    },
    avatarThird: {
        width: 80,
        height: 80,
        borderRadius: 62,
        borderWidth: 0,
        marginTop: 50,
    },
    nameInfo: {
        marginTop: 8,
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

export default LeaderBoard;
