import React from "react";
import { StyleSheet, Dimensions, ScrollView} from "react-native";
import { Block, theme, Text } from "galio-framework";
import Icon from '../components/Icon';

import { Card } from "../components";
// import articles from "../constants/articles";
import user from "../constants/user";
const { width } = Dimensions.get("screen");
import argonTheme from "../constants/Theme";
import Board from "../components/Board";
import entries from "../constants/entries";


class LeaderBoard extends React.Component {
  renderProgressBar = () => {
    return (
      <Block flex style={styles.progressBar}>
        <Text style={styles.progressText}>Progress Bar</Text>
      </Block>
    );
  }

  renderBoard = () => {
    return (
      <>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
          <Block flex>
            {/* <Board item={entries[0]} />
            <Board item={entries[1]} />
            <Board item={entries[2]} /> */}
            {entries.map((item, index) => {
              return <Board item={item} key={index} />;
            })}
          </Block>

      </ScrollView>
      
      </>
    )
  }

  renderEntries = () => {
    entries.map((item, index) => {
      return <Board item={item} key={index} />;
    });
  }


  renderTitle = () => {
    return (
      <>
      <Block flex row style={{alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 0}}>
      <Block middle flex={0.1} style={{  marginRight: 5 }}>
      <Icon 
        family="Entypo"
        size={20}
        name="trophy"
        color={argonTheme.COLORS.ICON}
      />
      </Block>
      <Block row center flex={0.9}>
      <Text h6 bold>LeaderBoard</Text>
      {/* <Text h5 bold>Community</Text> */}
      </Block>
    </Block>
    </>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderTitle()}
        {/* {this.renderProgressBar()} */}
        {this.renderBoard()}
      </Block>
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightblue',
    },
    home: {
      width: width,
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
      paddingHorizontal: 2
    },
    progressBar: {
      backgroundColor: 'red',
      padding: 10,
    },
    progressText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
});

export default LeaderBoard;
