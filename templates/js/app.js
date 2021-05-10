const dateCheckForm = document.querySelector('#date_check')
const check = document.querySelector('#date_input')

console.log("hi cleint side")

dateCheckForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const date = check.value
    fetch('http://localhost:3000/datefind?date=' +date).then((response) => {
        
        const messageOne = document.querySelector('#upcoming_data')
        messageOne.textContent = 'My new text'+response
    
    // response.json().then((data) => {
    //         if (data.error) {

    //         console.log(data.error)
    //         } else {
    //         console.log(data.location)
    //         console.log(data.forecast)
    //         }
    //     })
    })
})

const booked_Form = document.querySelector('#book_form')
const d = document.querySelector('#d')
const n = document.querySelector('#n')
const t1 = document.querySelector('#t1')
const t2 = document.querySelector('#t2')
const ev = document.querySelector('#ev')

booked_Form.addEventListener('submit', (e) => {
    e.preventDefault()
    const date = d.value
    const user = n.value
    const time1 = t1.value
    const time2 = t2.value
    const event_name = ev.value
    fetch('http://localhost:3000/findAndAdd?date=' +date+"&user="+user+"&event_name="+event_name+"&time1="+time1+"&time2="+time2).then((response) => {
        
        
        const messageOne = document.querySelector('#upcoming_data')
        messageOne.textContent = 'My new text'+response
    
    
    })
})