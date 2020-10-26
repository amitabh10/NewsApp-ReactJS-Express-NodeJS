const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3001
const NYTIMES_KEY = "k5iS5wtOtFoDOP65c5nWPu3slVn498ou"
const GUARDIAN_KEY = "7762833c-2ca6-437c-92a0-9207e6d0ae5a"
const GAURDIAN_PRE = "https://content.guardianapis.com/"
const NYTIMES_PRE = "https://api.nytimes.com/svc/"
// app.use(express.static('src'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const getArticleData = (data,src) => {
	if(src==="guardian"){
		var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
		try {
			img = data.blocks.main.elements[0].assets[data.blocks.main.elements[0].assets.length-1].file == "" ? 
			"https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" :
			data[i].blocks.main.elements[0].assets[data.blocks.main.elements[0].assets.length-1].file
		} catch(e) {
			// statements
			// console.log(e);
			img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
		}
		return {
			title: data.webTitle,
			image: img,
			date: data.webPublicationDate.split("T")[0],
			description: data.blocks.body[0].bodyTextSummary,
		}
	}
	else{
		var sel_image = ""
		// console.log(data)
		try{
			var images = data.multimedia
			// console.log(images)
			for (var j = 0; j < images.length; j++) {
				if(images[j].width >= 2000)
				{
					sel_image = images[j].url
					break
				}
			}
			// console.log(sel_image)
		}
		catch(err){
			console.log("No image for "+data.headline.main)
		}		
		return {
			title: data.headline.main,
			image:  (sel_image == "") ? "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" :   "https://www.nytimes.com/"+sel_image,
			date: data.pub_date.split('T')[0],
			description: data.abstract
		}
	}
}

const filterSearchResults = (data, src) => {
	var out = []
	var count = 0
	if(src === "guardian"){
		for (var i = 0; i < data.length; i++) {
			if(data[i].webTitle == "" || data[i].sectionId == "" || data[i].webPublicationDate == "")
				continue
			else{
				var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
				try {
					img = data[i].blocks.main.elements[0].assets[data[i].blocks.main.elements[0].assets.length-1].file == "" ? 
					"https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" :
					data[i].blocks.main.elements[0].assets[data[i].blocks.main.elements[0].assets.length-1].file
				} catch(e) {
					// statements
					// console.log(e);
					img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
				}
				out.push({
					id : data[i].id,
					title : data[i].webTitle,
					image : img,
					section : data[i].sectionId,
					date : data[i].webPublicationDate.split("T")[0],
					url: data[i].webUrl
				})
				count++
			}
		}
	}
	else{
		for (var i = 0; i < data.length; i++) {
			// console.log(data[i])
			if(data[i].headline.main == "" || data[i].news_desk == "" || data[i].pub_date == "")
				continue
			else{
				var sel_image = ""
				try{
					images = data[i].multimedia
					
					for (var j = 0; j < images.length; j++) {
						if(images[j].width >= 2000)
						{
							sel_image = images[j].url
							break
						}
					}
				}
				catch(err){
					console.log("No image for "+data[i].headline.main)
				}
				out.push({
					id: data[i].web_url,
					title : data[i].headline.main,
					image : (sel_image == "") ? "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" :  "https://www.nytimes.com/"+sel_image,
					section : data[i].news_desk,
					date : data[i].pub_date.split("T")[0],
					url: data[i].web_url
				})
				count++
			}
		}
	}
	return out
}

const filter = (data, src, countlimit) => {
	var out = []
	var count = 0
	if(src === "guardian"){
		for (var i = 0; i < data.length; i++) {
			if(data[i].webTitle == "" || data[i].sectionId == "" || data[i].webPublicationDate == "" || data[i].blocks.body[0].bodyTextSummary == "")
				continue
			if(count==countlimit)
				break
			
			else{
				var img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
				try {
					img = data[i].blocks.main.elements[0].assets[data[i].blocks.main.elements[0].assets.length-1].file == "" ? 
					"https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" :
					data[i].blocks.main.elements[0].assets[data[i].blocks.main.elements[0].assets.length-1].file
				} catch(e) {
					// statements
					// console.log(e);
					img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
				}
				out.push({
					id : data[i].id,
					title : data[i].webTitle,
					image : img,
					section : data[i].sectionId,
					date : data[i].webPublicationDate.split("T")[0],
					description : data[i].blocks.body[0].bodyTextSummary,
					url: data[i].webUrl
				})
				count++
			}
		}
	}
	else{
		for (var i = 0; i < data.length; i++) {
			// console.log(data[i])
			if(data[i].title == "" || data[i].section == "" || data[i].published_date == "" || data[i].abstract == "")
				continue
			if(count==countlimit)
				break
			else{
				var sel_image = ""
				try{
					images = data[i].multimedia
					
					for (var j = 0; j < images.length; j++) {
						if(images[j].width >= 2000)
						{
							sel_image = images[j].url
							break
						}
					}
				}
				catch(err){
					console.log("No image for "+data[i].title)
				}
				out.push({
					id: data[i].url,
					title : data[i].title,
					image : (sel_image == "") ? "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" :  sel_image,
					section : data[i].section,
					date : data[i].published_date.split("T")[0],
					description : data[i].abstract,
					url: data[i].url
				})
				count++
			}
		}
	}
	return out
}

app.get('/', (req, res, next) => res.send('Hello World!'))

app.get('/stories', (req, res, next) => {
	let source = req.query.src
	let category = req.query.cat
	let url = ""
	if(source === "guardian"){
		if(category === "home")
			url = GAURDIAN_PRE + "search?api-key="+GUARDIAN_KEY+"&section=(sport|business|technology|politics)&show-blocks=all"
		else
			url = GAURDIAN_PRE + category + "?api-key=" +GUARDIAN_KEY+ "&show-blocks=all"
	}
	else{
		url = NYTIMES_PRE + "topstories/v2/" + category + ".json?api-key=" + NYTIMES_KEY
	}
	console.log(url)
	fetch(url)
	.then(response => response.json())
	.then(data => {
		// console.log(data.results)
		res.send((source === "guardian") ? filter(data.response.results,source,10) : filter(data.results,source,10))
	})
	.catch(err => console.log(err))

})

app.get('/articlesearch', (req, res, next) => {
	let source = req.query.src
	let id = req.query.id
	let url = ""
	if(source === "guardian"){
		url = GAURDIAN_PRE +id+"?api-key=" +GUARDIAN_KEY+ "&show-blocks=all"
	}
	else{
		url = NYTIMES_PRE+'search/v2/articlesearch.json?fq=web_url:("'+id+'")&api-key='+NYTIMES_KEY
	}
	console.log(url)
	fetch(url)
	.then(response => response.json())
	.then(data => {
		data = (source==="guardian")? getArticleData(data.response.content,source): getArticleData(data.response.docs[0],source)
		res.send(data)
	})
	.catch(err => console.log(err))

})

app.get('/search', (req, res, next) => {
	let source = req.query.src
	let q = req.query.q
	let url = ""
	if(source === "guardian"){
		url = GAURDIAN_PRE + "search?q="+q+"&api-key=" +GUARDIAN_KEY+ "&show-blocks=all"
	}
	else{
		url = NYTIMES_PRE+'search/v2/articlesearch.json?q='+q+'&api-key='+NYTIMES_KEY
	}
	console.log(url)
	fetch(url)
	.then(response => response.json())
	.then(data => {
		data = (source==="guardian")? filterSearchResults(data.response.results,source) : filterSearchResults(data.response.docs,source)
		// console.log(data)
		res.send(data)
	})
	.catch(err => console.log(err))

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))