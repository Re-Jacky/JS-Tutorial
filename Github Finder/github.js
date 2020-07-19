class GitHub {
    constructor(){
        this.client_id = 'dcc0c9b96b424ec48540'
        this.client_secret = 'efd8f6ef01e8ec47b674ef5850cecbfd12de34eb'
        this.api = 'https://api.github.com'
        this.repos_count = 5 
        this.repos_sort = 'created: asc'
    }

    async getUser(user){
        const profileResponse = await fetch(`${this.api}/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profile = await profileResponse.json();

        const repoResponse = await fetch(`${this.api}/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repos = await repoResponse.json(); 

        return {
            profile,
            repos
        }
    }

  
        

    
}