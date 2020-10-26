import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import World from './components/World'
import Politics from './components/Politics'
import Business from './components/Business'
import Technology from './components/Technology'
import Sports from './components/Sports'
import ExpandView from './components/ExpandView'
import Search from './components/Search'
import { Route, Switch } from 'react-router-dom'


class App extends React.Component{
	constructor(){
		super()
		this.state = { 	checked: true, 
						articleClick: false,
						query:""
					 }
    	this.handleSwitch = this.handleSwitch.bind(this)
    	this.handleArticleClick = this.handleArticleClick.bind(this)
    	this.handleLinkClick = this.handleLinkClick.bind(this)
	}

	handleSwitch(event) {
		this.setState((prevState) =>{
			return {checked:!prevState.checked}
		})
  	}

  	handleArticleClick(event) {
		this.setState((prevState) =>{
			return {articleClick:true}
		})
		console.log(this.state.articleClick)
  	}

  	handleLinkClick(event) {
		this.setState((prevState) =>{
			return {articleClick:false}
		})
		console.log(this.state.articleClick)
  	}


	render(){
		return(
			<div>
			<NavBar handleSwitch = {this.handleSwitch} checked = {this.state.checked} articleClick = {this.state.articleClick} handleLinkClick = {this.handleLinkClick}/>
			<Switch>
                <Route path="/" render={() => <Home guardian = {this.state.checked} onArticleClick={this.handleArticleClick} />} exact />
                <Route path="/world" render={() => <World guardian = {this.state.checked} onArticleClick={this.handleArticleClick}/>} />
                <Route path="/politics" render={() => <Politics guardian = {this.state.checked} onArticleClick={this.handleArticleClick}/>} />
                <Route path="/business" render={() => <Business guardian = {this.state.checked} onArticleClick={this.handleArticleClick}/>} />
                <Route path="/technology" render={() => <Technology guardian = {this.state.checked} onArticleClick={this.handleArticleClick}/>} />
                <Route path="/sports" render={() => <Sports guardian = {this.state.checked} onArticleClick={this.handleArticleClick}/>} />
                <Route path="/expandView" render={(props) => <ExpandView guardian = {this.state.checked} {...props}/>} />
                <Route path="/search" render={(props) => <Search guardian = {this.state.checked} {...props}/>} />
            </Switch>
			</div>
		)
	}
}

export default App