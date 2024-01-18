import React, { Fragment } from "react"

import Data from '../utils/CarouselData.json'
import InfoIcon from '@material-ui/icons/Info';
import ModalChild from "./ModalChild"
import { withStyles } from '@material-ui/core/styles';

const styles = (theme)=> ({
    modalContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        lineHeight: '1.2',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#f00000',
        wordWrap: 'break-word',
        margin: '0 5px 10px 0',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: '15px',
        },
    },
    paragraphText: {
        lineHeight: '1.2',
        fontSize: '16px',
        color: '#000',
        wordWrap: 'break-word',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: '11px',
        },
    },
    bodyContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    infoIcon: {
        width: '100%',
        color: '#000',
        right: '140px',
        cursor: 'pointer',
        margin: '10px 0 0 0',
        display: 'flex',
        fontSize: '20px',
        marginTop: '60px',
        left: '50%',
        transform: 'translate(-24%,0)',
        position: 'absolute',
        textDecoration: 'underline',
        ['@media (max-width: 1199px)']: {
            transform: 'translate(-28%,0)',
        },
        ['@media (max-width: 991px)']: {
            transform: 'translate(-39%,0)',
        },
        ['@media (max-width: 924px)']: {
            transform: 'translate(-20%,0)',
        },
        ['@media (max-width: 767px)']: {
            transform: 'translate(-26%,0)',
        },
        ['@media (max-width: 520px)']: {
            transform: 'translate(-31%,0)',
        },
        ['@media (max-width: 400px)']: {
            transform: 'translate(-36%,0)',
        },
        ['@media (max-width: 330px)']: {
            transform: 'translate(-44%,0)',
        },
    }
});

function ModalClickElement({ classes }){
    return (
        <Fragment>
            <div className={classes.infoIcon}><a>Free Shipping and Free Returns*</a></div>
        </Fragment>
    )
}

function ModalBody({ classes }){
    return (
        <Fragment>
            <div className={classes.bodyContainer}>
                <div className={classes.titleText}>
                    Out&amp;Back makes life easy for you.
                </div>
                <p className={classes.paragraphText}>
                    That’s why we offer free shipping on all orders! 
                </p>
                <p className={classes.paragraphText}>
                    And if by chance you don’t completely love your gear, we also 
                    offer free 30-day returns*.
                </p>
                <p className={classes.paragraphText}>
                *Gear must be returned in the same condition as it was received and may not have 
                sustained significant new damage or wear-and-tear.
                </p>
                <p className={classes.paragraphText}>
                For more details, checkout our return policy (or FAQs). 
                </p>
            </div>
        </Fragment>
    )
}

class ModalContainer extends React.Component {
    constructor(props) {
        super(props)
        this.props
    }

    render(){
        const { classes } = this.props;
        return (
            <Fragment> 
                <div className={classes.modalContainer}>
                    <ModalChild 
                        type={'condition'}
                        clickElement={
                            <ModalClickElement 
                            classes={classes}/>
                        } 
                        modelBody={
                            <ModalBody 
                                classes={classes}/>
                        }/>         
                </div>
            </Fragment>
        )
    }
}

export default withStyles(styles)(ModalContainer);