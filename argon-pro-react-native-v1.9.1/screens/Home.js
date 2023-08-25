import React from "react";
import { StyleSheet, Dimensions, ScrollView} from "react-native";
import { Block, theme, Text } from "galio-framework";
import Icon from '../components/Icon';



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
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
        <Card item={articles[0]} horizontal /> 
        <Card item={articles[1]} horizontal /> 
        <Card item={articles[2]} horizontal /> 
        <Card item={articles[3]} horizontal /> 
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
      <>
      <Block flex row style={{alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 0}}>
        <Block middle flex={0.1} style={{  marginRight: 5 }}>
        <Icon 
          family="Foundation"
          size={16}
          name="marker"
          color={argonTheme.COLORS.ICON}
        />
        </Block>
        <Block row center flex={0.9}>
        <Text h6 bold>{user[0].district}</Text>
        {/* <Text h5 bold>Community</Text> */}
        </Block>
      </Block>
      </>
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
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2
  }
});

export default Home;
