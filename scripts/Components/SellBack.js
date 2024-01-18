import React, { Fragment } from "react"

import BrandLookup from "../utils/BrandLookup.json"

export default class SellBack extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            brand: [
                {
                    "Brands": "Alps Mountaineering",
                    "Outerwear": "NO",
                    "Backpacks": "YES",
                    "Tents": "YES",
                    "Bags": "YES",
                    "Pads": "YES",
                    "Cycling": "NO"
                }
            ]
        }
        
        this.brandHandler = this.brandHandler.bind(this);
    }
    
    brandHandler(e) {
        const filteredObject = BrandLookup.filter(obj => obj.Brands === e.target.value)
        this.setState({ brand: filteredObject})
    }
    
    render(){
        const { brand } = this.state
        const grey = 'rgb(142 142 142)';
        const Styles = {
            container: {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
            },
            selectContainer: {
                display: 'flex',
                justifyContent: 'center',
            },
            select: {
                width: '250px', 
                marginBottom: '20px'
            }, 
            list: {
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                marginBottom: '30px',
            },
            listItem: {
                display: 'flex',
                marginBottom: '10px',
                color: '#03ff24',
            },
            h3: {
                fontSize: '20px',
                fontWeight: '200',
                color:'#262262',
                margin: '0',
            },
            faCheck: {
                marginRight: '10px',
                color: '#03ff24',
            },
            h3Disable: {
                fontSize: '20px',
                fontWeight: '200',
                color: grey,
                margin: '0',
            },
            faCheckDisable: {
                marginRight: '10px',
                color: grey,
            }
        };

        return (
            <div style={Styles.container}> 
                <div style={Styles.selectContainer}>
                    <select style={Styles.select} onChange={this.brandHandler}>
                        {BrandLookup.map((ele,idx) => 
                            <option key={idx}  value={ele.Brands}>{ele.Brands}</option>
                        )}
                    </select>
                </div>
                    <div style={Styles.list}>
                        <div style={Styles.listItem}><i style={brand && brand[0].Outerwear === "YES" ? Styles.faCheck : Styles.faCheckDisable} className="fa fa-check"></i><div style={brand && brand[0].Outerwear === "YES" ? Styles.h3 : Styles.h3Disable}>Men's, Women's &amp; Kids' Outerwear!</div></div>
                        <div style={Styles.listItem}><i style={brand && brand[0].Backpacks === "YES" ? Styles.faCheck : Styles.faCheckDisable} className="fa fa-check"></i><div style={brand && brand[0].Backpacks === "YES" ? Styles.h3 : Styles.h3Disable}>Backpacks &amp; Duffels</div></div>
                        <div style={Styles.listItem}><i style={brand && brand[0].Tents === "YES" ? Styles.faCheck : Styles.faCheckDisable} className="fa fa-check"></i><div style={brand && brand[0].Tents === "YES" ? Styles.h3 : Styles.h3Disable}>Tents</div></div>
                        <div style={Styles.listItem}><i style={brand && brand[0].Bags === "YES" ? Styles.faCheck : Styles.faCheckDisable} className="fa fa-check"></i><div style={brand && brand[0].Bags === "YES" ? Styles.h3 : Styles.h3Disable}>Sleeping Bags</div></div>
                        <div style={Styles.listItem}><i style={brand && brand[0].Pads === "YES" ? Styles.faCheck : Styles.faCheckDisable} className="fa fa-check"></i><div style={brand && brand[0].Pads === "YES" ? Styles.h3 : Styles.h3Disable}>Sleeping Pads</div></div>
                        <div style={Styles.listItem}><i style={brand && brand[0].Cycling === "YES" ? Styles.faCheck : Styles.faCheckDisable} className="fa fa-check"></i><div style={brand && brand[0].Cycling === "YES" ? Styles.h3 : Styles.h3Disable}>Cycling Gear</div></div>
                    </div>
            </div>
        )
        
    }
}
