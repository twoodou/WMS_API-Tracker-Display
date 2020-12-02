import React from "react";

import { Box, Clock } from "grommet";

const DigitalClock = () => (
  
    <Box align="center" justify="start" pad="large" margin={'large'}>
      <Clock type="digital" hourLimit={'12'} />
    </Box>
);

export default DigitalClock;