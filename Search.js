import React from "react"
import queryString from 'query-string'
import SearchResultCard from "./SearchResultCard.js"

class Search extends React.Component{
	constructor(){
		super()
		this.state ={	
						isLoaded:false,
						data:[],
						query : ""
					}
	}

	componentDidMount(){
		console.log(this.props)
		const values = queryString.parse(this.props.location.search)
		console.log(values.q)
		this.setState({query:values.q})
		var url = this.props.guardian? "http://localhost:3001/search?src=guardian&id="+values.id : "http://localhost:3001/search?src=nytimes&id="+values.id
		fetch(url)
		.then(res => res.json())
		.then((result) => {
			result = result.map( article => <SearchResultCard key={article.id} data={article} onArticleClick ={this.props.onArticleClick}/>)
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
				{
					this.state.isLoaded?
					<div>
						<h3>Results</h3>
						{this.state.data}
					</div> 
					:
					"Loading.."
				}
				</div>
		)
	}

}

export default Search