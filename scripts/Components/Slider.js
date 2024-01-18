import React, { Fragment } from 'react';

import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'
import Data from '../utils/CarouselData.json'
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    container: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

class Slider extends React.Component {
    
    carouselHandler(type) {
        return(
            Data[type].map( (item, idx) => 
                <CarouselItem key={idx} item={item} type={type}/>
            )            
        )
    }
    
    render(){
        const { type, classes } = this.props
        return (
            <Fragment>
                {screen.width < 600 || type === 'quote'? 
                    <Carousel 
                        swipe={true}
                        navButtonsAlwaysInvisible={true}>
                        {this.carouselHandler(type)}
                    </Carousel>
                : 
                    <div className={classes.container}>
                        {this.carouselHandler(type)}
                    </div>
                }
            </Fragment>
        )
    }
}

export default withStyles(styles)(Slider);