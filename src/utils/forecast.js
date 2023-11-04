const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5d464afd6325a4049fe5a852eb22d567&query='+longitude+','+latitude+'&units=f'
    request({url, json:true},(error,{body}={}) => {
        if(error){
          callback('Unable to connect to server',undefined)
        }else if(body.error){
          callback('Unable to find Location',undefined)
        } 
        else{
         callback(undefined,body.current.weather_descriptions[0]+' It is currently '+ body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out')
        }   
      })
  }
module.exports=forecast