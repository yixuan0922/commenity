import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import { StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import { Block, Text, theme } from "galio-framework";


import { Images, argonTheme } from "../constants";

class UserCard extends React.Component {
    render() {
        const { navigation, item, horizontal, full, style, ctaColor, imageStyle, ctaRight } = this.props;

        const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
        const cardContainer = [styles.card, styles.shadow, style];
        const imgContainer = [
            styles.imageContainer,
            horizontal ? styles.horizontalStyles : styles.verticalStyles,
            styles.shadow,
        ];
        // console.log(item)

        return ( 
            <Block row={horizontal} card flex style={cardContainer}>
                <TouchableWithoutFeedback onPress={() =>                     
                {
                        
                        navigation.navigate("Profile", { user: item })
                    }
                    }>
                    <Block flex middle style={[styles.avatarContainer,imgContainer]}>
                        {/* <Image source={{ uri: item.image }} style={styles.avatar} /> */}
                        <Image source={Images.ProfilePicture2} style={styles.avatar} />
                    </Block>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() =>
                    
                    {
                        
                        navigation.navigate("Profile", { user: item })
                        
                    }
                    
                    }>
                    <Block flex space="between" style={styles.cardDescription}>
                        <Block flex>
                            <Text
                                bold
                                style={[styles.cardTitle, { fontFamily: "open-sans-bold" }]}
                                size={14}
                                // style={styles.cardTitle}
                                color={argonTheme.COLORS.TEXT}
                            >
                                {item.lastName} {item.firstName}
                            </Text>
                            {item.username ? (
                                <Block flex left>
                                    <Text
                                        style={{ fontFamily: "open-sans-regular" }}
                                        size={12}
                                        color={argonTheme.COLORS.TEXT}
                                    >
                                        @{item.username}
                                    </Text>
                                </Block>
                            ) : (
                                <Block />
                            )}
                            <Text
                                style={[styles.cardTitle, { fontFamily: "open-sans-regular" }]}
                                size={12}
                                // style={styles.cardTitle}
                                color={argonTheme.COLORS.TEXT}
                            >
                                District: {item.district}
                            </Text>
                        </Block>
                        {/* <Block right={ctaRight ? true : false}>
                            <Text
                                style={{ fontFamily: "open-sans-bold" }}
                                size={12}
                                muted={!ctaColor}
                                color={ctaColor || argonTheme.COLORS.ACTIVE}
                                b
                            >
                                {item.cta}
                            </Text>
                        </Block> */}

                    </Block>
                </TouchableWithoutFeedback>
                <TouchableOpacity onPress={() => navigation.navigate("Profile", { user: item })}>
                    <Block flex middle style={[styles.avatarContainer,imgContainer]}>
                        {/* <Image source={{ uri: item.image }} style={styles.avatar} /> */}
                        <Image source={Images.ProfileGiveHand} style={styles.giveHearts} />
                    </Block>
                </TouchableOpacity>
            </Block>
        );
    }
}

UserCard.propTypes = {
    item: PropTypes.object,
    horizontal: PropTypes.bool,
    full: PropTypes.bool,
    ctaColor: PropTypes.string,
    imageStyle: PropTypes.any,
    ctaRight: PropTypes.bool,
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 114,
        marginBottom: 4,
    },
    cardTitle: {
        // flex: 1,
        // flexWrap: "wrap",
        paddingBottom: 6,
        
    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2,
    },
    imageContainer: {
        borderRadius: 3,
        elevation: 1,
        overflow: "hidden",
        marginRight: 15,
    },
    image: {
        // borderRadius: 3,
    },
    horizontalImage: {
        height: 122,
        width: "auto",
    },
    horizontalStyles: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    verticalStyles: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    fullImage: {
        height: 215,
    },
    shadow: {
        shadowColor: "#8898AA",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 2,
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        width: 100,
        height: 100,
        // borderRadius: 62,
        borderRadius: 20,
        borderWidth: 0,
    },
    giveHearts: {
        width: 70,
        height: 70,
    }

});

export default withNavigation(UserCard);
