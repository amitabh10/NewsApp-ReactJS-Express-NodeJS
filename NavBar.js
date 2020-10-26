import React from 'react'
// import NavBarView from './NavBarView.js'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Searchbar from './Searchbar.js'
import NewsSwitch from './NewsSwitch.js'
import { FaRegBookmark } from 'react-icons/fa';
import {Link, withRouter} from "react-router-dom";

class NavBar extends React.Component{
	constructor(){
		super()
		this.state = {}
	}


	render(){
		const SearchBar = withRouter(Searchbar)
		return(
			<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
		  	<SearchBar />
		  	<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  	<Navbar.Collapse id="responsive-navbar-nav">
			    <Nav className="mr-auto" >
					<Nav.Link as={Link} to="/" onClick={this.props.handleLinkClick}>Home</Nav.Link>
					<Nav.Link as={Link} to="/world" onClick={this.props.handleLinkClick}>World</Nav.Link>
					<Nav.Link as={Link} to="/politics" onClick={this.props.handleLinkClick}>Politics</Nav.Link>
					<Nav.Link as={Link} to="/business" onClick={this.props.handleLinkClick}>Business</Nav.Link>
					<Nav.Link as={Link} to="/technology" onClick={this.props.handleLinkClick}>Technology</Nav.Link>
					<Nav.Link as={Link} to="/sports" onClick={this.props.handleLinkClick}>Sports</Nav.Link>
			    </Nav>
			    <Nav>
			    	<Navbar.Text className='mr-2'><FaRegBookmark /></Navbar.Text>
			    	{ this.props.articleClick===false ?
			    		<>
				    	<Navbar.Text className='mr-2'>NYTimes</Navbar.Text>
				      	<Navbar.Text className='mr-2'><NewsSwitch handleSwitch = {this.props.handleSwitch} checked = {this.props.checked}/></Navbar.Text>
				      	<Navbar.Text>Guardian</Navbar.Text>
				      	</>
				      :
				      null
			      	}
			    </Nav>
		  	</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default NavBar