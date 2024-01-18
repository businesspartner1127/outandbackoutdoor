import React, { Fragment } from "react"

import ClearIcon from '@material-ui/icons/Clear';
import Data from '../utils/CarouselData.json'
import ModalChild from "./ModalChild"
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme)=> ({
    modalContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        height: '250px',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.57)',
        borderRadius: '8px',
        margin:' 10px 10px 10px 10px',
        padding: '20px 20px 10px 20px',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            height: '180px',
        },
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
        marginBottom: '10px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
        },
    },
    paragraphText: {
        lineHeight: '1.2',
        fontSize: '16px',
        color: '#000',
        wordWrap: 'break-word',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: '13px',
        },
    },
    emailLink: {
        color: '#f00000'
    },
});

function ModalClickElement({item, classes }){
    return (
        <Paper className={classes.container}>
            <div className={classes.titleText}>{item.title}</div>
            <img className={classes.image}src={item.image}/>
        </Paper>
    )
}

function ModalBody({item, classes }){
    return (
        <Fragment>
            {item.text.map((ele, idx) => {
                return <Fragment key={idx}>
                    {ele.title !== null &&
                        <div className={classes.titleText}>{ele.title}</div>
                    }
                    <p className={classes.paragraphText}>
                        {ele.text}
                        {item.title === 'Contact Us'&& 
                            <a 
                                className={classes.emailLink} 
                                href="mailto:info@outandbackoutdoor.com">
                                    info@outandbackoutdoor.com
                            </a>
                        }
                    </p>
                </Fragment>
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
            <div className={classes.modalContainer}>
                {Data['modals'].map( (item, idx) => 
                    <ModalChild 
                        key={idx} 
                        type={'sell-back'}
                        clickElement={
                            <ModalClickElement 
                            item={item} 
                            classes={classes}/>
                        } 
                        modelBody={
                            <ModalBody 
                                item={item} 
                                classes={classes}/>
                        }/> 
                    
                )}
            </div>
        )
    }
}

export default withStyles(styles)(ModalContainer);