import React from "react";
import { ScrollView, Alert } from "react-native";
import { Block, Text, Input, Button } from "galio-framework";
import { Notification } from "../components";
import { argonTheme } from "../constants";

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
    padding: 10,
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
    // Handle form submission here
    fetch(url + "/", {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: {
        title: this.state.title,
        message: this.state.message,
        userName: this.state.userName,
        requestType: this.state.requestType
      } 
    });
  
  };



  render() {
    return (
      <Block flex center>
        <Block>
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

        <Button round color="info" onPress={this.handleSubmit}>Submit</Button>
      </Block>
    );
  }
}
