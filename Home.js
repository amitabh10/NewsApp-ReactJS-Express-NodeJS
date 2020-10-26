import React from "react"
import ArticleCard from "./ArticleCard"


class Home extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			isLoaded:false,
			//isGuardian:true,
			data:[]
		}
	}

	componentDidMount(){
		//this.setState({isGuardian:this.props.guardian})
		var url = this.props.guardian? "http://localhost:3001/stories?src=guardian&cat=home" : "http://localhost:3001/stories?src=nytimes&cat=home"
		fetch(url)
		.then(res => res.json())
		.then((result) => {
			result = result.map( article => <ArticleCard key={article.id} data={article} onArticleClick ={this.props.onArticleClick}/>)
	        this.setState((prevState) =>{
				return {
					//isGuardian: prevState.isGuardian,
					isLoaded: true,
	            	data: result
	        	}
			})
		})
	}



	componentDidUpdate(prevProps){
		
		if(prevProps.guardian !== this.props.guardian){
			this.setState({isLoaded:false})
		
		var url = this.props.guardian ? "http://localhost:3001/stories?src=guardian&cat=home" : "http://localhost:3001/stories?src=nytimes&cat=home"
		fetch(url)
		.then(res => res.json())
		.then((result) => {
			result = result.map( article => <ArticleCard key={article.id} data={article} onArticleClick ={this.props.onArticleClick}/>)
	        this.setState((prevState) =>{
				return {
					//isGuardian: prevState.isGuardian,
					isLoaded: true,
	            	data: result
	        	}
			})
		})
		}
	}

	render(){
		return(
			<div>
			{this.state.isLoaded? this.state.data:"Loading.."}
			</div>
		)
	}

}

export default Home