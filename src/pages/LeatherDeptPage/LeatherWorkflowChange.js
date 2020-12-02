import React, { Component } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Form,
  FormField,
  Layer,
  Anchor
} from "grommet";
import { Tools, StatusGood, StatusCritical, FormClose } from "grommet-icons";
import DigitalClock from "../../components/Clock/Clock.js";

class LeatherDeptPage extends Component {
  constructor(props) {
    super(props);
    this.changeWorkflowStatus = this.changeWorkflowStatus.bind(this);
    this.onClose = this.onClose.bind(this);
    this.clearLoading = this.clearLoading.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.toggleResponseLayer = this.toggleResponseLayer.bind(this);
    this.state = {
      value: "test",
      open: false,
      sqlFailed: false,
      sqlSuccess: false,
      currentAssy: 0
    };
  }

  // async changeWorkflowStatus(event) {
  //   event.preventDefault();
  //   console.log(event.value.assembly);
  //   this.setState({ isLoading: true });
  //   let url = "http://192.168.50.232:5000/workflow/3leather/" + event.value.assembly;

  //   const request = new Request(url, { method: "PATCH", body: event.value });

  //   await fetch(request)
  //     // .then(res => res.json())
  //     .then(async res => {
  //       console.log('Server Response: ');
  //       console.log(res);
  //       console.log('END Server Response ');
  //       console.log(event.value);
  //       this.setState(
  //         {
  //           open: true,
  //           value: event.value.assembly
  //         },
  //         this.resetForm
  //       );
  //     });
  // }

  async changeWorkflowStatus(event) {
    event.preventDefault();
    console.log(event.value.assembly);
    this.setState({ isLoading: true });
    let url = "http://192.168.50.232:5000/workflow/3leather/" + event.value.assembly;

    const request = new Request(url, { method: "PATCH", body: event.value });

    await fetch(request)
      // .then(res => res.json())
      .then(async res => {
        return res.json();
      })
      .then(data => {
        if (data.body == "success") {
          this.toggleResponseLayer(true);
          console.log("success1");
        } else if (data.body == "failed") {
          this.toggleResponseLayer(false);
          console.log("failed1");
        } else {
          this.toggleResponseLayer(false);
          console.log("SQL Server Error");
        }
        // console.log(data.body);
      });
  }

  toggleResponseLayer(status) {
    if (status === true) {
      console.log("success2");
      this.setState(
        {
          open: true,
          sqlFailed: false,
          sqlSuccess: true
        },
        this.resetForm
      );
    } else {
      console.log("failed2");
      this.setState(
        {
          open: true,
          sqlFailed: true,
          sqlSuccess: false
        },
        this.resetForm
      );
    }
  }

  resetForm() {
    setTimeout(() => {
      this.setState({ sqlFailed: false, sqlSuccess: false });
      document.getElementById("mainForm").reset();
      document.getElementById("mainFormInput").focus();
    }, 2000);
  }

  clearLoading() {
    this.setState({ isLoading: false });
    console.log("Clear Loading");
  }

  // onOpen() {
  //   this.setState({ open: true });
  // }

  onClose() {
    this.setState({ sqlFailed: false, sqlSuccess: false });
    document.getElementById("mainForm").reset();
    document.getElementById("mainFormInput").focus();
  }

  render() {
    return (
      <Box>
        <Heading
          style={{ textAlign: "center" }}
          size={"large"}
          level={1}
          alignSelf={"center"}
        >
          Leather Department
        </Heading>
        <Form id="mainForm" onSubmit={this.changeWorkflowStatus}>
          <FormField
            id="mainFormInput"
            name="assembly"
            label="Assembly Number:"
          />
          <Button icon={<Tools />} type="submit" primary label="Submit" />
        </Form>
        {this.state.sqlSuccess &&(
          <Layer
            position="top"
            modal={false}
            margin={{ vertical: "medium", horizontal: "small" }}
            onEsc={this.onClose}
            responsive={false}
            plain
          >
            <Box
              align="center"
              direction="row"
              gap="small"
              justify="between"
              round="medium"
              elevation="medium"
              pad={{ vertical: "xsmall", horizontal: "small" }}
              margin={{ top: "large" }}
              background="status-ok"
            >
              <Box align="center" direction="row" gap="xsmall">
                <StatusGood size={"36px"} />
                <Text>Assembly {this.state.value} updated successfully.</Text>
              </Box>
              <Button icon={<FormClose />} onClick={this.onClose} plain />
            </Box>
          </Layer>
        )}
        {this.state.sqlFailed &&(
          <Layer
            position="top"
            modal={false}
            margin={{ vertical: "medium", horizontal: "small" }}
            onEsc={this.onClose}
            responsive={false}
            plain
          >
            <Box
              align="center"
              direction="row"
              gap="small"
              justify="between"
              round="medium"
              elevation="medium"
              pad={{ vertical: "xsmall", horizontal: "small" }}
              margin={{ top: "large" }}
              background="status-error"
            >
              <Box align="center" direction="row" gap="xsmall">
                <StatusCritical size={"36px"} />
                <Text>Failed to update Assembly {this.state.value}.  Please try again.  See log for details.</Text>
              </Box>
              <Button icon={<FormClose />} onClick={this.onClose} plain />
            </Box>
          </Layer>
        )}
        <DigitalClock />
        <Anchor alignSelf={"center"}>Click to open log</Anchor>
      </Box>
    );
  }
}

export default LeatherDeptPage;
