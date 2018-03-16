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
      logData: function(){
         return data;
      }
   }
})();

// UI Controller
// UICtrl is set equal to IIFE that will automatically run
const UICtrl = (function(){
   // private variable - can't be accessed directly
   const UISelectors = {
      itemList: '#item-list',
      addBtn: '.add-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories'
   }
   // public method
   return {
      populateItemList: function(items){
         // loop through the items using forEach()
         // Each item is made into a list-item and inserted in the DOM as a li. 
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
            name: document.querySelector(UISelectors.itemNameInput).value,
            calories: document.querySelector(UISelectors.itemCaloriesInput).value
         }
      },
      addListItem: function(item) {
         // Show the list
         document.querySelector(UISelectors.itemList).style.diaplay = 'block';
         // Create <li> element using document.createElement() method
         const li = document.createElement('li');
         // Add a class to the newly created <li>
         li.className = 'collection-item';
         // Add an ID to the newly created <li>,
         li.id = `item-${item.id}`;
         // Add HTML
         li.innerHTML = `<strong>${item.name}: </strong> <em> ${item.calories} calories</em>
         <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
         </a>`;
         // Insert item
         document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
      },
      clearInput: function(){
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      hideList: function (){
         document.querySelector(UISelectors.itemList).style.display = 'none';
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
   }

   // Add item submit  -  this adds a new item entered into the application. The item is put into the variable/const, newItem. 
   const itemAddSubmit = function (e){
      // Get form input from UI Controller
      const input = UICtrl.getItemInput();
      // chek for name and calorie input
      if(input.name !== '' && input.calories !== ''){ // if both meal and calories input have text 
         // Add item
         const newItem = ItemCtrl.addItem(input.name, input.calories);
         // Add item to DOM list using the addListItem method in the UI Controller.
         UICtrl.addListItem(newItem);

         // Clear Fields
         UICtrl.clearInput();

      }
      e.preventDefault();
   }      
   // public method
   return {
      init: function (){
         // Fetch items from data structure
         const items = ItemCtrl.getItems();
         // Check if any items
         if (items.length === 0){ // there are no items in the list
            UICtrl.hideList();
         } else { // populate the items in the list
            UICtrl.populateItemList(items);
         }
         // Load event listeners
         loadEventListeners();
      }
   }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();