import React from "react";
import { navigationService } from "../../services/navigation.js";
import { Box, Text, Anchor, Heading } from "grommet";

const DashboardPage = () => {
  // const [redirect, setRedirect] = React.useState('');
  return (
    <Box>
      <Heading
        style={{ textAlign: "center" }}
        size={"large"}
        level={3}
        alignSelf={"center"}
      >
        Production Workflow Pages
      </Heading>
      <Text size={"large"} textAlign={'center'}>
        <Anchor
          href={navigationService.getPageHref("leather-workflow")}
          label={"Leather Workflow Page"}
        />
        <br />
        <Anchor
          href={navigationService.getPageHref("sewing-workflow")}
          label={"Sewing Workflow Page"}
        />
        <br />
      </Text>
      <Heading
        style={{ textAlign: "center" }}
        size={"large"}
        level={3}
        alignSelf={"center"}
      >
        Sales Order Workflow Pages
      </Heading>
      <Text size={"large"} textAlign={'center'}>
        <Anchor
          href={navigationService.getPageHref("hot-stamp")}
          label={"Hot Stamp Scanner Page"}
        />
        <br />
        <Anchor
          href={navigationService.getPageHref("inspect")}
          label={"Inspection Scanner Page"}
        />
        <br />
      </Text>
      <Heading
        style={{ textAlign: "center" }}
        size={"large"}
        level={3}
        alignSelf={"center"}
      >
        Misc. Apps
      </Heading>
      <Text size={"large"} textAlign={'center'}>
        <Anchor
          href={navigationService.getPageHref("shipping-metrics")}
          label={"Shipping Metrics Page"}
        />
        <br />
        <Anchor
          href={navigationService.getPageHref("pick-control")}
          label={"JH Products Page"}
        />
        <br />
      </Text>
    </Box>
  );
};

export default DashboardPage;
