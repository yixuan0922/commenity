import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
import Icon from "../components/Icon";

import { Card } from "../components";

import user from "../constants/user";
const { width } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";

import articles from "../constants/articles";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            isLoading: true,
        };
    }

    // until login is done, set district to Yishun first
    fetchArticles() {
        const url = "https://us-central1-commenity-edc7c.cloudfunctions.net/app/";
        const headers = {
            "Content-Type": "application/json",
        };

        fetch("https://us-central1-commenity-edc7c.cloudfunctions.net/app/?district=Yishun")
            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    responseData: data,
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    responseData: null,
                    isLoading: true,
                });
                console.error("Error:", error);
            });
    }

    componentDidMount() {
        this.fetchArticles();
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.fetchArticles();
        });
    }

    componentWillUnmount() {
        // Clean up the listener when the component is unmounted
        this.focusListener && this.focusListener();
    }

    renderArticles = () => {
        return (
            <>
                {/* // Articles rendered (Paste json file here) */}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
                    <Block flex>
                        {this.state.isLoading && <Text h4>Please wait while we get the posts...</Text>}
                        {this.state.responseData &&
                            !this.state.isLoading &&
                            this.state.responseData.map((el, idx) => (
                                <Card item={this.state.responseData[idx]} key={idx} idx={idx} horizontal></Card>
                            ))}
                    </Block>
                </ScrollView>
            </>
        );
    };

    renderCommunity = () => {
        return (
            <Block
                // flex
                // row
                style={{
                    // alignItems: "center",
                    // justifyContent: "center",
                    // borderWidth: 5,
                    marginVertical: 20,
                }}
            >
                <Block row center>
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
        paddingBottom: theme.SIZES.BASE * 4,
        paddingHorizontal: 2,
    },
});

export default Home;
