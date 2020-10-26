import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { MdShare } from 'react-icons/md';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import {Link} from "react-router-dom";

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)
const badgeMap = {
	world : ["#7c4eff","white","WORLD"],
	politics : ["#419488","white","POLITICS"],
	business : ["#4696ec", "white","BUSINESS"],
	technology : ["#cedc39", "black","TECHNOLOGY"],
	sport : ["#f6c244", "black","SPORTS"]
}

class ArticleCard extends React.Component{
	constructor(){
		super()
		this.state={}
	}

	render(){
		var bgColor = badgeMap.hasOwnProperty(this.props.data.section) ? badgeMap[this.props.data.section][0] : "gray" 
		var fontColor = badgeMap.hasOwnProperty(this.props.data.section) ? badgeMap[this.props.data.section][1] : "white"
		var text= badgeMap.hasOwnProperty(this.props.data.section) ? badgeMap[this.props.data.section][2] :this.props.data.section.toUpperCase()
		return(
			<Card as={Link} to={"/expandView?id="+this.props.data.id} className = 'm-3 shadow bg-white rounded' style = {{flexDirection : 'row',flexFlow : 'row wrap', color: 'inherit', textDecoration: 'inherit'}} onClick={this.props.onArticleClick}>
				<div className = "m-3" style = {{width : '25rem'}}>
					<img className = 'img-thumbnail' src = {this.props.data.image} style={{ width:'100%'}}/>
				</div>
				<Card.Body style = {{width : '78rem'}}>
					<Card.Title style={{fontStyle : 'italic'}}><h3>{this.props.data.title}<MdShare /></h3></Card.Title>
					<Card.Text>
						<h6>
						<ResponsiveEllipsis
			               text={this.props.data.description}
			               maxLine='3'
			               ellipsis='...'
			               trimRight
			               basedOn='words'
			            />
			            </h6>
				    </Card.Text>
				    <h5 style={{marginTop:"2rem"}}>
				    	<span style={{fontStyle: 'italic'}}>{this.props.data.date}</span>
		           		<Badge style={{float:"right" , fontSize:"85%", backgroundColor:bgColor, color:fontColor}}>{text}</Badge>{' '}
		           	</h5>
				</Card.Body>
			</Card>
		)
	}
}

export default ArticleCard