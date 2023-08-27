import React from "react";
import { ScrollView, Alert } from "react-native";
import { Block, Text, Input, Button } from "galio-framework";
import { Notification } from "../components";
import { argonTheme } from "../constants";

import { useRoute } from '@react-navigation/native';

import { Picker } from "@react-native-picker/picker";

const styles = {
  formGroup: {
    marginBottom: 20,
    width: "180%",
  },
  input: {
    marginBottom: 10,

  },
  multilineInput: {
    height: 100,
  },
  picker: {
    marginVertical: 30,
    width: 400,

  },
};



export default class PersonalNotifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      requestType:'help',
      title: '',
      message: '',
      userName: 'dembouz', //temporary
      district: "yishun",
      
    };

  }

  handleRequestTypeChange = (value) => {
    console.log(value);
    console.log("incoming requestType", this.state.requestType);
    this.setState({ requestType: value });

  };

  handleChange = (key, val) => {
    this.setState({[key]: val});
  }

  handleSubmit = () => {
    console.log("inside the submit function!");
    const { requestType, name, email, message } = this.state;
    const url = "https://us-central1-commenity-edc7c.cloudfunctions.net/app";
    const headers =  {
      'Content-Type': 'application/json',
    };
    const postData = {
      title: this.state.title,
      message: this.state.message,
      userName: this.state.userName,
      requestType: this.state.requestType,
      district: this.state.district,
    }; 


    // Handle form submission here
    fetch(url + "/create", {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  };

  


  render() {

    const {route} = this.props;
    console.log(route);


    return (
      <Block flex center>
        <Block flex-col>
          <Text h4>Request Type</Text>
          <Picker
            selectedValue={this.state.requestType}
            onValueChange={this.handleRequestTypeChange}
            style = {styles.picker}
          >
            <Picker.Item label="Help Request" value="help" />
            <Picker.Item label="Give Request" value="give" />
          </Picker>
        </Block>

        <Block style={styles.formGroup}>
          <Text h4 >Tell us about your post.</Text>
          <Input
            placeholder="Title of your community alert"
            value={this.title}
            onChangeText={value => this.handleChange('name', value)}
            style={styles.input}
            color = "black"
          />


          <Input
            placeholder={this.state.requestType === "help" ? "Please describe the help you need"
            :
            "Please tell us how you would like to help the community!"}
            value={this.message}
            onChangeText={value => this.handleChange('message', value)}
            multiline
            style={styles.multilineInput}
            color = "black"
          />
        </Block>

        <Button round color= {argonTheme.COLORS.ACTIVE} onPress={this.handleSubmit}>Submit</Button>
      </Block>
    );
  }
}
