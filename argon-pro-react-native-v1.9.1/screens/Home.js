import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
import Icon from "../components/Icon";

import { Card } from "../components";
import articles from "../constants/articles";
import user from "../constants/user";
const { width } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";

class Home extends React.Component {
    renderArticles = () => {
        return (
            <>
                {/* // Articles rendered (Paste json file here) */}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
                    <Block flex>
                        <Card item={articles[0]} horizontal />
                        <Card item={articles[1]} horizontal />
                        <Card item={articles[2]} horizontal />
                        {/* <Card item={articles[3]} horizontal /> */}
                        {/* <Block flex row>
            <Card
              item={articles[1]}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={articles[2]} />
          </Block> */}
                        {/* <Card item={articles[3]} horizontal /> */}
                        {/* <Card item={articles[4]} full /> */}
                    </Block>
                </ScrollView>
            </>
        );
    };

    renderCommunity = () => {
        return (
            <Block
                flex
                row
                style={{
                    // alignItems: "center",
                    // justifyContent: "center",
                    // borderWidth: 5,
                    marginTop: 0,
                    marginBottom: 0,
                    minHeight: 50,
                }}
            >
                <Block flex={0.9} row center>
                    <Icon family="Foundation" size={16} name="marker" color={argonTheme.COLORS.ICON} />
                    <Text h6 bold style={{ marginLeft: 25 }}>
                        {user[0].district}
                    </Text>
                </Block>
            </Block>
        );
    };

    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderCommunity()}
                {this.renderArticles()}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    articles: {
        width: width - theme.SIZES.BASE * 2,
        // paddingBottom: theme.SIZES.BASE * 4,
        paddingHorizontal: 2,
    },
});

export default Home;
