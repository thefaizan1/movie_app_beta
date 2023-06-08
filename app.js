const { log, timeEnd } = require('console');
const express =  require('express');
const https=require("https");
const app = express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs");


app.listen(process.env.PORT ||3000,function(){     
    console.log("server started at 3000");
})


app.get("/",function(req,res){
   
    res.sendFile(__dirname+"/index.html")
})


app.post("/",function(req,res){
  
    const query = req.body.movie;
    const url ="https://www.omdbapi.com/?t="+query+"&apikey=c6b57b9b"
    let body=[];
    https.get(url,function(response){
            
        response.on("data",function(data){
            body.push(data);
         }).on("end",function(){
            body=Buffer.concat(body).toString();
            movieData=JSON.parse(body);
            res.render("list",{title:movieData.Title,year:movieData.Year,genre:movieData.Genre,director:movieData.Director,actors:movieData.Actors,
                plot:movieData.Plot,lang:movieData.Language,rating:movieData.imdbRating,runtime:movieData.Runtime,collection:movieData.BoxOffice,poster:movieData.Poster});


            body=[];

         })

})
})