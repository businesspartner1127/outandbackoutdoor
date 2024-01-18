import Parent from "./Components/menu-item/NavParent"
import React from "react"
import ReactDOM from "react-dom"
import Search from './Components/menu-item/search/SearchInput'

const root = document.getElementById('Navbar')
const rootInput = document.getElementById('search-input')

ReactDOM.render(<Search />, rootInput)
ReactDOM.render(<Parent collections={menuCollectionArray}/>, root)
