import { Theme, withStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core'
import React from 'react';

const styles = (theme) => ({
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
        textAlign: 'center'
    },
    infoText: {
        lineHeight: '1.2',
        fontSize: '20px',
        color: '#262262',
        textAlign: 'center'
    },
    containerQuote: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '405px',
        height: '250px',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.57)',
        borderRadius: '8px',
        margin:' 10px 10px 10px 10px',
        padding: '10px 20px 10px 20px',
        [theme.breakpoints.down('sm')]: {
            width: '250px',
            height: '300px',
        }
    },
    quotationMarkLeft: {
        fontSize: '45px',
        color: '#f00000',
        height: '30px',
        marginBottom: '20px'
    },
    quotationMarkRight: {
        fontSize: '45px',
        color: '#f00000',
        height: '30px',
        textAlign: 'right'
    },
    quoteText: {
        fontSize: '20px',
        color: '#000',
        textAlign: 'center',
    },
    nameAndLocationText: {
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '15px',
        color: '#262262',
        alignSelf: 'center',
    }
});

function Item(props){
    const { item, type, classes}  = props
    
    return (
        type === 'quote' ?
            <Paper className={classes.containerQuote}>
                <div className={classes.quotationMarkLeft}>"</div>
                <div className={classes.quoteText}>{item.text}</div>
                <div className={classes.quotationMarkRight}>"</div>
                <div className={classes.nameAndLocationText}>{item.name} - {item.location}</div>
            </Paper>
            :
            <Paper className={classes.container}>
                <img className={classes.image}src={item.image}/>
                <div className={classes.titleText}>{item.title}</div>
                <div className={classes.infoText}>{item.text}</div>
            </Paper>
    )
}

export default withStyles(styles)(Item);