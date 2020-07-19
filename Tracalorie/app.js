// Storage Controller
const storageCtrl = (function(){
    const storageKey = 'itemList';
    let items;

    return {
        storeItem: function(item){
            if(localStorage.getItem(storageKey) === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem(storageKey));
            }
            items.push(item);
            localStorage.setItem(storageKey, JSON.stringify(items));
        },
        get: function(){
            if(localStorage.getItem(storageKey) === null){
                return [];
            }else {
                return JSON.parse(localStorage.getItem(storageKey));
            }
        },
        updateItem: function(updatedItem){
            let items = this.get();
            items.forEach((item,index)=>{
                if(updatedItem.id === item.id ){
                    items.splice(index, 1, updatedItem)
                }
            });
            localStorage.setItem(storageKey,JSON.stringify(items));
        },
        deleteItem: function(deletedItem){
            let items = this.get();
             items.forEach((item,index)=>{
                if(deletedItem.id === item.id ){
                    items.splice(index, 1)
                }
            });
            localStorage.setItem(storageKey,JSON.stringify(items));
        },
        clearAll: function(){
            localStorage.removeItem(storageKey);
        }
    }
})()




// Item Controller
const itemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structure / State
    const data = {
        items: storageCtrl.get(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function(){
            return data.items;
        },
        logData: function(){
            return data
        },
        addItem: function(name, calories){
            let ID;
            // Create ID
            if(data.items.length>0){
                ID = data.items[data.items.length-1].id + 1;
            }else {
                ID = 0;
            }

            calories = parseInt(calories);
            const newItem = new Item(ID, name , calories);
            data.items.push(newItem);
            return newItem;
        },
        getTotalCalories: function(){
            let total = 0;
            data.items.forEach(ele =>{
                total += parseInt(ele.calories);
            });
            data.totalCalories = total;
            return total;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        setCurrentItem: function(item){
            const re = /\d+/,
                  id = item.id.match(re)[0];
            let currentData = data.items.filter((ele)=>{
                return ele.id === parseInt(id);
            })[0];
            data.currentItem = currentData;
        },
        updateCurrentItem: function(name, calories){
            data.currentItem.name = name;
            data.currentItem.calories = calories;
            let itemInDataStructure = data.items.filter(ele=>{
                return ele.id === data.currentItem.id
            })[0];
            itemInDataStructure.name = name;
            itemInDataStructure.calories = calories;
        },
        deleteItem: function(){
            data.items.forEach((item, index)=>{
                if(item.id === data.currentItem.id){
                    data.items.splice(index,1);
                }
            })
        },
        clearAll: function(){
            data.items = [];
            data.totalCalories = 0;
        }
    }

})();


// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCaloriesValue: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearAllBtn: '.clear-btn'
    };

    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(item => {
                html += `<li id="item-${item.id}" class="collection-item">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
            });
            //Insert items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function(){
            return UISelectors;
        },
        getItemInput: function(itemSelector){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        populateTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCaloriesValue).textContent = totalCalories
        },
        enterEditState: function(){
            let item = itemCtrl.getCurrentItem();
            document.querySelector(UISelectors.addBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.itemNameInput).value = item.name;
            document.querySelector(UISelectors.itemCaloriesInput).value = item.calories;


        },
        clearEditState: function(){
            this.clearInput();
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
        },
        updateCurrentItem: function(){
            const newItem = itemCtrl.getCurrentItem();
            const li = document.getElementById(`item-${newItem.id}`);
            li.innerHTML = `
            <strong>${newItem.name}: </strong> <em>${newItem.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
        },
        deleteItem: function(){
            const deleteItem = itemCtrl.getCurrentItem();
            document.getElementById(`item-${deleteItem.id}`).remove();
            this.clearEditState();
        },
        clearAll: function(){
            const htmlCollection = document.querySelector(UISelectors.itemList).children;
            for (let item of htmlCollection){
                item.remove();
            };
            this.populateTotalCalories(0);
            this.hideList();
        }
    }
})();





// App Controller
const App = (function(itemCtrl, UICtrl){
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        document.addEventListener('keypress',function(e){
            if(e.code ===13 || e.which ===13){
                e.preventDefault();
                return false;
            }
        });
        document.querySelector(UISelectors.itemList).addEventListener('click',(e)=>{
            if(e.target.classList.contains('edit-item')){
                itemEditSubmit(e.target.parentElement.parentElement);
                e.preventDefault();
            }
        });
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);
        document.querySelector(UISelectors.backBtn).addEventListener('click',(e)=>{
            UICtrl.clearEditState();
            e.preventDefault();
        });
        document.querySelector(UISelectors.clearAllBtn).addEventListener('click',clearAllSubmit)
    };

    const itemAddSubmit = function(e){
        const input = UICtrl.getItemInput();
        if(input.name !== '' && input.calories !== ''){
            // add item
            const newItem = itemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);
            storageCtrl.storeItem(newItem)
        } else {
            //alert
            M.toast({html: 'Input both Meal and Calories!'})
        }
        
        //clear input fields
        UICtrl.clearInput();

        const totalCalories = itemCtrl.getTotalCalories()
        UICtrl.populateTotalCalories(totalCalories);
        e.preventDefault();
    };

    const itemEditSubmit = function(item){
        itemCtrl.setCurrentItem(item);
        UICtrl.enterEditState();
    };

    const itemUpdateSubmit = function(e){
        const input = UICtrl.getItemInput();
        if(input.name !== '' && input.calories !== ''){
            itemCtrl.updateCurrentItem(input.name, input.calories);
            UICtrl.updateCurrentItem();
            //update local storage
            storageCtrl.updateItem(itemCtrl.getCurrentItem());
            UICtrl.clearEditState();
            const totalCalories = itemCtrl.getTotalCalories();
            UICtrl.populateTotalCalories(totalCalories);
        } else {
            //alert
            M.toast({html: 'Input both Meal and Calories!'})
        }
        e.preventDefault();
    };

    const itemDeleteSubmit = function(e){
        itemCtrl.deleteItem();
        storageCtrl.deleteItem(itemCtrl.getCurrentItem())
        UICtrl.deleteItem();
        const items = itemCtrl.getItems(),
              totalCalories = itemCtrl.getTotalCalories();
        if (items.length ===0){
                UICtrl.hideList();
        }
        UICtrl.populateTotalCalories(totalCalories);
        e.preventDefault();
    };

    const clearAllSubmit = function(e){
        itemCtrl.clearAll();
        UICtrl.clearAll();
        storageCtrl.clearAll();
        e.preventDefault();
    }

    return {
        init: function(){
            UICtrl.clearEditState();
            
            const items = itemCtrl.getItems();
            const totalCalories = itemCtrl.getTotalCalories();
            if (items.length ===0){
                UICtrl.hideList();
            }else{
                UICtrl.populateItemList(items);
                UICtrl.populateTotalCalories(totalCalories);
            }

            loadEventListeners();
        }
    }
})(itemCtrl, UICtrl);


App.init();