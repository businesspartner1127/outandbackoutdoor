import React, { Fragment } from 'react';

import { Box } from '@material-ui/core';
import Tabs from './Tabs'
import { makeStyles } from '@material-ui/core/styles';

function TestMobileBox({ 
  collections,
  selectedHandler, 
  selected
}) {
    
  return (
    <Fragment>
        <Box
          sx={{ width: '100%', height: '100%' }}
          role="presentation"
        > 
            <Tabs selected={selected} selectedHandler={selectedHandler} collections={collections}/>
        </Box>
    </Fragment>
  );
}

export default TestMobileBox;
