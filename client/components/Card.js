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
                <TouchableWithoutFeedback onPress={() => navigation.navigate("CommunityPost", { product: item })}>
                    <Block flex style={imgContainer}>
                        <Image source={{ uri: articles[idx%(articles.length)].image }} style={imageStyles} />
                    </Block>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("CommunityPost", { product: item })}>
                    <Block flex space="between" style={styles.cardDescription}>
                        <Block flex>
                            <Text
                                style={[styles.cardTitle, { fontFamily: "open-sans-regular" }]}
                                size={14}
                                // style={styles.cardTitle}
                                color={argonTheme.COLORS.TEXT}
                            >
                                {item.title}
                            </Text>
                            {item.message ? (
                                <Block flex left>
                                    <Text
                                        style={{ fontFamily: "open-sans-regular" }}
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
                        <Block >
                            <Text
                                style={{ fontFamily: "open-sans-bold" }}
                                size={12}
                                muted={!ctaColor}
                                color={ctaColor || argonTheme.COLORS.ACTIVE}
                                bold
                            >
                                {item.requestType.toLowerCase() === "help" ? 
                                <Text style = {{"fontSize":"10", color: "red"}}>Help Request</Text>
                                : 
                                <Text style = {{"fontSize":"10", color: "green"}}>Give Request</Text>}
                            </Text>
                        </Block>
                        <Block right={ctaRight ? true : false}>
                            <Text
                                style={{ fontFamily: "open-sans-bold" }}
                                size={12}
                                muted={!ctaColor}
                                color={ctaColor || argonTheme.COLORS.ACTIVE}
                                bold
                            >
                                <Text h6>View Post</Text>
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
});

export default withNavigation(Card);
