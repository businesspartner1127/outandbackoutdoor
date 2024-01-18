import React, {Fragment} from "react"

import ConditionModal from './ConditionModal'
import ShippingModal from './ShippingModal'
import {UID} from 'react-uid'

export default class ProductSelector extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            variants: props.variants,
            selectedColor: null,
            selectedColorIndex: null,
            selectedSize: null,
            selectedSizeIndex: null,
            selectedCondition: null,
            selectedConditionIndex: null,
            price: '',
            onEnableBuyButton: props.onEnableBuyButton,
            onShowBuyButton: props.onShowBuyButton,
            colorHover: ''
        }

        this.colorClick = this.colorClick.bind(this);
    }

    componentDidMount(){
        const { variants } = this.state
        if(variants && variants.conditions && variants.conditions.length === 1){
            this.conditionClick(variants.conditions[0], 0, true, null)
        }
        if(variants && variants.colors && variants.colors.length === 1){
            this.colorClick(variants.colors[0].label, 0, true, null)
        }
        if(variants && variants.sizes && variants.sizes.length === 1){
            this.sizeClick(variants.sizes[0], 0, true, null)
        }
    }

    colorHoverHandler(value){
        this.setState({colorHover: value})
    }
    colorClick(color, index, isEnabled, e) {
        this.setState({selectedColor: color})
        this.setState({selectedColorIndex: index})

        if(!isEnabled) {
            this.setState({selectedCondition: null})
            this.setState({selectedSize: null})
        }
    }

    sizeClick(size, index, isEnabled, e) {
        this.setState({selectedSize: size})
        this.setState({selectedSizeIndex: index})

        if(!isEnabled) {
            this.setState({selectedCondition: null})
            this.setState({selectedColor: null})
        }
    }

    isColorEnabled(color) {

        //only color is selected
        if(this.state.selectedColor !== null && this.state.selectedSize === null && this.state.selectedCondition === null)
            return true

        //nothing selected
        if(this.state.selectedColor === null &&
            this.state.selectedSize === null && this.state.selectedCondition === null) {
            return true
        }

        let variantsWithThisColor = this.state.variants.items.filter( item => item.color === color)

        //onlyCondition
        if(this.state.selectedCondition !==null && this.state.selectedSize === null) {
            let match = variantsWithThisColor.filter( item => item.condition === this.state.selectedCondition)
            return match.length > 0
        }

        //onlySize
        if(this.state.selectedCondition ===null && this.state.selectedSize !== null) {
            let match = variantsWithThisColor.filter( item => item.size === this.state.selectedSize)
            return match.length > 0
        }

        //Condition and Size
        if(this.state.selectedCondition !==null && this.state.selectedSize !== null) {
            let match = variantsWithThisColor.filter( item => item.size === this.state.selectedSize && item.condition === this.state.selectedCondition)
            return match.length > 0
        }

        return false
    }

    renderColorOptions(colors){
        //color object {label:red, value:rgb(255,0,0)}
        let result = colors.map((color, index) => {

            let disabledClass = 'obo-disabled'

            let tip = ( <span key={'s' + index} className="obo-tooltip">unavailable</span>)
            let isEnabled = false

            if(this.isColorEnabled(color.label)) {
                disabledClass = ''
                tip = (<div/>)
                isEnabled = true
            }
            else
            {
                if(this.state.selectedColor === color.label) {
                    this.setState({selectedColor: null})
                }
            }

            return (
                <UID>
                    {id => (

                        color.value === undefined || color.value === '' ?
                            <>
                                <div key={'d' + id} className={'obo-color-parent ' + disabledClass}
                                    onMouseOver={()=> this.colorHoverHandler(color.label)}
                                    onMouseLeave={()=> this.colorHoverHandler('')}
                                    onClick={(e) => this.colorClick(color.label, id, isEnabled, e)}
                                    style={{position: "relative", display: "inline-block", lineHeight: "0"}}>
                                        {this.state.colorHover === color.label && 
                                            <div className={'obo-color-hover'}>{color.label}</div>
                                        }
                                        <div className={'x-wrapper'}>
                                        <div className={'x-inner'}>
                                            <div className={'x-outer'}></div>
                                        </div>
                                    </div>
                                    <input key={'i' + id} type="radio" name="color" value={color.label} required=""
                                        className="obo-front-color-option " id={id} checked={this.state.selectedColor === color.label}/>
                                    <label key={'l' + id} className={"obo-front-color-label " + disabledClass} htmlFor={id}
                                        style={{background: color.value}}/>
                                    {tip}
                                </div>
                            </>
                        :
                            <>
                                <div key={'d' + id} className={'obo-color-parent ' + disabledClass}
                                    onMouseOver={()=> this.colorHoverHandler(color.label)}
                                    onMouseLeave={()=> this.colorHoverHandler('')}
                                    onClick={(e) => this.colorClick(color.label, id, isEnabled, e)}
                                    style={{position: "relative", display: "inline-block", lineHeight: "0"}}>
                                    {this.state.colorHover === color.label && 
                                        <div className={'obo-color-hover'}>{color.label}</div>
                                    }
                                    <input key={'i' + id} type="radio" name="color" value={color.label} required=""
                                        className="obo-front-color-option " id={id} checked={this.state.selectedColor === color.label}/>
                                    <label key={'l' + id} className={"obo-front-color-label " + disabledClass} htmlFor={id}
                                        style={{background: color.value}}/>
                                    {tip}
                                </div>
                            </>
                    )}
                </UID>
            )
        })

        return(<div className="selector-wrapper obo-colors">
                <div className="obo-label">
                    <label>
                        <span className="obo-title">Color:</span>
                        <span className="obo-value">&nbsp;{this.state.selectedColor}</span>
                    </label>
                </div>
                <div className="single-option-selector" >
                    {result}
                </div>
            </div>

           )
    }

    isSizeEnabled(size){

        //only size selected
        if(this.state.selectedSize !== null && this.state.selectedColor === null && this.state.selectedCondition === null) {
            return true
        }

        //nothing selected
        if(this.state.selectedColor === null && this.state.selectedCondition === null && this.state.selectedSize === null) {
            return true
        }

        let variantsWithThisSize = this.state.variants.items.filter( item => item.size === size)

        //condition only selected
        if(this.state.selectedColor === null && this.state.selectedCondition !== null) {
            let match = variantsWithThisSize.filter( item => item.condition === this.state.selectedCondition)
            return match.length > 0
        }

        //color only selected
        if(this.state.selectedColor !== null && this.state.selectedCondition === null) {
            let match = variantsWithThisSize.filter( item => item.color === this.state.selectedColor)
            return match.length > 0
        }

        //condition and color selected
        if(this.state.selectedColor !== null && this.state.selectedCondition !== null) {
            let match = variantsWithThisSize.filter( item => item.color === this.state.selectedColor && item.condition === this.state.selectedCondition)
            return match.length > 0
        }

        return false
    }

    renderSizeOptions(sizes) {

        let result = sizes.map((size, index) => {

            let disabledClass = 'obo-disabled'
            let tip = (<span key={'s' + index} className="obo-tooltip">unavailable</span>)
            let isEnabled = false

            if(this.isSizeEnabled(size)) {
                disabledClass = ''
                tip = (<div/>)
                isEnabled = true
            }
            else
            {
                if(size === this.state.selectedSize){
                    this.setState({selectedSize:null})
                }
            }

            return (
                <UID>
                    {id => (
                        <div key={'d' + id} className={'obo-button-parent ' + disabledClass}
                             onClick={(e) => this.sizeClick(size, id, isEnabled, e)}
                             style={{position: "relative", display: "inline-block", lineHeight: "0"}}>
                            <input key={'i' + id} type="radio" name="size" value={size} required=""
                                   className="obo-front-button-option " id={id} checked={this.state.selectedSize === size}/>
                            <label key={'l' + id} className={"obo-front-button-label " + disabledClass}
                                   htmlFor={id}>{size}</label>
                            {tip}
                        </div>
                    )}
                </UID>
            )

        })

        return (<div className="selector-wrapper obo-buttons">
            <div className="obo-label">
                <label>
                    <span className="obo-title">Size:</span>
                    <span className="obo-value">&nbsp;{this.state.selectedSize}</span>
                </label>
            </div>
            <div className="single-option-selector">
                {result}
            </div>
        </div>);
    }

    conditionClick(condition, index, isEnabled, e){
        //if clicked on an option that is not available
        //need to set the state of the other selectors back to de-selected
        if(!isEnabled) {
           this.setState({selectedColor: null, selectedSize: null})
        }

        this.setState({selectedCondition: condition, selectedConditionIndex:index})
    }

    isConditionEnabled(condition) {
        //nothing selected
        if(this.state.selectedCondition === null && this.state.selectedSize === null && this.state.selectedColor === null) {
            return true
        }

        //only condition selected
        if(this.state.selectedCondition !== null && this.state.selectedSize === null && this.state.selectedColor === null) {
            return true
        }

        let variantsWithCondition = this.state.variants.items.filter( item => item.condition === condition)

        //only color selected
        if(this.state.selectedColor !== null && this.state.selectedSize === null) {
            let match = variantsWithCondition.filter( item => item.color === this.state.selectedColor)
            return match.length > 0
        }

        // only size selected
        if(this.state.selectedColor === null && this.state.selectedSize !== null) {
            let match = variantsWithCondition.filter( item => item.size === this.state.selectedSize)
            return match.length > 0
        }

        //color and size selected
        if(this.state.selectedColor !== null && this.state.selectedSize !== null) {
            let match = variantsWithCondition.filter( item => item.size === this.state.selectedSize && item.color === this.state.selectedColor)
            return match.length > 0
        }

        return false
    }

    renderCondition(conditions) {

        let result = conditions.map((condition, index) => {

            let disabledClass = 'obo-disabled'
            let isEnabled = false
            let tip = (<span key={'s' + index} className="obo-tooltip">unavailable</span>)

            if(this.isConditionEnabled(condition)) {
                disabledClass = ''
                tip = (<div/>)
                isEnabled = true
            }

            return (
                <UID>
                    {id => (
                        <div key={'d' + id} className={"obo-button-parent " + disabledClass}
                             onClick={(e) => this.conditionClick(condition, id, isEnabled, e)}
                             style={{position: "relative", display: "inline-block", lineHeight: "0"}}>
                            <input key={'i' + id} type="radio" name="condition" value={condition} required=""
                                   className="obo-front-button-option " id={id} checked={this.state.selectedCondition === condition}/>
                            <label key={'l' + id} className={"obo-front-button-label " + disabledClass}
                                   htmlFor={id}>{condition.replace('used and ', '')}</label>
                            {tip}
                        </div>
                    )}
                </UID>
            )

        })

        return (<div className="selector-wrapper obo-buttons">
            <div className="obo-label">
                <label>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <ConditionModal/>
                        <span className="obo-title">Condition:</span>
                        <span className="obo-value">&nbsp;{this.state.selectedCondition}</span>
                    </div>
                </label>
            </div>
            <div className="single-option-selector" >
                {result}
            </div>
        </div>);

    }

    percentOff(salesPrice, originalPrice){
        let result = (1.00-(salesPrice/originalPrice)) * 100.00
        return result.toFixed(0)
    }

    insertDecimal(num) {
        return (num / 100).toFixed(2);
    }

    insertDecimalNoCents(num) {
        return (num / 100).toFixed(0);
    }

    renderPriceOrRange() {
        let variant = this.getSelectedVariant()
        if(variant === null) {
            return this.renderDefaultPriceRange()
        }

        return this.renderPrice(variant)

    }

    renderDefaultPriceRange() {
        let lowPrice = "$" + this.insertDecimalNoCents(this.state.variants.priceLow)
        let highPrice = "$" + this.insertDecimalNoCents(this.state.variants.priceHigh)


        let rangeStyle = {fontSize : "2rem", color:"black" }
        let selectStyle = {fontSize:"small", color:"black",paddingBottom: "10px"}

        return (
            <div>
                <div style={rangeStyle}>{ lowPrice === highPrice ? highPrice : lowPrice + " to " + highPrice}</div>
                <div style={selectStyle}>select condition, color, and size to see actual prices.</div>
            </div>
        )
    }

    renderPrice(variant) {

        let price = ""
        let msrp = ""
        let percentOffText = ""

        if(variant !== null) {
            price = "$" + this.insertDecimal(variant.price)
            msrp = "$" + this.insertDecimal(variant.compare_at_price)
            let percentOff = this.percentOff(variant.price, variant.compare_at_price)
            percentOffText = percentOff + "% off retail price"
        }

        let priceStyle = {
            position: "relative", display: "inline-block",
            color : "red",
            fontSize : "2rem",
            fontWeight: "bold",
            paddingRight : "10px"
        }

        let msrpStyle = {
            position: "relative", display: "inline-block",
            color : "black",
            fontSize : "2rem",
            fontWeight : "bold",
            textDecoration:"line-through"
        }

        let percentOffStyle = {
            color : "black",
            paddingBottom : "10px"
        }

        let msrpDiv = (<div style={msrpStyle}>{msrp}</div>)
        let percentOffDiv = (<div style={percentOffStyle}>{percentOffText}</div>)

        if(price === msrp) {
            msrpDiv = (<div/>)
            percentOffDiv = (<div/>)
        }

        return (<div>
                    <div style={priceStyle}>{price}</div>
                    {msrpDiv}
                    {percentOffDiv}
                </div>)
    }

    variantIsSelected() {
        return this.state.selectedCondition !== null && this.state.selectedColor !== null && this.state.selectedSize !== null
    }

    getSelectedVariant() {
        let result = null
        if(this.variantIsSelected()) {
            this.state.variants.items.forEach(variant => {
                if(variant.condition === this.state.selectedCondition && variant.color === this.state.selectedColor && variant.size === this.state.selectedSize) {
                    result = variant
                }
            })
        }

        return result
    }

    renderSelectedVariantDataForForm() {
        let variant = this.getSelectedVariant()
        if (variant !== null) {
            let input = (<input id="selectedVariant" name="id" type="hidden" data-sku={variant.dataSKU} value={variant.id}/>)
            return input
        }

        return (<div/>)
    }

    renderViewButton() {
        let variant = this.getSelectedVariant()

        //do nothing if there is no selected variant
        if(variant === null) {
            this.state.onEnableBuyButton(false)
            this.state.onShowBuyButton(true)
            return (<div/>)
        }

        //if the seller is OBO, then it's a SELL situation not view
        if(variant.seller.toUpperCase() === "OBO" || variant.seller === '_underwritten') {
            this.state.onEnableBuyButton(true)
            this.state.onShowBuyButton(true)
            return (<div/>)
        }

        this.state.onEnableBuyButton(false)
        this.state.onShowBuyButton(false)

        let buttonStyle =  {
            display: "block",
            borderRadius: "4px",
            width: "100%",
            backgroundColor : "#009933",
            marginBottom: "4px"
        }

        let linkStyle = {
            color : "white",
            display: "block",
            width: "100%",
            textAlign : "center",
            padding: "10px 10px 10px 10px"
        }

        let viewButton =
            (<div style={buttonStyle} id={'viewButton'+variant.id} >
                <a style={linkStyle} href={variant.product_url} target={"_blank"} >SHOP ON {variant.seller.replace(/_/g, " ").toUpperCase()} - {"$" + this.insertDecimal(variant.price)} </a>
            </div>)

        return viewButton
    }

    render(){
        let data = this.state.variants;
        let colors = this.renderColorOptions(data.colors)
        let sizes = this.renderSizeOptions(data.sizes)
        let price = this.renderPriceOrRange()
        let condition = this.renderCondition(data.conditions)
        let hiddenFormField = this.renderSelectedVariantDataForForm()
        let viewButton = this.renderViewButton()

        return (
            <Fragment>
                <div id={"obo"}>
                    {price}
                    {condition}
                    {colors}
                    {sizes}
                    {hiddenFormField}
                    {viewButton}
                    
                </div>
                <div>
                    {this.getSelectedVariant() !== null && 
                        this.getSelectedVariant().seller.toUpperCase() === "OBO" && 
                        this.getSelectedVariant().seller === "_underwritten"&&
                        <ShippingModal/>
                    }
                </div>
            </Fragment>
        )
    }
}
