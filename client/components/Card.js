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
                                size={17}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                // style={styles.cardTitle}
                                color={argonTheme.COLORS.TEXT}
                            >
                                {item.title}
                            </Text>
                            {item.message ? (
                                <Block flex left>
                                    <Text
                                        style={{
                                            fontFamily: "open-sans-regular",
                                        }}
                                        ellipsizeMode="tail"
                                        numberOfLines={4}
                                        size={12}
                                        color={argonTheme.COLORS.TEXT}
                                    >
                                        {item.message}
                                    </Text>
                                </Block>
                            ) : (
                                <Block />
                            )}
                        </Block>
                        <Block flex row style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
                            {item.requestType.toLowerCase() === "help" ? (
                                <Text
                                    size={10}
                                    muted={!ctaColor}
                                    color={ctaColor || argonTheme.COLORS.ACTIVE}
                                    bold
                                    style={{
                                        color: "red",
                                        padding: 5,
                                        borderRadius: 10,
                                        backgroundColor: "#ffd4d8",
                                    }}
                                >
                                    Help Request
                                </Text>
                            ) : (
                                <Text
                                    size={10}
                                    muted={!ctaColor}
                                    color={ctaColor || argonTheme.COLORS.ACTIVE}
                                    bold
                                    style={{
                                        color: "green",
                                        padding: 5,
                                        borderRadius: 10,
                                        backgroundColor: "#c4ffb3",
                                    }}
                                >
                                    Give Request
                                </Text>
                            )}

                            <Text
                                style={{ fontFamily: "open-sans-bold" }}
                                size={15}
                                muted={!ctaColor}
                                color={ctaColor || argonTheme.COLORS.ACTIVE}
                                bold
                            >
                                View Post
                            </Text>
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
    },
    image: {
        // borderRadius: 3,
    },
    horizontalImage: {
        resizeMode: "cover",
        height: 190,
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
