class GeoCode {
    constructor(){
        this.token = 'fb9921d61da022';
        // this.geoAPI = `https://api.locationiq.com/v1/autocomplete.php?key=${this.token}&tag=place:city`
        this.geoAPI = `https://us1.locationiq.com/v1/search.php?key=${this.token}&format=json`
    }
    
    async getCoordinates(city){
        const resp = await fetch(`${this.geoAPI}&q=${city}`)
        return await resp.json()
    }
}