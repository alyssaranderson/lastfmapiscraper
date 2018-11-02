const axios = require('axios');
const fs = require('fs');

const USER = ""
const APIKEY = ""
const URL="http://ws.audioscrobbler.com/2.0/"
let PAGE=1
const SCROBBLES=38886
let arr=[]
async function scrape () {

  let numfound=0
  while(numfound<SCROBBLES){
 	 const {data} = await axios.get(URL,
    		{
			params:{
		        method:"user.getRecentTracks",
			user:USER,
			api_key:APIKEY,
			format:"json",
			limit:200,
			page:PAGE,
			extended:1
    		}
	}		
  );
 const formatted=data.recenttracks.track.map(x=>{
const{artist,album,image,date,...rest}=x
const artist_name=x.artist.name
const artist_mbid=x.artist.mbid
const artist_image=x.artist.image[artist.image.length -1]["#text"]
const album_text=x.album["#text"]
const album_mbid=x.album.mbid
const image_url=x.image[image.length -1]["#text"]
const date_uts=x.date.uts
const date_string=x.date["#text"]




return {artist_name,artist_mbid,artist_image,album_text,album_mbid,image_url,date_uts,date_string,...rest
}


})
  arr=arr.concat(formatted)
  numfound=numfound+200
  PAGE=PAGE+1

console.log("found "+numfound+" %"+numfound/SCROBBLES*100)

}
  
 fs.writeFile("./output.txt", JSON.stringify(arr), (error)=>console.log); 

}


scrape();
