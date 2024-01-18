import React, { Fragment } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  desktopContainer: {
    display: 'flex',
    width: '100%',
    ['@media (max-width:900px)']: {
      display: 'none'
    },
  },
  mobileContainer: {
    display: 'none',
    width: '100%',
    ['@media (max-width:900px)']: {
      display: 'flex',
    },
  },
  appBar:{
    backgroundColor: '#fff',
    borderBottom: '2px solid #dee2e6',
    height: '55px',
    borderTop: '1px solid #dee2e6',
  },
  toolBar:{
    height: '55px',
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    borderBottom: '3px solid transparent',
    padding: '0 15px',
    height: '55px',
    fontSize: '18px',
    color: '#262262',
    ['@media (max-width: 500px)']: {
      fontSize: '13px',
    },
  },
  selectedTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    borderBottom: '3px solid #F00000',
    padding: '0 15px',
    height: '55px',
    fontSize: '18px',
    ['@media (max-width: 500px)']: {
      fontSize: '13px',
    },
  },
  searchButton: {
    color: '#000',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: '120px',
    top: '15px',
    zIndex: '100',
    backgroundColor: 'transparent',
    ['@media (max-width: 768px)']: {
        right: '100px',
    },
    ['@media (max-width: 500px)']: {
        right: '40px',
    },
  },
}));

function Navbar({ selectedHandler, selected, searchMobile, searchMobileHandler }) {
  const classes = useStyles();

  const navItems = [
    "Men's",
    "Women's",
    'Collections',
    'Sell Gear',
  ];

  const desktopNavbar = () => 
    navItems.map((title, idx) => 
      <Typography
        onMouseEnter={() => selectedHandler(title)}
        onMouseLeave={() => selectedHandler('')}
        key={idx}
        variant="h6"
        className={
          title === selected ? classes.selectedTitle : classes.title
        }>
        {title}
      </Typography>
    )
  
    const mobileNavbar = () => 
      navItems.map((title, idx) => 
      <Typography
        onClick={() => selectedHandler(title)}
        onBlur={() => selectedHandler('')}
        key={idx}
        variant="h6"
        className={
            title === selected ? classes.selectedTitle : classes.title
        }>
        {title}
        </Typography>
      )
  

  return (
    <Fragment>
      <div 
        className={classes.appBar}
        position="static">
        <div className={classes.toolBar}>
          <div className={classes.desktopContainer}>
            {desktopNavbar()}
          </div>
          <div className={classes.mobileContainer}>
            {mobileNavbar()}
            <button 
              className={classes.searchButton}
              onClick={()=> searchMobileHandler(!searchMobile)}
              type="submit"
              data-search-form-submit>
                  <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-search" viewBox="0 0 37 40"><path d="M35.6 36l-9.8-9.8c4.1-5.4 3.6-13.2-1.3-18.1-5.4-5.4-14.2-5.4-19.7 0-5.4 5.4-5.4 14.2 0 19.7 2.6 2.6 6.1 4.1 9.8 4.1 3 0 5.9-1 8.3-2.8l9.8 9.8c.4.4.9.6 1.4.6s1-.2 1.4-.6c.9-.9.9-2.1.1-2.9zm-20.9-8.2c-2.6 0-5.1-1-7-2.9-3.9-3.9-3.9-10.1 0-14C9.6 9 12.2 8 14.7 8s5.1 1 7 2.9c3.9 3.9 3.9 10.1 0 14-1.9 1.9-4.4 2.9-7 2.9z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Navbar;
