import React from "react";
import { ScrollView, Alert } from "react-native";
import { Block } from "galio-framework";
import { Notification } from "../components";
import { argonTheme } from "../constants";

export default class PersonalNotifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      requestType:'help',
      title: "",
      message: '',
      userName: 'dembouz', //temporary
      district: "Yishun",
      
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

    this.setState({
      title: "",
      message: "",
      userName: "",
      requestType: "",
      district: "",
    })
  
  };

  
  render() {
    return (
      <Block middle flex>
        <Block flex style={{ width: "90%" }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Notification
              time="15:30"
              body="About your order #45C23B Wifey made the best Father's Day meal ever. So thankful so happy."
              iconName="ship"
              iconFamily="font-awesome"
              style={{ marginTop: 15 }}
              onPress={() => Alert.alert('Yes, you can use the notifications as buttons so you could send your customers to anything you want.')}
            />
            <Notification
              time="12:10"
              body="Customize our products. Now you can make the best and perfect clothes just for you."
              iconName="ship"
              iconFamily="font-awesome"
              color={argonTheme.COLORS.INFO}
              style={{ marginTop: 15 }}
              onPress={() => Alert.alert('Yes, you can use the notifications as buttons so you could send your customers to anything you want.')}
            />
            <Notification
              time="11:30"
              body="Breaking News! We have new methods to payment. Learn how to pay off debt fast using the stack method."
              iconName="ship"
              iconFamily="font-awesome"
              color={argonTheme.COLORS.WARNING}
              style={{ marginTop: 15 }}
              onPress={() => Alert.alert('Yes, you can use the notifications as buttons so you could send your customers to anything you want.')}
            />
            <Notification
              time="04:23"
              body="Congratulations! Someone just ordered a pair of Yamaha HS8 speakers through your app! Hurry up and ship them!"
              iconName="ship"
              iconFamily="font-awesome"
              color={argonTheme.COLORS.SUCCESS}
              style={{ marginTop: 15 }}
              onPress={() => Alert.alert('Yes, you can use the notifications as buttons so you could send your customers to anything you want.')}
            />
            <Block style={{ marginBottom: 20 }} />
          </ScrollView>
        </Block>


        <Block style={styles.formGroup}>
          <Text h4 >Tell us about your post.</Text>
          <Input
            placeholder="Title of your community alert"
            value={this.state.title}
            onChangeText={value => this.handleChange('title', value)}
            style={styles.input}
            color = "black"
          />


          <Input
            placeholder={this.state.requestType === "help" ? "Please describe the help you need"
            :
            "Please tell us how you would like to help the community!"}
            value={this.state.message}
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
