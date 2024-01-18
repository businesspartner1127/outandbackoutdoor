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
        alignItems: 'center'
    },
    titleText: {
        lineHeight: '1.2',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#f00000',
        wordWrap: 'break-word',
        margin: '0 5px 10px 0',
        [theme.breakpoints.down('xs')]: {
            fontSize: '13px',
            margin: '5px 0 5px 0',
        },
    },
    paragraphText: {
        lineHeight: '1.2',
        fontSize: '16px',
        color: '#000',
        wordWrap: 'break-word',
        [theme.breakpoints.down('xs')]: {
            fontSize: '10px',
        },
    },
    bodyContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column', 
        },
    },
    infoIcon: {
        display: 'flex',
        margin: '-8px 0 0 0',
        color: 'rgb(216, 216, 216)',
        padding: '5px 5px 5px 0',
        cursor: 'pointer',
        fontSize: '20px'
    }
});

function ModalClickElement({ classes }){
    return (
        <Fragment>
            <div className={classes.infoIcon}><InfoIcon/></div>
        </Fragment>
    )
}

function ModalBody({ classes }){
    return (
        <Fragment>
            {Data['conditionModals'].map((ele, idx) => {
                return <div key={idx} className={classes.bodyContainer}>
                    <div className={classes.titleText}>{ele.title}</div>
                    <p className={classes.paragraphText}>
                        {ele.text}
                    </p>
                </div>
            })}
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