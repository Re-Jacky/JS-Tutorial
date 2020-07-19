//initialize 
const storage = new Storage()

const currentLocation = storage.getLocation()
const weather = new Weather(currentLocation)
const ui = new UI


//Get weather when DOM loaded
document.addEventListener("DOMContentLoaded",getWeather)

//Change location
document.getElementById("w-change-btn").addEventListener('click',changeLocation)


function getWeather(){
    weather.getCurrentWeather().then(data =>{
        if(data.errcode){
            ui.showAlertMain(`
            Error Code: ${data.errcode}
            Error Message: ${data.errmsg}
            `)
        }else{
            ui.paint(data)
        }
        
    })
}

function changeLocation(e){
    const newLocation = document.getElementById('city').value
    if( newLocation!== ''){
        weather.changeLocation(newLocation)
        getWeather()
        $('#locModal').modal('hide')
        storage.setLocation(newLocation)
    } else {
        ui.showAlert('Please input a city before saving.')
    }
    
}



//sample resp
/*
air: "46"
city: "杭州"
cityid: "101210101"
tem: "29"
tem_day: "31"
tem_night: "20"
update_time: "2020-05-02 16:02"
wea: "晴"
wea_img: "qing"
win: "西南风"
win_meter: "16-24km/h"
win_speed: "4级"
*/

