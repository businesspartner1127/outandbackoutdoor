import React, { Fragment } from 'react';

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
  specialCollectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    marginRight: '20px',
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  dropDownImageText: {
    fontSize: '16px',
    color: '#000',
    ['@media (max-width:900px)']: {
      marginBottom: '8px',
   },
  },
  collectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '40px',
    borderLeft: '.25px solid #000',
    paddingLeft: '20px',
    width: 200,
  },
  collectionContainerPromotional: {
    width: '200px',
    height: '100%',
    display: 'flex',
    padding: '0 20px',
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    border: '1px solid #dee2e6'
  },
  collectionText: {
    fontWeight: 600,
    fontSize: '17px',
    color: '#F00000',
    marginBottom: '6px'
  },
  collectionTextPromotional: {
    fontWeight: 600,
    fontSize: '20px',
    color: '#F00000',
    marginBottom: '6px',
    textAlign: 'center'
  },
  collectionTextRight: {
    fontFamily: 'Uniform-Light, sans-serif',
    marginBottom: '8px',
    fontSize: '18px',
    color: '#262262',
    borderBottom: '1px solid #F00000',
    textAlign: 'center',
    "&:hover": {
      backgroundColor: '#f00000',
      color: '#fff',
      borderRadius: '3px',
    }
  },

  mobileContainer: {
    display: 'none',
    ['@media (max-width:900px)']: {
       display: 'block',
       width: '268px',
    },
  },
}));

function Paper({ 
  type, 
  data, 
  filterTitles, 
  promotionalFilter, 
  selectedHandler, 
  selected
}) {
  const classes = useStyles();
  
  const filterCategory = (type) => {
    let arr = []
    for (const element of data) {
      for (const tags of element.tags) {
        if(tags === type ){
          arr.push(element)
        }
      }
    }
    return arr
  };

  const tagFilterHandler = (tag, omittedTags, array) => {
    let arr = [];
    array.map(ele => {
      var count = 0;
      var check = false;
      ele.tags.map((tags, idx) => {
        omittedTags.forEach(omittedTag => {
          if(tags === omittedTag){
            count++;
          } 
        })
        if(tags === tag) {
          check = true;
        } 
        if(ele.tags.length === idx + 1 && count === 0 && check){
          arr.push(ele)
        }
      })
    })
    return arr;
  };

  const accessoriesTagFilterHandler = (filterTitles, array) => {
    let arr = [];
      filterTitles.forEach(filterTitle => {
        array.map(ele => {
          if(ele.title === filterTitle || ele.title === filterTitle.replace('$','')){
            if(ele.title.includes('-')){
              arr.push({...ele, title: ele.title.split('-')[0]})
            } else {
              arr.push(ele);
            }
          } 
        })
      })
    return arr;
  };

  const activitiesTagFilterHandler = (filterTitles, array) => {
    let arr = [];
      filterTitles.forEach(filterTitle => {
        array.map(ele => {
          if(ele.title === `${type} ${filterTitle}`){
              arr.push(ele);
          } 
        })
      })
    return arr.sort((a, b) => a.title.localeCompare(b.title));
  };

  const campingAccessories = [
    'Backpacks',
    'Sleeping Bags',
    'Tents and Shelters',
  ]

  const tops = tagFilterHandler('Tops', ['Accessories', 'Bottoms'], filterCategory(type).filter(collection => collection.title.split(' ')[0] === type));
  
  const bottoms = tagFilterHandler('Bottoms', ['Accessories', 'Tops'], filterCategory(type).filter(collection => collection.title.split(' ')[0] === type));

  const accessories = activitiesTagFilterHandler(filterTitles, data);
  
  const accessoriesCamping = accessoriesTagFilterHandler(campingAccessories, data);

  const promotional = accessoriesTagFilterHandler(promotionalFilter, data);
  
  const specialCollection = data.filter(collection => collection.title.split(':')[0] === `${type}_special`)
  
  const accordionData = [
    {
      title: `${type} Tops`,
      array: tops
    },
    {
      title: `${type} Bottoms`,
      array: bottoms
    },
    {
      title: `Activities`,
      array: accessories,
      subArrayTitle: `Gear`,
      subArray: accessoriesCamping
    },
    {
      title: `FEATURED`,
      array: promotional
    }
  ];


  const listHandler = (arr, header) => 
    <div className={classes.collectionContainer}>
      <div className={classes.collectionText}>{header}</div>
      <ul style={{ listStyleType: 'none' }}>
        {arr.map((ele, idx) => (
          ele.product_count > 0 &&
          <a key={idx} href={ele.url}>
            <li style={{ marginBottom: '4px' }}>
              {ele.title.split(' ')[1]}&nbsp;{ele.title.split(' ')[2]}
            </li>
          </a>
        ))}
      </ul>
    </div>
  
  return (
    <Fragment>
      <div
        className={classes.dropDownContainer}
        onMouseEnter={() => selectedHandler(selected)}
        onMouseLeave={() => selectedHandler('')}
        >
        <div className={classes.specialCollectionContainer}>
          <a href={specialCollection[0].url}>
            <div className={classes.imageContainer}>
              <img className={classes.image} src={specialCollection[0].image} />
              <div className={classes.dropDownImageText}>{specialCollection[0].title.split(':')[1]}</div>
            </div>
          </a>
        </div>
        {listHandler(tops, `${type} Tops`)}
        {listHandler(bottoms, `${type} Bottoms`)}
        <div className={classes.collectionContainer}>
          <div className={classes.collectionText}>Activities</div>
          <ul style={{ listStyleType: 'none' }}>
            {accessories.map((ele, idx) => (
              ele.product_count > 0 && ele.title !== type &&
              <a key={idx} href={ele.url}>
                <li style={{ marginBottom: '4px' }}>
                  {ele.title.replace(type, "")}
                </li>
              </a>
            ))}
          </ul>
          <div className={classes.collectionText} style={{marginTop: '2px'}}>Gear</div>
          <ul style={{ listStyleType: 'none' }}>
            {accessoriesCamping.map((ele, idx) => (
              ele.product_count > 0 && ele.title !== type &&
              <a key={idx} href={ele.url}>
                <li style={{ marginBottom: '4px' }}>
                  {ele.title}
                </li>
              </a>
            ))}
          </ul>
        </div>
        <div className={classes.collectionContainer}>
          <div className={classes.collectionContainerPromotional}>
            <div className={classes.collectionTextPromotional}>FEATURED</div>
            {promotional.map((ele, idx) => (
              ele.product_count > 0 &&
              <a key={idx} href={ele.url}>
                <div className={classes.collectionTextRight}>{ele.title}</div>
              </a>
            ))}
          </div>
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

export default Paper;
