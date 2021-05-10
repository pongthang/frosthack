const { response } = require('express')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'date_time_schedules'

const add_date_time = (data)=>{
    collection_name = "Date_and_time"
    MongoClient.connect(connectionURL, { useNewUrlParser: true ,useUnifiedTopology: true }, (error, client)=> {
    if (error) {
    return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    // Start to interact with the database
    db.collection(collection_name).insertOne(data)
    
    })
}



const find_date_time = (data)=>{
    date = data.date
    time1 = data.time1
    time2 = data.time2
    collection_name = "Date_and_time"
    MongoClient.connect(connectionURL, { useNewUrlParser: true ,useUnifiedTopology: true }, (error, client)=> {
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
                    console.log("Your Slot is booked. Done...")
                } else if((time1 > matched_data.time1)&&(time1 < matched_data.time2)){
                    console.log( "The Slot has been already booked. Change the slot !!!")
                }else if((time2 > matched_data.time1)&&(time2 < matched_data.time2)){
                    console.log( "The Slot has been already booked. Change the slot !!!")
                }
            }
         }
       
        
        
        })
    })
}



const fetch_data = (date)=>{
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
                 //console.log("yessss")
                console.log(matched_data)
             }
             
           
            
            })
            
     
        })
         
        
}


find_date_time({
    user:"sddsdd",
    time1:12
})

module.exports={find_date_time,fetch_data}
    
