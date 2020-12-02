import React from 'react';
import { Box, Text, Anchor } from 'grommet';
import { CircleQuestion } from 'grommet-icons';
import { navigationService } from '../../services';

export const NotFoundPage = () => {
  return (
      <Box alignSelf={'center'} align={'center'} direction={'column'}>
        <CircleQuestion color={'brand'} size={'xlarge'} />
        <Box pad={'large'}>
          <Text size={'large'}>
            Page not found.{' '}
            <Anchor href={navigationService.getPageHref('dashboard')}>
              Return to home page
            </Anchor>
          </Text>
        </Box>
      </Box>
  );
};
