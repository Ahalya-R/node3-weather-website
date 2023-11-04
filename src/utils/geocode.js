const request = require('request')
const geocode = (address,callback)=>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=93c5a7b2a217874d9fe08e915b847340&query='+address
    request({ url, json: true }, function (error,{body}={}) {
        if(error){
          callback('Unable to connect to location Service!',undefined)
        }else if(body.error){
          callback('Unable to find Location',undefined)
        }else if(!body.data[0]){
         callback('No such location found',undefined)
        }
        else{
          callback(undefined,{
            latitude:body.data[0].latitude,
            longitude:body.data[0].longitude,
            location:body.data[0].name
          }
          )
        }
      })
  }
  module.exports = geocode