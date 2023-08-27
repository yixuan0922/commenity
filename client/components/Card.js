import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { argonTheme } from "../constants";

import articles from "../constants/articles";

class Card extends React.Component {
    render() {
        const { navigation, item, horizontal, full, style, ctaColor, imageStyle, ctaRight, idx } = this.props;

        const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
        const cardContainer = [styles.card, styles.shadow, style];
        const imgContainer = [
            styles.imageContainer,
            horizontal ? styles.horizontalStyles : styles.verticalStyles,
            styles.shadow,
        ];

        return (
            <Block row={horizontal} card flex style={cardContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("CommunityPost", { post: item })}>
                    <Block flex style={imgContainer}>
                        <Image source={{ uri: articles[idx % articles.length].image }} style={imageStyles} />
                    </Block>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("CommunityPost", { post: item })}>
                    <Block flex space="between" style={styles.cardDescription}>
                        <Block flex>
                            <Text
                                style={[styles.cardTitle, { fontFamily: "open-sans-bold" }]}
                                size={16}
                                // style={styles.cardTitle}
                                color={argonTheme.COLORS.TEXT}
                            >
                                {item.title}
                            </Text>
                            {item.message ? (
                                <Block flex left>
                                    <Text
                                        style={{ fontFamily: "open-sans-regular" }}
                                        size={13}
                                        color={argonTheme.COLORS.TEXT}
                                        numberOfLines={5} // Set the number of lines you want to display before ellipsis
                                        ellipsizeMode="tail" // Set to "tail" to show ellipsis at the end
                                    >
                                        {item.message}
                                    </Text>
                                </Block>
                            ) : (
                                <Block />
                            )}
                        </Block>
                        <Block row style={{ justifyContent: "space-between", alignItems: "center" }}>
                            {item.requestType.toLowerCase() === "help" ? (
                                <Text
                                    style={{
                                        fontFamily: "open-sans-bold",
                                        borderRadius: 20,
                                        padding: 5,
                                        backgroundColor: "#ffc4c4",
                                        fontSize: 10,
                                        color: "red",
                                    }}
                                    size={12}
                                    muted={!ctaColor}
                                    color={ctaColor || argonTheme.COLORS.ACTIVE}
                                    bold
                                >
                                    Help Request
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        fontFamily: "open-sans-bold",
                                        borderRadius: 20,
                                        padding: 5,
                                        backgroundColor: "#cfffc4",
                                        fontSize: 10,
                                        color: "green",
                                    }}
                                    size={12}
                                    muted={!ctaColor}
                                    color={ctaColor || argonTheme.COLORS.ACTIVE}
                                    bold
                                >
                                    Give Request
                                </Text>
                            )}

                            {/* <Text
                                style={{ fontFamily: "open-sans-bold" }}
                                size={15}
                                muted={!ctaColor}
                                color={ctaColor || argonTheme.COLORS.ACTIVE}
                                bold
                            >
                                View Post
                            </Text> */}
                        </Block>
                    </Block>
                </TouchableWithoutFeedback>
            </Block>
        );
    }
}

Card.propTypes = {
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
        minHeight: 115,
        maxHeight: 400,
        marginBottom: 5,
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
    },
    image: {
        // borderRadius: 3,
    },
    horizontalImage: {
        resizeMode: "cover",
        height: 200,
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
});

export default withNavigation(Card);
