import React, { Fragment } from "react"

import ModalChild from "./ModalChild"
import { withStyles } from '@material-ui/core/styles';

const styles = (theme)=> ({
    titleText: {
        fontSize: '16px',
        color: '#f00000',
        cursor: 'pointer',
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
    }
});

function ModalClickElement({ classes }){
    return (<div className={classes.titleText}>Terms and Conditions</div>)
}

function ModalBody({ classes }){
    return (
        <Fragment>
            <div className={classes.titleText}>Gift Card Raffle Terms and Conditions</div>
                <ol>
                    <li>Entry to the Raffle is available only to persons over the age of 18. You may be asked, at any stage, to provide Out&amp;Back Outdoor with proof of age and /or identity.</li>
                    <li>Employees and relatives of employees of Out&amp;Back Outdoor and any entities affiliated or related to Out&amp;Back Outdoor shall not be eligible to enter the Raffle. For the purposes herein, the term "relative" shall mean spouse, partner, parent, child or sibling</li>
                    <li>The Raffle drawing shall take place within 24 hours after the Beer For Gear event on October 14, 2021.</li>
                    <li>The Promotional Period shall run from September 24 to Oct 14, 2021</li>
                    <li>Each entrant shall be entitled to make moltiple entries throughout the Promotional Period by selling used outdoor gear on the Out&amp;Back Outdoor website with additional entries on site at the event. Entry into the Raffle is free. In the event that Out&amp;Back Outdoor deems an entrant to have in any way acted in bad faith with respect to the Promotion, such entrant shall be excluded from the Raffle and consequently deemed ineligible to win the Prize, as defined below.</li>
                    <li>In order to enter the Raffle each entrant shall submit their legal name, first name, last name, email address and phone number.</li>
                    <li>The Prize for winning the Raffle shall be one $100 gift card to Chipotle.</li>
                    <li>Winner specifically acknowledges that winner shall be responsible for the payment of all tax, title fees, license fees, insurance requirements and other charges as may be required under any law, ordinance, statute, regulation or otherwise.</li>
                    <li>Out&amp;Back Outdoor shall notify the winner of the winning via mail within five (5)  business days of the Raffle.</li>
                    <li>Out&amp;Back Outdoor’s. decision is final with respect to all matters relating to awarding of the Prize and shall not be subject to review or appeal by any entrant or by any third party.</li>
                    <li>The Prize is neither transferable nor exchangeable and cannot be exchanged for money or money’s worth.</li>
                    <li>By entering the Raffle, each entrant unreservedly agrees to these terms and conditions which govern the Raffle and the awarding of the Prize.</li>
                    <li>By entering the Raffle each entrant agrees to release, discharge and hold harmless Out&amp;Back Outdoor, its legal representatives, affiliates, subsidiaries, agencies and their respective officers, directors, employees and agents from any damages whatsoever suffered, sustained or allegedly sustained in connection the Raffle or the acceptance of the Prize.</li>
                    <li>The winning entrant shall be solely responsible for any taxes levied in relation to the delivery or receipt of the Prize.</li>
                    <li>Out&amp;Back Outdoor reserves the right to alter these terms and conditions at any time and in its sole discretion.</li>
                    <li>Out&amp;Back Outdoor reserves the right, at any time, to cancel, modify or suspend the Raffle if, in its sole judgment, the Raffle is not capable of being conducted as specified.</li>
                    <li>These terms and conditions and any matters relating hereto shall be governed by and construed in accordance with the laws of Colorado and jurisdiction over any and all disputes shall be exclusive to the state and federal courts in Denver, Colorado.</li>
                </ol>
        </Fragment>
    )
}

class EventModal extends React.Component {
    constructor(props) {
        super(props)
        this.props
    }
    render(){
        const { classes } = this.props;
        return (
            <Fragment>
                <ModalChild  
                    type={'event'}
                    clickElement={<ModalClickElement classes={classes}/>} 
                    modelBody={ <ModalBody  classes={classes}/>}
                /> 
            </Fragment>
        )
    }
}

export default withStyles(styles)(EventModal);