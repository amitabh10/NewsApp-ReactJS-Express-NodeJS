import React from "react"
import queryString from 'query-string'

class ExpandView extends React.Component{
	constructor(){
		super()
		this.state ={	isLoaded:false,
						data:[]
					}
	}

	componentDidMount(){
		console.log(this.props)
		const values = queryString.parse(this.props.location.search)
		console.log(values.id)
		var url = this.props.guardian? "http://localhost:3001/articlesearch?src=guardian&id="+values.id : "http://localhost:3001/articlesearch?src=nytimes&id="+values.id
		fetch(url)
		.then(res => res.json())
		.then((result) => {
			this.setState((prevState) =>{
				return {
					isLoaded: true,
	            	data: result
	        	}
			})
		})
	}

	render(){
			return(
			<div>
			{this.state.isLoaded? this.state.data.title:"Loading.."}
			</div>
		)
	}

}

export default ExpandView