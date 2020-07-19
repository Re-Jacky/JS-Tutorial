class Storage {
    constructor(){
        this.city
        this.defaultCity = '杭州'
    }

    getLocation(){
        const city = localStorage.getItem('City')
        if(city === null){
            this.city = this.defaultCity
        }else {
            this.city = city
        }

        return this.city
    }

    setLocation(city){
        localStorage.setItem('City',city)
    }
}   