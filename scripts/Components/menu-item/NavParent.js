import React, { Fragment, useState } from 'react';

import { Drawer } from '@material-ui/core';
import Navbar from './Navbar';
import Search from './search/SearchField'
import TestMobileBox from './TestMobileBox'
import { makeStyles } from '@material-ui/core/styles';
import useWindowSize from './UseWindowSize';

const useStyles = makeStyles((theme) => ({
  SearchDisplayContainer: {
    display: 'flex', 
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    padding: '10px 0'
  },
  SearchBlockContainer: {
    display: 'none', 
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    padding: '10px 0'
  }
}));

function NavParent({ collections }) {
  const classes = useStyles();
  const size = useWindowSize();
  const [selected, selectedHandler] = useState('');
  const [searchMobile, searchMobileHandler] = useState('');
  
  return (
    <Fragment>
      <Navbar selectedHandler={selectedHandler} selected={selected} searchMobile={searchMobile} searchMobileHandler={searchMobileHandler}/>
      <div className={searchMobile ? classes.SearchDisplayContainer : classes.SearchBlockContainer}>
          <Search/>
      </div>
      <Drawer
          anchor={size.width > 900 ? 'top' : 'right'}
          open={selected !== ''}
          onClose={()=> selectedHandler('')}
        >
          <TestMobileBox selected={selected} selectedHandler={selectedHandler} collections={collections}/> 
      </Drawer>
    </Fragment>
  );
}

export default NavParent;
