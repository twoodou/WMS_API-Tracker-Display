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
import { Tools, StatusGood, FormClose } from "grommet-icons";
import DigitalClock from '../../components/Clock/Clock.js';

class SewingDeptPage extends Component {
  constructor(props) {
    super(props);
    this.changeWorkflowStatus = this.changeWorkflowStatus.bind(this);
    this.onClose = this.onClose.bind(this);
    this.clearLoading = this.clearLoading.bind(this);
    this.resetForm = this.resetForm.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: "test",
      open: false,
      currentAssy: 0
    };
  }

  async changeWorkflowStatus(event) {
    event.preventDefault();
    console.log(event.value.assembly);
    this.setState({ isLoading: true });
    // let url = "http://192.168.50.232:5000/workflow-sewing/" + event.value.assembly;
    let url = 'http://192.168.50.232:5000/workflow/4insideSewing/' + event.value.assembly;

    const request = new Request(url, { method: "PATCH", body: event.value });

    await fetch(request)
      // .then(res => res.json())
      .then(async res => {
        console.log('Server Response: ');
        console.log(res);
        console.log('END Server Response ');
        console.log(event.value);
        this.setState(
          {
            open: true,
            value: event.value.assembly
          },
          this.resetForm
        );
      });
  }

  resetForm() {
    setTimeout(() => {
      this.setState({ open: false });
      document.getElementById("mainForm").reset();
    document.getElementById("mainFormInput").focus();
    }, 2000);
  }

  clearLoading() {
    this.setState({ isLoading: false });
    console.log("Clear Loading");
  }

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false });
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
          Sewing Department
        </Heading>
        <Form id="mainForm" onSubmit={this.changeWorkflowStatus}>
          <FormField
            id="mainFormInput"
            name="assembly"
            label="Assembly Number:"
          />
          <Button icon={<Tools />} type="submit" primary label="Submit" />
        </Form>
        {this.state.open && (
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
          // ):(
          //   <Layer
          //     position="top"
          //     modal={false}
          //     margin={{ vertical: "medium", horizontal: "small" }}
          //     onEsc={this.onClose}
          //     responsive={false}
          //     plain
          //   >
          //     <Box
          //       align="center"
          //       direction="row"
          //       gap="small"
          //       justify="between"
          //       round="medium"
          //       elevation="medium"
          //       pad={{ vertical: "xsmall", horizontal: "small" }}
          //       margin={{top: 'large'}}
          //       background="status-danger"
          //     >
          //       <Box align="center" direction="row" gap="xsmall">
          //         <StatusGood size={'36px'} />
          //   <Text>Ready to Scan</Text>
          //       </Box>
          //       <Button icon={<FormClose />} onClick={this.onClose} plain />
          //     </Box>
          //   </Layer>
          // )
        )}
        <DigitalClock />
        <Anchor alignSelf={"center"}>Click to open log</Anchor>
      </Box>
    );
  }
}

export default SewingDeptPage;
