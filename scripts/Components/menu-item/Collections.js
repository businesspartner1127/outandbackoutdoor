import { MenuItem, Popper, Select, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';

import Autocomplete  from '@material-ui/lab/Autocomplete';
import MobileTabs from './MobileTabs.js'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  collectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '.25px solid #000',
    paddingLeft: '20px',
    width: 200,
  },
  specialCollectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    marginRight: '20px',
  },
  autocompleteWrapCollectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    marginRight: '20px',
    borderLeft: '.25px solid #000',
    paddingLeft: '20px',
    ['@media (max-width:1100px)']: {
      width: '30%',
    },
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '275px',
    width: '100%',
    marginBottom: '10px',
  },
  image: {
    maxWidth: '90%',
    maxHeight: '275px',
    width: 'auto',
    height: 'auto',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  imageContainerSmall: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  imageSmall: {
    maxWidth: '90%',
    maxHeight: '275px',
    width: 'auto',
    height: 'auto',
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
  dropDownImageTextBrand: {
    fontSize: '16px',
    color: '#000',
    textAlign: 'center',
    marginLeft: '40px',
  },
  autocompleteContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  collectionContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '40px',
    borderLeft: '.25px solid #000',
    paddingLeft: '20px',
    width: 200,
  },
  collectionText: {
    fontWeight: 600,
    fontSize: '17px',
    color: '#F00000',
    marginBottom: '6px'
  },
  collectionContainerBrandColumnTwo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '40px',
    width: 200,
  },
  popover: {
    zIndex: 10000,
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#262262 !important",
    color: '#262262'
  },
  mobileContainer: {
    display: 'none',
    ['@media (max-width: 900px)']: {
       display: 'block',
       width: '268px',
    },
  },
}));

function Collections({ data, selectedHandler, selected }) {
  const classes = useStyles();
  
  const filterCollections = [
    'Mountain Leisure',
    'Backcountry Essentials',
  
    'Fall Deals on Winter Gear',
    'Insulated Jackets',
    'New Arrivals',
    'Baselayers',
    "Kids' Jackets",
    'Cabin Cozy Gear',
    'Cozy Up With Low Prices'
  ];

  const filterActivities = [
    'Backcountry',
    'Backcountry Skiing',
    'Backpacking',
    'Camping',
    'Casual',
    'Climbing',
    'Cross-Country Skiing',
    'Cycling',
    'Everyday Wear',
    'Fishing',
    'Fitness',
    'Hiking & Trekking',
    'Hunting',
    'Lounging',
    'Mountain Biking',
    'Mountaineering',
    'Running',
    'Skiing & Snowboarding',
    'Snowshoeing',
    'Swimming',
    'Trail Running',
    'Travel',
    'Yoga',
    'Shop All',
  ];

  const filterBrands = [
    'Alps Mountaineering',
    "Arc'teryx",
    'ASSOS',
    'ATTAQUER',
    'Big Agnes',
    'Black Diamond',
    'Black Sheep Cycling',
    'Burton',
    'Camelbak',
    'Capo',
    'Castelli',
    'Chrome',
    'Columbia',
    'Cotopaxi',
    'Dakine',
    'Deuter',
    'Eagle Creek',
    'Eureka',
    'Exped',
    'Fjallraven',
    'Giro',
    'Granite Gear',
    'Gregory',
    'Helly Hansen',
    'Hyperlite Mountain Gear',
    'Icebreaker',
    'Janport',
    'Kelty',
    'Klymit',
    'Mammut',
    'Marmot',
    'Mountain Equipment',
    'Mountain Hardwear',
    'Mountainsmith',
    'MSR',
    'Mystery Ranch',
    'Nemo',
    'Norrona',
    'Obermeyer',
    'Osprey',
    'Outdoor Research',
    'Pacsafe',
    'Patagonia',
    'Pearl Izumi',
    'POC',
    'Prana',
    'RAB',
    'Rapha',
    'REI Co-Op',
    'Salomon',
    'Sea to Summit',
    'Sierra Designs',
    'Sigr',
    'Smartwool',
    'The North Face',
    'Therm-A-Rest',
    'Thule',
    'Timbuk2',
    'Ultimate Direction',
  ];

  const PopperComponent = (props) => 
    <Popper {...props} style={{zIndex: 10000, width: '275px'}} open={open} transition disablePortal />

  const filterHandler = (filterTitles, array) => {
    let arr = [];
      filterTitles.forEach(filterTitle => {
        array.map(ele => {
          if(ele.title === filterTitle){
  
            arr.push(ele);
          } 
        })
      })
    return arr;
  };

  const collections = filterHandler(filterCollections, data);
  
  const activities = filterHandler(filterActivities, data);

  const brands = filterHandler(filterBrands, data);

  const specialCollection = data.filter(collection => collection.title.split(':')[0] === `collection_special`)

  const brandOne = data.filter(collection => collection.title === `Mountain Hardwear`)

  const brandTwo = data.filter(collection => collection.title === `The North Face`)

  const setValueHandler = (event, value) => {
    location.href = `${value.url.toLowerCase()}`
  }

  const brandColumHandler = (width) => 
    <div className={classes.autocompleteContainer}>
        <Autocomplete
          id="combo-box-demo"
          onChange={(event, newValue) => {
            setValueHandler(event, newValue);
          }}
          PopperComponent={PopperComponent}
          options={brands}
          getOptionLabel={(option) => option.title}
          style={{ 
            marginLeft: '15px',
            maxWidth: '90%',
            width: 'auto', 
            ['@media (maxWidth:1300px)']: {
              marginLeft: '10px',
            },
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Search by Brand" 
              variant="outlined"/>
          )}
        />
      <br/>
      {brandOne.length > 0&&
        <a href={brandOne[0].url}>
          <div className={classes.imageContainerSmall}>
            <img className={classes.imageSmall} src={brandOne[0].image} />
            <div className={classes.dropDownImageText}>{brandOne[0].title}</div>
          </div>
        </a>
      }
      {brandTwo.length > 0&&
        <a href={brandTwo[0].url}>
          <div className={classes.imageContainerSmall}>
            <img className={classes.imageSmall} src={brandTwo[0].image} />
            <div className={classes.dropDownImageText}>{brandTwo[0].title}</div>
          </div>
        </a>
      }
    </div>


const accordionData = [
  {
    title: `Collections`,
    array: collections
  },
  {
    title: `Activities`,
    array: activities
  },
  {
    title: `Brands`,
    array: brandColumHandler('240px'),
  },
];

  return (
    <Fragment>
      <div
        className={classes.dropDownContainer}
        onMouseEnter={() => selectedHandler(selected)}
        onMouseLeave={() => selectedHandler('')}
        >
        {specialCollection.length > 0&&
          <div className={classes.specialCollectionContainer}>
            <a href={specialCollection[0].url}>
              <div className={classes.imageContainer}>
                <img className={classes.image} src={specialCollection[0].image} />
                <div className={classes.dropDownImageText}>{specialCollection[0].title.split(':')[1]}</div>
              </div>
            </a>
          </div>
        }
        <div className={classes.collectionContainer}>
          <div className={classes.collectionText}>Collections</div>
          <ul style={{ listStyleType: 'none' }}>
          {collections.map((ele, idx) => (
              ele.product_count > 0 &&
              <a href={ele.url} key={idx}>
                <li key={idx} style={{ marginBottom: '4px' }}>
                  {ele.title}
                </li>
              </a>
            ))}
          </ul>
        </div>
        <div className={classes.collectionContainer}>
          <div className={classes.collectionText}>Activities</div>
          <ul style={{ listStyleType: 'none' }}>
            {activities.map((ele, idx) => (
              ele.product_count > 0 && activities.length / 2 > idx &&
              <a href={ele.url} key={idx}>
                <li key={idx} style={{ marginBottom: '4px' }}>
                  {ele.title}
                </li>
              </a>
            ))}
          </ul>
        </div>
        <div className={classes.collectionContainer}>
          <div className={classes.collectionText}>More Activities</div>
          <ul style={{ listStyleType: 'none' }}>
            {activities.map((ele, idx) => (
              ele.product_count > 0 && activities.length / 2 < idx &&
              <a href={ele.url} key={idx}>
                <li key={idx} style={{ marginBottom: '4px' }}>
                  {ele.title}
                </li>
              </a>
            ))}
          </ul>
        </div>
        <div 
          className={classes.autocompleteWrapCollectionContainer}>
          {brandColumHandler('275px')}
        </div>
      </div>
      <div className={classes.mobileContainer}>
        <MobileTabs 
          specialCollection={specialCollection} 
          data={accordionData} 
          selected={selected}/>
      </div>
    </Fragment>
  );
}

export default Collections;
