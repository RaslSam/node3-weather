const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const request=require('request')

const app=express()
const port=process.env.PORT || 3000

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Samadzade Rasul'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Rasul Samadzade'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text',
        title:'Help',
        name:'Rasul Samadzade'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name:'Rasul Samadzade',
        errorMessage:'Help not found'
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }        
    console.log(req.query)
    res.send({
    products: []
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Rasul Samadzade',
        errorMessage:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port'+ port)
})