const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

messageOne.textContent="From Javascript"

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    const location='http://192.168.105:3000/weather?address='+search.value
    
    fetch(location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent=data.error
        } else{
            messageOne.textContent=data.forecast+"<br>"+data.location
            messageTwo.textContent=data.address
        }
    })
})
})



