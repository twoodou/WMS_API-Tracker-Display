import React from 'react';

import { Box, Meter } from 'grommet';

export const BarMeter = (value) => {
//   const value = 30;
const test = value.percent;

  return (
      <Box onClick={()=>console.log(test)} pad="none">
        {/* <Meter width={'100%'} height={'100%'} type="bar" background="#00FF00" values={[{ value:test }]} /> */}
        <Meter width={'100%'} height={'100%'} type="bar" values={[{ value:test, color: test > 50 ? 'accent-1' : 'accent-4' }]} />
      </Box>
  );
};

