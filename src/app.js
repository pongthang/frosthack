
//const {find_date_time,fetch_data} = require("./utils.js")
const express = require('express')
const path = require('path')
const views_path = path.join(__dirname, '../templates')
const publicstatic_path = path.join(__dirname, '../public')

const app = express()
app.set('view engine','hbs')
app.set('views',views_path)

app.use(express.static(publicstatic_path))



const { response } = require('express')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'date_time_schedules'

const add_date_time = (data)=>{
    collection_name = "Date_and_time"
    MongoClient.connect(connectionURL, { useNewUrlParser: true,useUnifiedTopology: true  }, (error, client)=> {
    if (error) {
    return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    // Start to interact with the database
    db.collection(collection_name).insertOne(data)
    
    })
}




app.get('', (req, res) => {
    res.render('index')
    })

app.get('/findAndAdd', (req, res) => {
        
        const data = {
                date :req.query.date,
                user : req.query.user,
                event_name:req.query.event,
                time1 : req.query.time1,
                time2 : req.query.time2}

        
                date = data.date
                time1 = data.time1
                time2 = data.time2
                collection_name = "Date_and_time"
                MongoClient.connect(connectionURL, { useNewUrlParser: true,useUnifiedTopology: true  }, (error, client)=> {
                if (error) {
                return console.log('Unable to connect to database!')
                }
                const db = client.db(databaseName)
                // Start to interact with the database
                
                db.collection(collection_name).find({ date: date}).toArray((error, matched_data) => {
                    
                     if(matched_data.length === 0 ){
                        add_date_time(data)
                     }else{
                        for(i = 0 ; i < matched_data.length;i++){
                            if(((i+1) === matched_data.length)&&(time1 < matched_data.time1)&&(time1 > matched_data.time2)&&(time2 < matched_data.time1)&&(time2 > matched_data.time2)){
                                add_date_time(collection_name,data)
                                //return res.send('index',{message:"Your Slot is booked. Done..."}) 
                            } else if((time1 > matched_data.time1)&&(time1 < matched_data.time2)){
                                //return res.send('index',{message:"The Slot has been already booked. Change the slot !!!"}) 
                            }else if((time2 > matched_data.time1)&&(time2 < matched_data.time2)){
                                //return res.send('index',{message:"The Slot has been already booked. Change the slot !!!"}) 
                            }
                        }
                     }
                   
                    
                    
                    })
                })
            
        
        
        //console.log(result)

      })
app.get('/datefind',(req,res)=>{
        date = req.query.date
        const fetch_data = (date) =>{
        collection_name = "Date_and_time"
                
        MongoClient.connect(connectionURL, { useNewUrlParser: true ,useUnifiedTopology: true }, (error, client)=> {
                if (error) {
                    return console.log('Unable to connect to database!')
                    }
                const db = client.db(databaseName)
                    // Start to interact with the database
                    
                db.collection(collection_name).find({ date: date}).toArray((error, matched_data) => {
                         if(matched_data.length === 0 ){
                            console.log("hiiii")
                            match =  [{a:"no Matched"}]
                            
                         }else{
                             
                            console.log(matched_data)
                            res.send(matched_data)
                            
                         }                       
                        })            
                 
                    })         
                    
                }
        fetch_data(date)
            
        
        //console.log(result)

})


app.listen(3000, () => {
        console.log('Server is up on port 3000.')
        })





