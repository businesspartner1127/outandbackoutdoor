import ProductSelector  from "./Components/ProductSelector"
import React from "react"
import ReactDOM from "react-dom"

const root = document.getElementById('product-selector')

const buyButton = document.getElementById('AddToCart')
let variants = oboVariantFilter(window.productVariants, window.productTemplateTest)

function oboVariantFilter(variants, template) {
    if(template === 'obo-filter'){
        return variants.filter(product => product.title.split(':')[0].toLowerCase() === 'obo')
    }
    return variants
}

function getColorCSS(c) {
    let ele = document.createElement("div");
    ele.style.color = c;
    return ele.style.color.split(/\s+/).join('').toLowerCase();
}

function isColorValid(c) {
    let s = getColorCSS(c);
    return (s) ? true : false;
}

function setVariantLinks(variants) {
    for(let i=0; i<variants.length; i++) {
        let variant = variants[i]
        let id = variant.id
        variant.link = null
        let item = JSON.parse(document.getElementById('VariantLinks-'+id).textContent)
        if(item !==  null) {
            variant.link = item.url
        }
    }
    return variants
}

setVariantLinks(variants)

function addSortKeyToCondition(condition) {
    let result = {}

    let key = 0
    switch(condition?.toLowerCase()) {
        case "new":
            key = 0
            break;
        case "used excellent":
            key = 1
            break;
        case "used good":
            key = 2
            break;
        case "used worn":
            key = 3
            break;
        default:
            key = 0
    }

    result = {key: key, value: condition}
    return result
}

function addSortKeyToSize(condition) {
    let result = {}

    let key = 0

    switch(condition?.toLowerCase()) {
        case "xxs":
            key = 0
            break;
        case "xs":
            key = 1
            break;
        case "s":
            key = 2
            break;
        case "m":
            key = 3
            break;
        case "l":
            key = 4
            break;
        case "xl":
            key = 5
            break;
        case "xxl":
            key = 6
            break;
        case "3xl":
            key = 7
            break;
        default:
            key = 0
    }

    result = {key: key, value: condition}
    return result
}

function sortConditionByKey(conditions) {
    conditions.sort(function (a, b) {
        return a.key - b.key;
    });

    return conditions
}

function sortSizeByKey(sizes) {
    sizes.sort(function (a, b) {
        return a.key - b.key;
    });

    return sizes
}

function toTitleCase(str) {
    return str?.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function mapColor(color) {
    let labelAndValue = color?.split(":") || ['', '']
    let label = labelAndValue[0]
    let value = labelAndValue[1]

    return {label: toTitleCase(label), value:value}
}

function getDistinctColors(colors) {
    const result = []
    const map = new Map()
    for (const color of colors) {
        if(!map.has(color.label)){
            map.set(color.label, true);    // set any value to Map
            result.push({
                label: color.label,
                value: color.value
            })
        }
    }
    return result
}

function mapVariants(variants) {

    let result = {}

    //option1  seller/condition
    // Examples
    // OBO/Used/Excellent
    // Ebay/Used/Worn
    // OBO/Used/Good
    // ArcRockSolid/Used/Good
    // Arc/New
    // OBO/Used/Excellent

    //option2  Size
    //option3  Color with format label:rgb(0,0,255)

    let colors = []
    let sizes = []
    let conditions = []
    let prices = []

    for(let i=0; i<variants.length; i++) {
        let variant = variants[i]
        let sellerCondition = variant.option1.split(":")
        let seller = sellerCondition[0]
        let condition = sellerCondition[1]

        let conditionGrade = ""

        if (condition?.toLowerCase() !== "new" && sellerCondition[2] !== undefined) {
            conditionGrade = sellerCondition[2]
        }

        variant.seller = seller
        variant.condition = condition + " " + conditionGrade
        conditions.push(addSortKeyToCondition(variant.condition))

        variant.size = variant.size2 === null ? variant.size : `${variant.size} - ${variant.size2}`
        sizes.push(addSortKeyToSize(variant.size))

        let color = mapColor(variant.option3)
        variant.color = color.label
        colors.push(color)

        prices.push(variant.price)
    }

    result.prices = prices.sort((a, b) => a - b)
    result.priceLow = prices[0]
    result.priceHigh = prices[prices.length-1]

    let sortedSizes = sortSizeByKey(sizes)
    result.sizes = [...new Set(sortedSizes.map(c=>c.value))]

    let distinctColors = getDistinctColors(colors)
    result.colors = distinctColors

    let sortedConditions = sortConditionByKey(conditions)
    result.conditions = [...new Set(sortedConditions.map(c=>c.value))]
    result.items = variants

    return result
}

const finalVariants = mapVariants(variants)

function onEnableAddToCartButton(enable) {
    if(!buyButton) return;

    if(enable) {
        buyButton.removeAttribute("disabled")
        buyButton.style.backgroundColor = "#009933"
        buyButton.style.display = "block"
    }
    else {
        buyButton.style.backgroundColor = "lightgrey"
        buyButton.setAttribute("disabled","true")
        buyButton.style.display = "block"
    }
}

function onShowAddToCartButton(show) {
    if(!buyButton) return;

    if(show) {
        buyButton.style.display = "block"
    }
    else {
        buyButton.style.display = "none"
    }
}

console.log(finalVariants)

ReactDOM.render(<ProductSelector variants={finalVariants}
                                 onEnableBuyButton={onEnableAddToCartButton} o
                                 onShowBuyButton={onShowAddToCartButton}/>, root)