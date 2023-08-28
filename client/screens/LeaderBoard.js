import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Images } from "../constants";
import { HeaderHeight } from "../constants/utils";
import Board from "../components/Board";

const { width, height } = Dimensions.get("screen");

class LeaderBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: [],
            isLoading: true,
            aggregatedData: null,
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        const url = "https://us-central1-commenity-edc7c.cloudfunctions.net/app/user";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState(
                    {
                        responseData: data,
                        isLoading: false
                    },
                    () => {
                        this.aggregateHeartsData();
                    }
                );
                console.log("In leaderboard fetch!");
            })
            .catch(error => {
                this.setState({
                    responseData: null,
                    isLoading: false
                });
                console.error('Error:', error);
            });
    }

    aggregateHeartsData() {
        const { responseData } = this.state;

        const districtAggregatedHearts = responseData.reduce((aggHearts, entry) => {
            const { district, heartsReceived } = entry;
            if (!aggHearts[district]) {
                aggHearts[district] = 0; //im setting it to 0 if I haven't encountered it yet. considering using a hashmap see how
            }
            aggHearts[district] += heartsReceived;
            return aggHearts;
        }, {});

        this.setState({
            aggregatedData: districtAggregatedHearts
        });
    }

    render() {
        const { aggregatedData } = this.state;
        
        const currentDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
        const sortedData = aggregatedData
        ? Object.keys(aggregatedData)
        .map(district => ({ district, heartsReceived: aggregatedData[district] })) // if aggregated data is fetched, take the districts and map them
        .sort((a, b) => b.heartsReceived - a.heartsReceived)
        : null;
        const convertedToObject = sortedData? sortedData.reduce((result, item) => {
            result[item.district] = item.heartsReceived; //would be better with ts but works
            return result;
        }, {}):null;
        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}
                    >
                        <Block
                            flex={0.6}
                            row
                            middle
                            style={{ padding: 0, marginTop: -20 }}
                        >
                            <Text h6 bold middle style={{ color: 'white' }}>
                                {currentDate}
                            </Text>
                        </Block>

                        <Block flex style={[styles.profileCard]}>
                            <Block style={{ width: width * 0.85, height: 150 }} row>
                                {aggregatedData &&
                                    Object.keys(convertedToObject).slice(0,3).map((district, index) => (
                                        <Block flex key={index}>
                                            <Block middle style={styles.avatarContainer}>
                                                <Image source={Images.redhill} style={styles.avatarSecond} />
                                                <Block middle style={styles.scoring}>
                                                    <Text>{index + 1}</Text>
                                                </Block>
                                            </Block>
                                            <Block middle style={styles.nameInfo}>
                                                <Text
                                                    style={{ fontFamily: "open-sans-bold" }}
                                                    size={15}
                                                    color="#32325D"
                                                >
                                                    {district}
                                                </Text>
                                                <Text
                                                    size={14}
                                                    color="#32325D"
                                                    style={{ marginTop: 5, fontFamily: "open-sans-light" }}
                                                >
                                                    Hearts: {aggregatedData[district]}
                                                </Text>
                                            </Block>
                                        </Block>
                                    ))}
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
                                    <Block>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            <Block flex>
                                                {aggregatedData &&
                                                    Object.keys(convertedToObject)
                                                        .slice(3)
                                                        .map((district, index) => (
                                                            <Board
                                                                item={{
                                                                    location: district,
                                                                    score: aggregatedData[district]
                                                                }}
                                                                key={index}
                                                            />
                                                        ))}
                                            </Block>
                                        </ScrollView>
                                    </Block>
                                </Block>
                            </Block>

                        </Block>
                    </ImageBackground>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === "android" ? -HeaderHeight + 70 : 0,
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
    avatarContainer: {
        position: "relative",
        marginTop: -50,
    },
    avatarSecond: {
        width: 90,
        height: 90,
        borderRadius: 62,
        borderWidth: 0,
        marginTop: 50,
    },
    nameInfo: {
        marginTop: 8,
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },
});

export default LeaderBoard;
