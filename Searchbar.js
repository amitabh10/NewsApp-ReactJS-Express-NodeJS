import React from 'react'
import AsyncSelect from 'react-select/async'
import _ from "lodash"

class Searchbar extends React.Component{
	constructor(){
		super()
		this.state = {
			inputValue: '',
			results:[]
		}
		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.getOptions = _.debounce(this.getOptions.bind(this), 500);
	}
	

	getOptions(inputValue, callback){
	  	if (!inputValue) {
      		return callback([]);
    	}
    	this.setState({inputValue:inputValue})
	    try {
			fetch(
		        "https://newsappautosuggest1009.cognitiveservices.azure.com/bing/v7.0/suggestions?q="+inputValue,
		        {
		          headers: {
		            "Ocp-Apim-Subscription-Key": "871c23f57a77401682f878067e73f08a"
		          }
		        }
	      	)
	      	.then(response => response.json())
	      	.then(data =>{
				const resultsRaw = data.suggestionGroups[0].searchSuggestions;
				const results = resultsRaw.map(result => ({ label: result.displayText, value: result.displayText }))
				this.setState({ results })
				callback(results)
	      	})
	    } 
	    catch (error) {
			console.error(`Error fetching search ${inputValue}`);
    	}
	}

	handleSelectChange(event){
		this.setState((prevState)=>{return{inputValue:event.value}})
	    this.props.history.push(`search?q=${event.value}`);
  	}

	render(){
		return(
			<div style={{flex : 1, maxWidth : '350px', marginRight : '10px'}}>
		        <AsyncSelect
		          cacheOptions
		          loadOptions={this.getOptions}
		          defaultOptions
		          onChange={this.handleSelectChange}
		          placeholder= "Enter Keyword .."
		          noOptionsMessage={()=>{return "No Match"}}
		        />
     	 	</div>
		)
	}
}

export default Searchbar