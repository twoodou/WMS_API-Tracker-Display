import React, { Component } from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  Tabs,
  Tab,
  Calendar,
  Button
} from "grommet";
import { BarMeter } from '../../components/ProgressMeter/BarMeter';

class ShippingTVPage extends Component {
  constructor(props) {
    super(props);
    this.getCurrentData = this.getCurrentData.bind(this);
    this.calcBoxes = this.calcBoxes.bind(this);
    this.clearLoading = this.clearLoading.bind(this);
    this.TodayStatsBox = this.TodayStatsBox.bind(this);
    this.CalendarRange = this.CalendarRange.bind(this);
    this.getRangeData = this.getRangeData.bind(this);
    this.calcRange = this.calcRange.bind(this);
    this.calcRangeData = this.calcRangeData.bind(this);
    this.state = {
      isLoading: true,
      currentData: [],
      totalBoxes: 0,
      totalUPS: 0,
      totalFedEx: 0,
      totalNM: 0,
      timeDisplay: "today",
      range: false,
      beginDate: '',
      endDate: '',
      dates: {},
      progress: 0,
    };
  }

  componentDidMount() {
    this.getCurrentData();
    setInterval(this.getCurrentData, 30000);
  }

  async getCurrentData() {
    console.log("getting data");
    this.setState({ isLoading: true });
    let options = {
      method: "GET"
    };
    await fetch(
      "http://192.168.50.232:5000/shippingdata/" + this.state.timeDisplay,
      options
    )
      .then(res => res.json())
      .then(async data => {
        this.setState({ currentData: data }, this.calcBoxes(data));
      });
  }

  async getRangeData(range) {
    console.log("getting data --range");
    let str = "";
    range.forEach(function(currentValue) {
      str += currentValue.substring(0, 10) + "_";
    });
    let newRangeString = str.substring(0, str.length - 1);
    console.log(newRangeString);
    this.setState({ isLoading: true });
    let options = {
      method: "GET"
    };
    await fetch(
      "http://192.168.50.232:5000/shippingdata/range/" + newRangeString,
      options
    )
      .then(res => res.json())
      .then(async data => {
        console.log(data);
        this.setState(
          {
            currentData: data,
            range: true,
            beginDate: str.split("_")[0],
            endDate: str.split("_")[1]
          },
          this.calcRangeData
        );
      });
  }

  calcBoxes(data) {
    var numBoxes = 0;
    var upsTotal = 0;
    var fedexTotal = 0;
    // var nmTotal = 0;

    for (let i = 0; i < data.length; i++) {
      numBoxes += data[i].PackNumber;
      if (data[i].CarrierPackageID.toString().startsWith("1Z")) {
        upsTotal += data[i].PackNumber;
      } else 
      // (data[i].CarrierPackageID.toString().startsWith("13")) 
      {
        fedexTotal += data[i].PackNumber;
      } 
      // else {
        // nmTotal += data[i].PackNumber;
      // }
    }
    this.setState({
      totalBoxes: numBoxes,
      totalUPS: upsTotal,
      totalFedEx: fedexTotal,
      progress: (numBoxes/200*100),
      // totalNM: nmTotal
    });
    this.clearLoading();
  }

  calcRangeData() {
    console.log(new Date(this.state.endDate).getDay() - new Date(this.state.beginDate).getDay());
    var days = {};
    console.log(new Date(this.state.endDate));
    for(var i in this.state.currentData){
      var tempBox = new Date(this.state.currentData[i].ShipmentDate)
      console.log(tempBox)
      if(days[tempBox]){
        days[tempBox].push(this.state.currentData[i])
      }else{
        days[tempBox] = [];
        days[tempBox].push(this.state.currentData[i])
      }
    }

    this.setState({
      
    })
    console.log(days);
    this.clearLoading();
  }

  calcRange() {
    console.log("calculating ranges");
    return (
      <Box>
        {this.state.currentData.map(i => {
          return (
            <Box direction="row" gap="xxsmall">
              {/* {getIconForTopic(this.props.topic, topicIconStyle)} */}
              <Text
                key={i}
                size={"12px"}
                color={"#E54B4B"}
                style={{ paddingBottom: "8px" }}
              >
                {i.CarrierPackageID}
              </Text>
            </Box>
          );
        })}
      </Box>
    );
  }

  clearLoading() {
    this.setState({ isLoading: false });
    console.log("Clear Loading");
  }

  TodayStatsBox() {
    return (
      <Grid
        rows={["medium", "medium", "small"]}
        columns={["large", "large"]}
        gap="small"
        areas={[
          { name: "total", start: [0, 0], end: [1, 0] },
          { name: "UPS", start: [0, 1], end: [0, 1] },
          { name: "fedEx", start: [1, 1], end: [1, 1] },
          { name: "nm", start: [0, 2], end: [1, 2] }
        ]}
      >
        <Box justify={"center"} gridArea="total" background="light-5">
          <Heading
            style={{ textAlign: "center" }}
            size={"xlarge"}
            level={1}
            alignSelf={"center"}
          >
            Total Boxes Shipped:
            <br />
            <Text color={"blue"} size={"120px"}>
              {this.state.totalBoxes}
            </Text>
          </Heading>
        </Box>
        <Box justify={"center"} gridArea="UPS" background="light-2">
          <Heading
            style={{ textAlign: "center" }}
            size={"xlarge"}
            level={1}
            alignSelf={"center"}
          >
            Total UPS:
            <br />
            <Text color={"blue"} size={"120px"}>
              {this.state.totalUPS}
            </Text>
          </Heading>
        </Box>
        <Box justify={"center"} gridArea="fedEx" background="light-2">
          <Heading
            style={{ textAlign: "center" }}
            size={"xlarge"}
            level={1}
            alignSelf={"center"}
          >
            Total FedEx:
            <br />
            <Text color={"blue"} size={"120px"}>
              {this.state.totalFedEx}
            </Text>
          </Heading>
        </Box>
        <Box fill gridArea="nm" background="light-2">
          <BarMeter percent={this.state.progress}/>
          {/* <Heading
            size={"large"}
            level={2}
            alignSelf={"center"}
            style={{ textAlign: "center" }}
          >
            Total Neiman Marcus:
            <br />
            <Text color={"blue"} size={"80px"}>
              {this.state.totalNM}
            </Text>
          </Heading> */}
        </Box>
      </Grid>
    );
  }

  WeekStatsBox() {
    return (
      <Grid
        rows={["medium", "medium", "small"]}
        columns={["large", "large"]}
        gap="small"
        areas={[
          { name: "total", start: [0, 0], end: [1, 0] },
          { name: "UPS", start: [0, 1], end: [0, 1] },
          { name: "fedEx", start: [1, 1], end: [1, 1] },
          { name: "nm", start: [0, 2], end: [1, 2] }
        ]}
      >
        <Box justify={"center"} gridArea="total" background="light-5">
          <Heading
            style={{ textAlign: "center" }}
            size={"xlarge"}
            level={1}
            alignSelf={"center"}
          >
            Total Boxes Shipped:
            <br />
            <Text color={"blue"} size={"120px"}>
              {this.state.totalBoxes}
            </Text>
          </Heading>
        </Box>
        <Box justify={"center"} gridArea="UPS" background="light-2">
          <Heading
            style={{ textAlign: "center" }}
            size={"xlarge"}
            level={1}
            alignSelf={"center"}
          >
            Total UPS:
            <br />
            <Text color={"blue"} size={"120px"}>
              {this.state.totalUPS}
            </Text>
          </Heading>
        </Box>
        <Box justify={"center"} gridArea="fedEx" background="light-2">
          <Heading
            style={{ textAlign: "center" }}
            size={"xlarge"}
            level={1}
            alignSelf={"center"}
          >
            Total FedEx:
            <br />
            <Text color={"blue"} size={"120px"}>
              {this.state.totalFedEx}
            </Text>
          </Heading>
        </Box>
        <Box justify={"center"} gridArea="nm" background="light-2">
          <Heading
            size={"large"}
            level={2}
            alignSelf={"center"}
            style={{ textAlign: "center" }}
          >
            Total Neiman Marcus:
            <br />
            <Text color={"blue"} size={"80px"}>
              {this.state.totalNM}
            </Text>
          </Heading>
        </Box>
      </Grid>
    );
  }

  CalendarRange() {
    let dateRange;
    return (
      <Box align="center" pad="large">
        <Calendar
          range
          onSelect={date => {
            dateRange = date;
          }}
        />
        <Button
          onClick={() => {
            this.getRangeData(dateRange[0]);
          }}
        />
      </Box>
    );
  }

  render() {
    return (
      <Box>
        <Box>
          <Tabs>
            <Tab title="tab 1">
              <this.TodayStatsBox />
            </Tab>
            <Tab title="tab 2">
              {this.state.range ? (
                <Box>
                  {this.state.currentData.map(i => {
                    return (
                      <Box
                        key={i.CarrierPackageID}
                        direction="row"
                        gap="xxsmall"
                      >
                        {/* {getIconForTopic(this.props.topic, topicIconStyle)} */}
                        <Text
                          size={"12px"}
                          color={"#E54B4B"}
                          style={{ paddingBottom: "8px" }}
                        >
                          {i.CarrierPackageID}
                        </Text>
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <this.CalendarRange />
              )}
            </Tab>
          </Tabs>
          {/* <Anchor href={navigationService.getPageHref('')}/> */}
        </Box>
      </Box>
    );
  }
}

export default ShippingTVPage;
