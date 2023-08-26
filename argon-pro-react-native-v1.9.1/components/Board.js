import React from 'react';
import { StyleSheet , Image } from 'react-native';
import PropTypes from 'prop-types';
import { Block, Text, theme } from 'galio-framework';
import Icon from './Icon';
import { Images } from "../constants";

import { argonTheme } from "../constants";

class Board extends React.Component {
  render() {
    const { item } = this.props;

    const itemContainer = [styles.item, styles.shadow];

    
    return (
        <Block key={item.rank} style={itemContainer}>
        <Text style={styles.rank}>{item.rank}</Text>
        <Block style={styles.imgContainer}>
            <Image source={Images.bukitPanjang} style={{ width: 50, height: 50 }} />
        </Block>
        <Text style={[styles.location, { paddingLeft: 10 }]}>{item.location}</Text>
        <Text style={styles.score}>{item.score}</Text>
        {item.change === 'up' ? (
            // <Block style={styles.upArrow} />
            <Icon 
                family='AntDesign'
                size={20}
                name='caretup'
                color='green'
            />
        ) : item.change === 'down' ? (
            // <Block style={styles.downArrow} />
            <Icon 
            family='AntDesign'
            size={20}
            name='caretdown'
            color='red'
        />
        ) : null}
        </Block>
    );
  }
}

Board.protoTypes = {
    item: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  image: {
  },
  imgContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden"
  },
  location: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  score: {
    fontSize: 18,
    color: 'black',
    marginRight: 10,
  },
  upArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'green',
  },
  downArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'red',
  }, 
  shadow: {
    shadowColor: "#8898AA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  }

});

export default Board;
