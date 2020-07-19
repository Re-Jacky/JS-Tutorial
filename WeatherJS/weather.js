class Weather extends GeoCode {
    constructor(city){
        super()
        this.weatherAPI = 'https://weatherbit-v1-mashape.p.rapidapi.com'
        this.key = '11ac3b01e7msh39242a42d36812ep17f273jsn5ff7252624fd'
        this.city = city

        this.freeAPI = "https://tianqiapi.com/free/day"
        this.freeID = "53912176"
        this.freeKey = "kyPSE7o4"
    }

    async getCurrentWeather() {
        // const cordinates = await this.getCoordinates(this.city)

        // const resp = await fetch(`${this.weatherAPI}/current?lang=en&lon=${cordinates[0].lon}&lat=${cordinates[0].lat}`, {
        // "method": "GET",
        // "headers": {
        //     "x-rapidapi-host": this.weatherAPI.split(-1)[0],
        //     "x-rapidapi-key": this.key
        //     }
        // })
        const resp = await fetch(`${this.freeAPI}?appid=${this.freeID}&appsecret=${this.freeKey}&city=${this.city}`)
        const respData = await resp.json()
        return respData
    }

    async changeLocation(city){
        this.city = city
    }
}