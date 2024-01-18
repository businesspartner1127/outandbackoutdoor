import { Accordion, AccordionDetails, AccordionSummary, Box } from '@material-ui/core';
import React, { Fragment } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '200px',
    height: '200px',
    margin: '150px 20px 10px 20px',
    borderRadius: '5px',
  },
  dropDownImageText: {
    fontSize: '16px',
    color: '#000',
    marginBottom: '8px',
  },
  collectionText: {
    fontWeight: 600,
    fontSize: '17px',
    color: '#F00000',
    marginBottom: '6px',
  },
  collectionTextSellback: {
    fontWeight: 600,
    fontSize: '17px',
    color: '#000',
    marginBottom: '6px',
    textAlign: 'center',
    padding: '0px 20px',
    marginTop: '20px'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    width: '220px',
    height: '250px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.57)',
    borderRadius: '8px',
    margin:' 10px 10px 10px 10px',
    padding: '20px 20px 10px 20px'
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
  imageSellback: {
    width: '120px',
    height: '120px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  titleText: {
    lineHeight: '1.2',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#f00000',
    wordWrap: 'break-word',
    textAlign: 'center'
  },
  sellbackButtonWrap: {
    margin: '20px 0'
  }
}));

function MobileTabs({ 
  specialCollection,
  data, 
  selected
}) {
    
  const classes = useStyles();

  const specialCollectionHandler = () =>
    <a style={{marginTop: '125px'}} href={specialCollection[0].url}>
        <div className={classes.imageContainer}>
            <img className={classes.image} src={specialCollection[0].image} />
            <div className={classes.dropDownImageText}>{specialCollection[0].title.split(':')[1]}</div>
        </div>
    </a>

  const accordion = (title, body) =>
    <Accordion key={title}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <div className={classes.collectionText}>{title}</div>
        </AccordionSummary>
        <AccordionDetails>
            {body}
        </AccordionDetails>
    </Accordion>
  
  const list = (title, arr) => {
    return title.split(' ')[1] === 'Tops' || title.split(' ')[1] === 'Bottoms' ?
      <ul style={{ listStyleType: 'none', marginTop: '-10px' }}>
          {arr.map((ele, idx) => (
              ele.product_count > 0 &&
              <a key={idx} href={ele.url}>
                  <li style={{ marginBottom: '4px' }}>
                      {ele.title.split(' ')[1]}&nbsp;{ele.title.split(' ')[2]}
                  </li>
              </a>
          ))}
      </ul>
      :
      <ul style={{ listStyleType: 'none', marginTop: '-10px' }}>
        {arr.map((ele, idx) => (
            ele.product_count > 0 &&
            <a key={idx} href={ele.url}>
                <li style={{ marginBottom: '4px' }}>
                    {ele.title}
                </li>
            </a>
        ))}
      </ul>
   }

const paperListHandler = (data) => 
    data.map((ele, idx) =>
        ele.title === 'Activities'?
        accordion(
            ele.title, 
            <div key={idx} style={{display: 'flex', flexDirection: 'column'}}>
                <ul style={{ listStyleType: 'none', marginTop: '-10px' }}>
                    {ele.array.map((ele, idx) => (
                    ele.product_count > 0 && ele.title !== selected &&
                    <a key={idx} href={ele.url}>
                        <li key={idx} style={{ marginBottom: '4px' }}>
                          {ele.title.replace(selected, "")}
                        </li>
                    </a>
                    ))}
                </ul>
            <div key={idx} className={classes.collectionText} style={{marginTop: '2px'}}>{ele.subArrayTitle}</div>
                <ul style={{ listStyleType: 'none'}}>
                    {ele.subArray.map((ele, idx) => (
                    ele.product_count > 0 && ele.title !== selected &&
                    <a key={idx} href={ele.url}>
                        <li key={idx} style={{ marginBottom: '4px' }}>
                        {ele.title}
                        </li>
                    </a>
                    ))}
                </ul>
            </div>
        )
        :
        accordion(ele.title, list(ele.title, ele.array))
    )
    
const collectionListHandler = (data) => 
    data.map((ele, idx) =>
        ele.title === 'Brands'?
            accordion(ele.title, ele.array)
        :
        accordion(
            ele.title, 
            <ul key={idx} style={{ listStyleType: 'none', marginTop: '-10px' }}>
                {ele.array.map((ele, idx) => (
                    <a href={ele.url} key={idx}>
                        <li key={idx} style={{ marginBottom: '4px' }}>
                        {ele.title}
                        </li>
                    </a>
                ))}
            </ul>
        )
    )

const sellBackHandler = () => 
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Paper className={classes.container}>
        <div className={classes.step}>1</div>
        <img className={classes.imageSellback}src="https://cdn.shopify.com/s/files/1/0412/7840/6813/files/questions.png?v=1628717532"/>
        <div className={classes.titleText}>Tell us about your gear</div>
    </Paper>

    <Paper className={classes.container}>
        <div className={classes.step}>2</div>
        <img className={classes.imageSellback}src="https://cdn.shopify.com/s/files/1/0412/7840/6813/files/offer.png?v=1628717423"/>
        <div className={classes.titleText}>Accept an instant offer</div>
    </Paper>

    <Paper className={classes.container}>
        <div className={classes.step}>3</div>
        <img className={classes.imageSellback}src="https://cdn.shopify.com/s/files/1/0412/7840/6813/files/paid.png?v=1628717479"/>
        <div className={classes.titleText}>Ship your gear and get paid</div>
    </Paper>
    <div className={classes.collectionTextSellback}>
    Selling your unwanted gear has never been easier. A few minutes and you’ll be on your way to earning cash. Wait no more, get started today!
    </div>
    <a className={classes.sellbackButtonWrap} target={'blank'} href={'https://sellback.outandbackoutdoor.com/'}>
        <div 
        style={{
            backgroundColor: '#f00000', 
            textAlign: 'center',
            borderRadius: '5px',
            padding: '10px 40px',
            width: '200px',
            color: '#fff'
        }} 
        className={classes.button}><b>Sell Today!</b>
        </div>
    </a>
  </div>  
  
  const accordionPaperHandler = () => {
    return(
      <Fragment>
          {specialCollectionHandler()}
          {paperListHandler(data)}
      </Fragment>
    )
  }

  const accordionCollectionHandler = () => {
    return(
      <Fragment>
          {specialCollectionHandler()}
          {collectionListHandler(data)}
      </Fragment>
    )
  }

  const accordionSellBackHandler = () => 
    sellBackHandler(data)
    
  return (
    <Fragment>
      {selected === "Men's"&& 
          accordionPaperHandler()
      }
      {selected === "Women's"&& 
          accordionPaperHandler()
      }
      {selected === "Kids'"&& 
          accordionPaperHandler()
      }
      {selected === 'Collections'&& 
          accordionCollectionHandler()
      }
      {selected === 'Sell Gear'&& 
          accordionSellBackHandler()
      }
    </Fragment>
  );
}

export default MobileTabs;
