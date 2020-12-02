import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Grommet, ResponsiveContext } from "grommet";
import { Routes } from "./pages";

const theme = {
  global: {
    colors: {
      brand: "#228BE6"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

const App = () => {
  // const [sidebar, showSidebar] = useState(false);

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            {/* <AppBar>
              <Heading level="3" margin="none">
              <Anchor color="white" href="#" primary label="JHD Shipping" />
              </Heading>
            </AppBar> */}
            <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
              <Box
                flex
                align="center"
                justify="evenly"
                width="full"
              >
                <Router>
                  <Routes />
                </Router>
              </Box>
              )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
