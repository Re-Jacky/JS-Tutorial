import {EasyHttp} from './http';
const http = new EasyHttp();
import {UI} from './ui';
const ui = new UI();

//Get post on DOM load
document.addEventListener('DOMContentLoaded',getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click',submitPost);

//Listen for edit state
document.querySelector('#posts').addEventListener('click',enableEdit);

// Listen for cancel edit
document.querySelector('.card-form').addEventListener('click',cancelEdit);


function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost(){
    const title = ui.titleInput.value,
          body = ui.bodyInput.value,
          id = ui.idInput.value;
    const data = {
            title,
            body
        };

    if(title === '' || body === ''){
        ui.showAlert("Please fill in all fields", 'alert alert-danger');
    } else {
        if(id === ''){
            // Create Post
            http.post('http://localhost:3000/posts',data)
            .then(data => {
                ui.showAlert('Post Created!!!','alert alert-success');
                ui.clearFields();
                getPosts();
            })
            .catch(err => console.log(err));
        } else {
            //update post
            http.put(`http://localhost:3000/posts/${id}`,data)
            .then(data => {
                ui.showAlert('Post Updated!!!','alert alert-success');
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err));
        }
    }

  
}

function enableEdit(e){
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id,
              body = e.target.parentElement.previousElementSibling.textContent,
              title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        };
        ui.fillForm(data);
    }
    e.preventDefault();
}

function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}