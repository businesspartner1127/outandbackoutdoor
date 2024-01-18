import {
    Backdrop,
    Modal
} from '@material-ui/core';
import React, { Fragment } from "react"
import { Theme, withStyles } from '@material-ui/core/styles';

import ClearIcon from '@material-ui/icons/Clear';

const styles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'scroll',
    },
    toggle:{
        width: '15%',
        [theme.breakpoints.down('md')]: {
            width: '20%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '25%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '40%',
        },
    },
    paper: {
        position: 'absolute',
        width: '70%',
        backgroundColor: '#fff',
        border: '1px solid #000',
        boxShadow: '0px 0px 16px 5px rgba(0,0,0,0.72)',
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    conditionPaper: {
        position: 'absolute',
        width: 'auto',
        backgroundColor: '#fff',
        border: '1px solid #000',
        boxShadow: '0px 0px 16px 5px rgba(0,0,0,0.72)',
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    clear: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '15px',
        color: '#000',
        padding: '10px',
        cursor: 'pointer',
    }
});

class ModalChild extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: false
        }
        this.props
        this.toggleHandler = this.toggleHandler.bind(this);
    }
    
    toggleHandler() {
        const { toggle } = this.state;
        this.setState({ toggle: !toggle})
    }
    
    render(){
        const { toggle } = this.state;
        const { clickElement, modelBody, type, classes } = this.props;
        return (
            <Fragment> 
                <div className={type === 'event' ? classes.event : classes.toggle} onClick={this.toggleHandler}>
                    {clickElement}
                </div>
                <Modal
                    className={classes.modal}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={toggle}
                    onClose={this.toggleHandler}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >   
                    <div className={type === 'condition' ? classes.conditionPaper : classes.paper}>
                        <div className={classes.clear}><ClearIcon onClick={this.toggleHandler}/></div>
                        {modelBody}
                    </div>
                </Modal>
            </Fragment>
        )
        
    }
}

export default withStyles(styles)(ModalChild);