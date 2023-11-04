const path = require('path')
const express = require('express')
const config = require('config')
const hbs = require('hbs')
const { error } = require('console')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//creating app using express module
const app = express()
const port = process.env.PORT || 3000
//Definee path for express config
const PublicDirectoryPath = path.join(__dirname,'../Public')
const viewPath = path.join(__dirname,'../Templates/views')
const partialsPath = path.join(__dirname,'../Templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(PublicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        Title:'Weather app',
        Name:'Ahalya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        Title:'About Robot',
        Name:'Robot'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        Title:'Help',
        Message:'Robot need manual help in case of failure',
        Name:'Ahalya'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        res.send({
            error:'Address must be Provided'
        })
    }else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
              return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastdata) => {
              if(error){
                return res.send({error})
              }
              return res.send({
                location,
                forecast:forecastdata,
                address:req.query.address
            })
            })
          })
    }
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        Title:'404',
        Name:'Ahalya',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        Title:'404',
        Name:'Ahalya',
        errorMessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up running on' + port +' port')
})