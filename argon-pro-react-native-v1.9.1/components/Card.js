import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Images, argonTheme } from "../constants";

class Card extends React.Component {
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle, ctaRight } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ]
        // console.log(item)
        ;
    const itemImageName = item.image;

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("CommunityPost", { product: item })}>
          <Block flex style={imgContainer}>
          
            <Image source={Images[itemImageName] } style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("CommunityPost", { product: item })}>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={[styles.cardTitle, { fontFamily: "open-sans-regular" }]}
                size={14}
                color={argonTheme.COLORS.TEXT}
              >
                {item.title}
              </Text>
              {item.content ? (
                <Block flex left>
                  {/*
        Calculate the truncated content before using it in the JSX
      */}
                  {(() => {
                    const maxLength = 88;
                    const truncatedContent =
                      item.content.length > maxLength
                        ? item.content.slice(0, maxLength - 3) + "..."
                        : item.content;

                    return (
                      <Text
                        style={{ fontFamily: "open-sans-regular" }}
                        size={12}
                        color={argonTheme.COLORS.TEXT}
                      >
                        {truncatedContent}
                      </Text>
                    );
                  })()}
                </Block>
              ) : (
                <Block />
              )}
            </Block>

            <Block right={ctaRight ? true : false}>
              <Text
                style={{ fontFamily: "open-sans-bold" }}
                size={12}
                muted={!ctaColor}
                color={ctaColor || argonTheme.COLORS.ACTIVE}
                bold
              >
                {item.cta}
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
