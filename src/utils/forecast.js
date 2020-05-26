const request=require('request')

const forecast=(x,y,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+x+'&lon='+y+'&appid=f69215a808b01f1550e1825c16ed7dfc&lang=az'
    request({url, json: true},(error, {body})=>{
        if (error){
            callback('Unable to connect to service', undefined)
        }
        else if (body.message){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,'Temperature: '+body.main.temp+
            ' Weather: '+body.weather[0].description)
        }
    })
}

module.exports=forecast