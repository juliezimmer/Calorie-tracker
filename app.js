// Storage Controller

// Item Controller -  and IIFE that automatically runs
const ItemCtrl = (function(){
   // Item Constructor
   const Item = function(id, name, calories){
      this.id = id;
      this.name = name;
      this.calories = calories;
   }
   // Data Structure or State
   const data = { 
      items: [ 
         // { id:0, name:'Steak dinner', calories: 1200},
         // { id:1, name: 'cookie', calories: 300 },
         // { id:2, name: 'wine', calories: 200 }
      ],
      currentItem: null,
      totalCalories: 0
   }
   // public methods
   return {
      getItems: function () {
         return data.items;
      },
      addItem: function(name, calories){
         let ID;
         // create ID for added item
         if (data.items.length > 0) {
            ID = data.items[data.items.length -1].id + 1;
         } else {
            ID = 0;
         }
         
         // calories need to be parsed to a number 
         calories = parseInt(calories);

         // Create a new item by calling the Item constructor
         newItem = new Item(ID, name, calories);

         // push newItem to the data structure; add to items array
         data.items.push(newItem);
         
         return newItem;
      },
      getItemById: function (id) {
         let found = null;
         // loop through items
         data.items.forEach(function(item){
            if(item.id === id){
               found = item;
            }
         });
         return found;
      },
      updateItem: function(name, calories){
         // parse calories
         calories = parseInt(calories);

         let found = null;
         // this updates the data structure, but not the UI
         data.items.forEach(function(item){
            if(item.id === data.currentItem.id){
               item.name = name;
               item.calories = calories;
               found = item;
            }
         });
         return found;
      },
      deleteItem: function(id){
         // get ids using map method
         const ids = data.items.map(function (item){
            return item.id;
         });

         // get index
         const index = ids.indexOf(id);

         // remove item
         data.items.splice(index, 1);
      },
      clearAllItems: function(){
         data.items = [];
      },
      setCurrentItem: function (item){
         data.currentItem = item;
      },
      getCurrentItem: function(){
         return data.currentItem;
      },
      getTotalCalories: function (){
         let total = 0;
         // Loops through items and adds calories for each item to total
         data.items.forEach(function(item){
            total += item.calories;
         });
         
         // Set total calories in data structure
         data.totalCalories = total;
         
         // Return total
         return data.totalCalories;
      },
      logData: function(){
         return data;
      }
   }
})();

// UI Controller
const UICtrl = (function(){
   // private variable - can't be accessed directly
   const UISelectors = {
      itemList: '#item-list',
      listItems: '#item-list li',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      clearBtn: '.clear-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories'
   }
   // public method
   return {
      populateItemList: function(items){
         // loop through the items using forEach() and insert in the DOM as an <li>.
         // Every time the loop runs, an li is added to the html variable.
         let html = '';  

         items.forEach(function(item){
            html += `<li id="item-${item.id}" class="collection-item">
            <strong>${item.name}: </strong> <em> ${item.calories} calories</em>
            <a href="#" class="secondary-content">
               <i class="edit-item fa fa-pencil"></i>
            </a>
         </li>`;
         });
         // Inserts list-items
         // appends the list items to the foods list
         document.querySelector(UISelectors.itemList).innerHTML = html;
      },
      getItemInput: function (){
         return {
            name:document.querySelector(UISelectors.itemNameInput).value,
            calories:document.querySelector(UISelectors.itemCaloriesInput).value
         }
      },
      addListItem: function(item){
         // Show the list
         document.querySelector(UISelectors.itemList).style.display = 'block';
         // Create li element
         const li = document.createElement('li');
         // Add class
         li.className = 'collection-item';
         // Add ID
         li.id = `item-${item.id}`;
         // Add HTML
         li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
         <a href="#" class="secondary-content">
           <i class="edit-item fa fa-pencil"></i>
         </a>`;
         // Insert item
         document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
      },
      updateListItem: function(item){
         // this creates a node list
         let listItems = document.querySelectorAll(UISelectors.listItems);

         // turn node list into array
         listItems = Array.from(listItems);

         listItems.forEach(function(listItem){
            const itemID = listItem.getAttribute('id');
            if(itemID === `item-${item.id}`) {
               document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
               <a href="#" class="secondary-content">
                 <i class="edit-item fa fa-pencil"></i>
               </a>`;
            }
         });
      },
      deleteListItem: function (id){
         const itemID = `#item-${id}`;
         const item = document.querySelector(itemID);
         item.remove();
      },
      clearInput: function(){
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      addItemToForm: function(){
         document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
         document.querySelector(UISelectors.itemCaloriesInput).value =  ItemCtrl.getCurrentItem().calories;
         UICtrl.showEditState(); // opposite of clearEditState
      },
      removeItems: function(){
         let listItems = document.querySelectorAll(UISelectors.listItems);

         // Turn Node list into array
         listItems = Array.from(listItems);
         listItems.forEach(function(item){
            item.remove();
         });
      },
      hideList: function (){
         document.querySelector(UISelectors.itemList).style.display = 'none';
      },
      showTotalCalories: function (totalCalories) {
         document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
      },
      clearEditState: function (){
         UICtrl.clearInput();
         // this hides the edit buttons
         document.querySelector(UISelectors.updateBtn).style.display = 'none';
         document.querySelector(UISelectors.deleteBtn).style.display = 'none';
         document.querySelector(UISelectors.backBtn).style.display = 'none';
         document.querySelector(UISelectors.addBtn).style.display = 'inline';
      },
      showEditState: function (){
         document.querySelector(UISelectors.updateBtn).style.display = 'inline';
         document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
         document.querySelector(UISelectors.backBtn).style.display = 'inline';
         document.querySelector(UISelectors.addBtn).style.display = 'none';
      },
      getSelectors: function(){
         return UISelectors;
      }
   }
})();

// App Controller - main controller. The other controllers are inserted into this one.  App is set equal to IIFE that will automatically run.
const App = (function(ItemCtrl, UICtrl){
   // Load Event Listeners -  called inside init
   const loadEventListeners = function (){
      // Get UI Selectors
      const UISelectors = UICtrl.getSelectors();
      
      // Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

      // disable submit on enter
      document.addEventListener('keypress', function(e){
         // this uses keyCodes. 13 is the keycode for enter. Some older browsers don't support keyCodes, so OR e.which is used.
         if(e.keyCode === 13 || e.which === 13){
            e.preventDefault();
            return false;
         }
      });

      // Edit Icon click event
      document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
      
      // Update item event
      document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
      
      // Delete item event
      document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

      // Back button event
      document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState); 

      // Clear items event
      document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
   } 
   
   // Add item submit  -  this adds a new item entered into the application. The item is put into the variable/const, newItem. 
   const itemAddSubmit = function (e){
      // Get form input from UI Controller
      const input = UICtrl.getItemInput();
      
      // chek for name and calorie input
      if(input.name !== '' && input.calories !== ''){ // if both meal and calories inputs have text 
         // Add item
         const newItem = ItemCtrl.addItem(input.name, input.calories);
         
         // Add item to DOM list using the addListItem method in the UI Controller.
         UICtrl.addListItem(newItem);

         // get total calories
         const totalCalories = ItemCtrl.getTotalCalories(); 
         // Add total calories to the DOM
         UICtrl.showTotalCalories(totalCalories);

         // Clear Fields
         UICtrl.clearInput();
      }
      
      e.preventDefault();
   }      
    
   // Click Edit item 
   const itemEditClick = function (e) {
      // target the edit icon spedifically
      if(e.target.classList.contains('edit-item')) {
         // get the listItem id
         const listId = e.target.parentNode.parentNode.id;

         // break into an array using the split method
         const  listIdArr = listId.split('-');
         
         // get the actual id
         const id = parseInt(listIdArr[1]);
        
         // get ite,
         const itemToEdit = ItemCtrl.getItemById(id);
        
         // Set current item
         ItemCtrl.setCurrentItem(itemToEdit);
      
         // Add item to form
         UICtrl.addItemToForm();   
      }      
      e.preventDefault();
   }

   // Update item submit
   const itemUpdateSubmit = function(e){
      // get item input
      const input = UICtrl.getItemInput();

      // update item
      // input.name and input.calories came from the form
      const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
      
      // Update UI
      UICtrl.updateListItem(updatedItem);

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories(); 
      // Add total calories to the DOM
      UICtrl.showTotalCalories(totalCalories);

      UICtrl.clearEditState();

      e.preventDefault();
   }

   // Delete Button
   const itemDeleteSubmit = function(e){
      // get current item
      const currentItem = ItemCtrl.getCurrentItem();

      // delete from data structure using ItemCtrl
      ItemCtrl.deleteItem(currentItem.id);
      
      // delete from UI
      UICtrl.deleteListItem(currentItem.id);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      UICtrl.clearEditState();

      e.preventDefault();
   }

   // Clear Items Event
   const clearAllItemsClick = function(){
      // delete all items from data structure
      ItemCtrl.clearAllItems();

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // remove from UI
      UICtrl.removeItems();

      // Hide UL
      UICtrl.hideList();
   }
   // public method
   return {
      init: function (){
         // Clear edit state or set initial state
         UICtrl.clearEditState();
         // Fetch items from data structure
         const items = ItemCtrl.getItems();
         
         // Check if any items
         if (items.length === 0){ // there are no items in the list
            UICtrl.hideList();
         } else { // populate the items in the list
            UICtrl.populateItemList(items);
         }
         
         // Get total calories
         const totalCalories = ItemCtrl.getTotalCalories();
         // add total calories to the DOM
         UICtrl.showTotalCalories(totalCalories);

         // Load event listeners
         loadEventListeners();
      }
   }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();