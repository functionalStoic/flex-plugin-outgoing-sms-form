import React, { Component } from "react";
import styled from "@emotion/styled";

const SendSMSStyle = styled.div`
  padding: 10px;
  margin: 0px;
  color: #fff;
  background: rgb(216, 27, 96);
`;

export default class SendSMS extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { phoneNumber: "", formError: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    const headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${window.btoa(
        process.env.REACT_APP_OUTGOING_SMS_ENDPOINT_ACOUNT_SID +
          ":" +
          process.env.REACT_APP_OUTGOING_SMS_ENDPOINT_PASSWORD
      )}`
    });

    const body = new URLSearchParams({
      To: `+1${this.state.phoneNumber}`,
      From: process.env.REACT_APP_FROM_PHONE_NUMBER,
      Parameters: '{"body":"Daily Special: TACO-RITA, FAJITAS, ENCHILADA"}'
    });

    fetch(
      "https://studio.twilio.com/v1/Flows/FWe081c50cd77234c39bbc502d8a08e398/Executions",
      {
        method: "POST",
        headers,
        body,
        redirect: "follow"
      }
    )
      .then(result => this.setState({ phoneNumber: "", formError: false }))
      .catch(error => this.setState({ formError: true }));
  };

  handleChange(e) {
    e.persist();
    this.setState({ phoneNumber: e.target.value });
  }

  render() {
    return (
      <SendSMSStyle>
        <form onSubmit={this.handleSubmit}>
          <div style={{ paddingBottom: 10, fontSize: 16 }}>
            Send Daily Specials (TACO-RITA, FAJITAS, ENCHILADA)
          </div>
          <input
            type="text"
            style={{ marginLeft: 10 }}
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            placeholder="ex. 202-555-0165"
          />
          <input
            style={{ marginLeft: 10 }}
            type="submit"
            value="Send SMS"
            disabled={this.state.phoneNumber.length <= 9}
          />
          {this.state.formError && "Error, please try again"}
        </form>
      </SendSMSStyle>
    );
  }
}
