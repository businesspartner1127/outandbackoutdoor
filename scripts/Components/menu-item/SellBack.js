import React, { Fragment } from 'react';

import MobileTabs from './MobileTabs.js'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    width: '225px',
    height: '350px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.57)',
    borderRadius: '8px',
    margin:' 10px 10px 10px 10px',
    padding: '20px 20px 10px 20px'
  },
  image: {
      width: '150px'
  },
  titleText: {
      lineHeight: '1.2',
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#f00000',
      wordWrap: 'break-word',
      textAlign: 'center',
      ['@media (max-width:1150px)']: {
        fontSize: '25px',
      },
  },
  infoText: {
      lineHeight: '1.2',
      fontSize: '20px',
      color: '#262262',
      textAlign: 'center'
  },
  dropDownContainer: {
    display: 'flex',
    backgroundColor: '#f7f7f7',
    marginTop: '130px',
    width: '100%',
    padding: ' 40px 20px',
    ['@media (max-width:900px)']: {
      display: 'none'
    },
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '180px',
    height: '180px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  dropDownImageText: {
    fontSize: '16px',
    color: '#000',
  },
  collectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '350px',
    marginLeft: '20px',
    borderLeft: '.25px solid #000',
    paddingLeft: '20px'
  },
  collectionContainerBrandColumnTwo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '40px',
    width: 200,
  },
  collectionText: {
    marginLeft: 40,
    fontWeight: 600,
    fontSize: '17px',
    color: '#000',
  },
  step: {
    backgroundColor: '#262262',
    height: '40px',
    width: '40px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '27px',
    color: '#fff',
    marginBottom: '5px'
  },
  mobileContainer: {
    display: 'none',
    ['@media (max-width:900px)']: {
       display: 'block',
       width: '268px',
       marginTop: '140px'
    },
  },
}));

function SellBack({ selectedHandler, selected }) {
  const classes = useStyles();

  const steps = ['Instant offers', 'Fast payouts', 'Free shipping'];

  return (
    <Fragment>
      <div
        className={classes.dropDownContainer}
        onMouseEnter={() => selectedHandler(selected)}
        onMouseLeave={() => selectedHandler('')}>
          
          <Paper className={classes.container}>
            <div className={classes.step}>1</div>
            <img className={classes.image}src="https://cdn.shopify.com/s/files/1/0412/7840/6813/files/questions.png?v=1628717532"/>
            <div className={classes.titleText}>Tell us about your gear</div>
          </Paper>
        
          <Paper className={classes.container}>
            <div className={classes.step}>2</div>
            <img className={classes.image}src="https://cdn.shopify.com/s/files/1/0412/7840/6813/files/offer.png?v=1628717423"/>
            <div className={classes.titleText}>Accept an instant offer</div>
          </Paper>
        
          <Paper className={classes.container}>
            <div className={classes.step}>3</div>
            <img className={classes.image}src="https://cdn.shopify.com/s/files/1/0412/7840/6813/files/paid.png?v=1628717479"/>
            <div className={classes.titleText}>Ship your gear and get paid</div>
          </Paper>
          
          <div className={classes.collectionContainer}>
            <div className={classes.collectionText}>
              Selling your unwanted gear has never been easier. A few minutes and you’ll be on your way to earning cash. Wait no more, get started today!
            </div>
            <br />
            <a target={'blank'} href={'https://sellback.outandbackoutdoor.com/'}>
              <div 
                style={{
                    backgroundColor: '#f00000', 
                    textAlign: 'center',
                    marginLeft: '40px',
                    borderRadius: '5px',
                    padding: '10px 40px',
                    width: '200px',
                    color: '#fff'
                }} 
                className={classes.button}><b>Sell Today!</b>
              </div>
            </a>
          </div>
      </div>
      <div className={classes.mobileContainer}>
        <MobileTabs 
          specialCollection={null} 
          data={null} 
          selected={selected}/>
      </div>
    </Fragment>
  );
}

export default SellBack;
