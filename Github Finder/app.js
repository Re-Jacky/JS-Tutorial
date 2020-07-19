//Init Github
const github = new GitHub
const ui = new UI

//Search input
const searchUser = document.getElementById('searchUser')

//Search input event listener
searchUser.addEventListener('keyup',(e)=>{
    //Get input text
    const userText = e.target.value
    if(userText!== ''){
        github.getUser(userText).then(data =>{
            console.log(data)
            if(data.profile.message === 'Not Found'){
                //show alert
                ui.showAlert('User not found','alert alert-danger')
            }else{
                //show profile
                ui.showProfile(data.profile)
                //fetch repos
                ui.showRepos(data.repos)
            }
        })
    } else{
        //clear profile
        ui.clearProfile()
    }
})