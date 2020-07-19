class UI {
    constructor(){
        this.location = document.getElementById('w-location')
        this.desc = document.getElementById('w-desc')
        this.string = document.getElementById('w-string')
        this.details = document.getElementById('w-details')
        this.icon = document.getElementById('w-icon')
        this.nightTem = document.getElementById('w-nighttem')
        this.datTem = document.getElementById('w-daytem')
        this.winspeed = document.getElementById('w-win-speed')
        this.wind = document.getElementById('w-wind')
        this.updateTime = document.getElementById('update-time')
    }

    paint(weather){
        this.location.textContent = weather.city
        this.desc.textContent = weather.wea
        this.string.textContent = `${weather.tem}°C`
        this.icon.setAttribute('src', `img/${weather.wea_img}.png`)
        this.nightTem.textContent = `夜间温度: ${weather.tem_night}°C`
        this.datTem.textContent = `日间温度: ${weather.tem_day}°C`
        this.winspeed.textContent = `风速: ${weather.win_speed} ${weather.win_meter}`
        this.wind.textContent = `风向: ${weather.win}`
        this.updateTime.textContent = `更新时间： ${weather.update_time}`
    
    }

    showAlert(msg){
        this.clearAlert()
        const div = document.createElement('div')
        div.className = 'alert alert-danger'
        div.appendChild(document.createTextNode(msg))
        const body = document.querySelector('.modal-body')
        const form = document.querySelector('#w-form')
        body.insertBefore(div, form)
        setTimeout(()=>{
            this.clearAlert()
        },2000)
    }

    showAlertMain(msg){
        this.clearAlert()
        const div = document.createElement('div')
        div.className = 'col-md-6 mx-auto mt-4 alert alert-danger'
        div.appendChild(document.createTextNode(msg))
        const container = document.querySelector('.container')
        const location = document.querySelector('.row')
        container.insertBefore(div, location)
        setTimeout(()=>{
            this.clearAlert()
        },2000)
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert')
        if(currentAlert){
            currentAlert.remove()
        }
    }


}