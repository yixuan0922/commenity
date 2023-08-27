import React from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Image,
    Animated,
    Platform,
    Modal,
    View,
} from "react-native";

import { Block, Text, Button, theme } from "galio-framework";
import { Icon } from "../components";
import argonTheme from "../constants/Theme";
import {Images} from "../constants";
import { iPhoneX, HeaderHeight } from "../constants/utils";


const { height, width } = Dimensions.get("window");

export default class CommunityPost extends React.Component {
    state = {
        selectedSize: null,
    };

    scrollX = new Animated.Value(0);

    renderGallery = () => {
        const { navigation, route } = this.props;
        // const { params } = navigation && navigation.state;
        // const product = params.product;
        const product = route.params?.product;
        // const productName = product.image;
        
        const productImages = [ product.image, product.image, product.image];

        return (
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                decelerationRate={0}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }], {
                    useNativeDriver: false,
                })}
            >
                {productImages.map((image, index) => (
                    <TouchableWithoutFeedback
                        key={`product-image-${index}`}
                        onPress={() => navigation.navigate("Gallery", { images: productImages, index })}
                    >
                        <Image
                            resizeMode="cover"
                            source={Images[image] }
                            style={{ width, height: iPhoneX ? width + 32 : width }}
                        />
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        );
    };

    renderProgress = () => {
        const { navigation, route } = this.props;
        // const { params } = navigation && navigation.state;
        // const product = params.product;
        const product = route.params?.product;
        const productImages = [product.image, product.image, product.image, product.image];

        const position = Animated.divide(this.scrollX, width);

        return (
            <Block row>
                {productImages.map((_, i) => {
                    const opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: "clamp",
                    });

                    const width = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [8, 18, 8],
                        extrapolate: "clamp",
                    });

                    return <Animated.View key={i} style={[styles.dots, { opacity, width }]} />;
                })}
            </Block>
        );
    };

    renderSize = (label) => {
        const active = this.state.selectedSize === label;

        return (
            <TouchableHighlight
                style={styles.sizeButton}
                underlayColor={argonTheme.COLORS.PRICE_COLOR}
                onPress={() => this.setState({ selectedSize: label })}
            >
                <Text
                    style={{ fontFamily: "open-sans-regular" }}
                    color={active ? theme.COLORS.PRIMARY : argonTheme.COLORS.TEXT}
                >
                    {label}
                </Text>
            </TouchableHighlight>
        );
    };

    renderChatButton = () => {
        const { navigation } = this.props;
        return (
            <Block style={styles.chatContainer}>
                <Button
                    radius={28}
                    opacity={0.9}
                    style={styles.chat}
                    color={argonTheme.COLORS.PRIMARY}
                    onPress={() => navigation.navigate("Chat")}
                >
                    <Icon size={18} family="materialicon" name="chat-bubble" color="white" />
                </Button>
            </Block>
        );
    };

    // Add a state variable to control the visibility of the popup
  state = {
    selectedSize: null,
    isPopupVisible: false, // Initialize as false
  };

  // Function to toggle the visibility of the popup
  togglePopup = () => {
    this.setState((prevState) => ({
      isPopupVisible: !prevState.isPopupVisible,
    }));
  };

    render() {
        // const { selectedSize } = this.state;
        const { selectedSize, isPopupVisible } = this.state; // Destructure isPopupVisible
        const { navigation, route } = this.props;
        // const { params } = navigation && navigation.state;
        // const product = params.product;
        const product = route.params?.product;

        return (
            <Block flex style={styles.communitypost}>
                <Block flex style={{ position: "relative" }}>
                    {this.renderGallery()}
                    <Block center style={styles.dotsContainer}>
                        {this.renderProgress()}
                    </Block>
                </Block>
                <Block flex style={styles.options}>
                    {this.renderChatButton()}
                    <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                        <Block
                            style={{
                                paddingHorizontal: theme.SIZES.BASE,
                                paddingTop: theme.SIZES.BASE * 2,
                            }}
                        >
                            <Text
                                size={28}
                                style={{ paddingBottom: 15, textAlign: "center", fontFamily: "open-sans-regular" }}
                                color={argonTheme.COLORS.TEXT}
                            >
                                {product.title}
                            </Text>
                            <Block row middle style={{ alignItems: "center", marginBottom: 10 }}>
                                <Image source={Images.ProfilePicture2} style={styles.avatar} />
                                <Block>
                                    <Text
                                        style={{ fontFamily: "open-sans-regular" }}
                                        size={14}
                                        color={argonTheme.COLORS.TEXT}
                                    >
                                        Jessica Jones
                                    </Text>
                                </Block>
                            </Block>
                            <Block flex middle>
                                <Button
                                    shadowless
                                    style={styles.GoButton}
                                    color={argonTheme.COLORS.PRIMARY}
                                    onPress={this.togglePopup} // Call the togglePopup function
                                >
                                    <Text style={{ fontFamily: "open-sans-bold" }} color={argonTheme.COLORS.WHITE}>
                                        Accept
                                    </Text>
                                </Button>
                            </Block>
                        </Block>

                        {/* post Content */}
                        <Block
                            flex
                            style={{
                                paddingHorizontal: theme.SIZES.BASE,
                                paddingTop: theme.SIZES.BASE * 2,
                                paddingBottom: theme.SIZES.BASE * 3,
                            }}
                        >
                            <Text>{product.content}</Text>
                        </Block>
                    </ScrollView>
                </Block>
                    <Modal transparent={true} visible={isPopupVisible} animationType="slide">
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>We have sent your request confirmation! Please chat for more information.</Text>
                            <Button onPress={this.togglePopup} color={argonTheme.COLORS.PRIMARY}>
                            Return
                            </Button>
                        </View>
                    </View>
                    </Modal>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    communitypost: {
        marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    },
    options: {
        position: "relative",
        marginHorizontal: theme.SIZES.BASE,
        marginTop: -theme.SIZES.BASE * 2,
        marginBottom: 0,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
    },
    galleryImage: {
        width: width,
        height: "auto",
    },
    dots: {
        height: theme.SIZES.BASE / 2,
        margin: theme.SIZES.BASE / 2,
        borderRadius: 4,
        backgroundColor: "white",
    },
    dotsContainer: {
        position: "absolute",
        bottom: theme.SIZES.BASE,
        left: 0,
        right: 0,
        bottom: height / 10,
    },
    GoButton: {
        // width: width - theme.SIZES.BASE * 4,
        // marginTop: theme.SIZES.BASE * 2,

        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        shadowOpacity: 1,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        // marginBottom: theme.SIZES.BASE,
        marginRight: 8,
    },
    chat: {
        width: 56,
        height: 56,
        padding: 20,
        borderRadius: 28,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        shadowOpacity: 1,
    },
    chatContainer: {
        top: -32,
        right: theme.SIZES.BASE,
        zIndex: 2,
        position: "absolute",
    },
    size: {
        height: theme.SIZES.BASE * 3,
        width: (width - theme.SIZES.BASE * 2) / 3,
        borderBottomWidth: 0.5,
        borderBottomColor: argonTheme.COLORS.BORDER_COLOR,
        overflow: "hidden",
    },
    sizeButton: {
        height: theme.SIZES.BASE * 3,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        backgroundColor: argonTheme.COLORS.PRICE_COLOR,
    },
    roundTopLeft: {
        borderTopLeftRadius: 4,
        borderRightColor: argonTheme.COLORS.BORDER_COLOR,
        borderRightWidth: 0.5,
    },
    roundBottomLeft: {
        borderBottomLeftRadius: 4,
        borderRightColor: argonTheme.COLORS.BORDER_COLOR,
        borderRightWidth: 0.5,
        borderBottomWidth: 0,
    },
    roundTopRight: {
        borderTopRightRadius: 4,
        borderLeftColor: argonTheme.COLORS.BORDER_COLOR,
        borderLeftWidth: 0.5,
    },
    roundBottomRight: {
        borderBottomRightRadius: 4,
        borderLeftColor: argonTheme.COLORS.BORDER_COLOR,
        borderLeftWidth: 0.5,
        borderBottomWidth: 0,
    },

      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});
