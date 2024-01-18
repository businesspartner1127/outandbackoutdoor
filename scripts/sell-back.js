import ModalContainer from "./Components/ModalContainer"
import React from "react"
import ReactDOM from "react-dom"
import SellBack from "./Components/SellBack"
import Slider from "./Components/Slider"
const rootDropDown = document.getElementById('sell-back-react')
const ModalRoot = document.getElementById('modal-react')
const sliderRoot = document.getElementById('slider-react')
const sliderQuoteRoot = document.getElementById('slider-quote-react')
ReactDOM.render(<SellBack/>, rootDropDown)
ReactDOM.render(<Slider type={'works'}/>, sliderRoot)
ReactDOM.render(<Slider type={'quote'}/>, sliderQuoteRoot)
ReactDOM.render(<ModalContainer/>, ModalRoot)