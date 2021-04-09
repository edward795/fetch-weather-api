//function call on Button click
function fetchData(){
    var x=document.getElementById("ip").value;
    //convert the input text to string
    x=String(x);
    
    //unique appid obtained from <https://openweathermap.org/api> prefixed with '&''
    var y='&appid=c9f8cfdb3b7fd46316e6e0b6957616ab'
    y=String(y)

    //append the input string cityname to the url as 'x'
    //the url details can be referenced from <https://openweathermap.org/api>
    var url='https://api.openweathermap.org/data/2.5/weather?q=' + x + y;
     //use fetch(url) to get the data 
     fetch(url)
     .then(response => response.json())
     .then(data => obj=data )
     .then(()=>{
        
        //The details of the data or json object returned are there in the <https://openweathermap.org/api>
        var temp=parseInt(obj.main.temp)
        var cel=temp-273.15;
        cel=cel.toFixed(2);

        //conversion of kelvin temperatures to centigrade
        max_temp=obj.main.temp_min - 273.15
        max_temp=max_temp.toFixed(2);
        min_temp=obj.main.temp_max - 273.15
        min_temp=min_temp.toFixed(2);

        //set the html content of div to a 'JSX' expression.Note here backtiks are used not single quotes
        document.getElementById("location").innerHTML=`<div class="card">
         <h2>${obj.name}</h2>
         <h3>${obj.weather[0].description}<span>Wind ${obj.wind.speed} km/h <span class="dot">•</span> humidity ${obj.main.humidity}%</span></h3>
         <h2>${cel} &#8451</h2>
         <div class="sky">
             <div class="sun"></div>
             <div class="cloud">
                 <div class="circle-small"></div>
                 <div class="circle-tall"></div>
                 <div class="circle-medium"></div>
             </div>
         </div>
         <table>
             <tr>
                 <td>Pressure</td>
                 <td>Cloudiness</td>
                 <td>Max.temp</td>
                 <td>Min temp</td>
                 
             </tr>
             <tr>
                 <td>${obj.main.pressure} hpa</td>
                 <td>${obj.clouds.all}%</td>
                 <td>${max_temp} &#8451</td>
                 <td>${min_temp} &#8451</td>
                 
             </tr>
            
         </table>
     </div>
     
         `
     })
     //catch the error and set the div html content to another 'JSX' expression
     .catch(function(error) {
        document.getElementById("location").innerHTML=`<div style="margin:50px;"class="alert alert-danger" role="alert">
                                                        No such city exists in the API Database!!
                                                       </div>`
    });
 
 }
 
 
 function handle(e){
	
    if(e.keyCode === 13){
		//Hitting Enter Key
		fetchData();
    	
    }
	return false;
}

