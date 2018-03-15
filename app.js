// Storage Controller

// Item Controller
// ItemCtrl is set equal to IIFE that will automatically run
const ItemCtrl = (function(){
   // Item Constructor
   const Item = function(){
      this.id = id;
      this.name = name;
      this.calories = calories;
   }

   // Data Structure or State
   const data = { 
      items: [ // this is an array of objects
         { id:0, name:'Steak dinner', calories: 1200},
         { id:1, name: 'cookie', calories: 300 },
         { id:2, name: 'wine', calories: 200 }
      ],
      currentItem: null,
      totalCalories: 0
   }
   // public methods
   return {
      getItems: function () {
         return data.items;
      },
      logData: function(){
         return data;
      }
   }
})();

// UI Controller
// UICtrl is set equal to IIFE that will automatically run
const UICtrl = (function(){
   const UISelectors = {
      itemList: '#item-list'
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
                  <a href="#" class="Secondary-content">
                     <i class="edit-item fa fa-pencil"></i>
                  </a>
               </li>`;
         });
         // Inserts list-items
         // appends the list items to the foods list
         document.querySelector(UISelectors.itemLlist).innerHTML = html;
      }
   }
})();

// App Controller - main controller. The other controllers will be inserted into the main or app controller
// App is set equal to IIFE that will automatically run
const App = (function(ItemCtrl, UICtrl){
   console.log(ItemCtrl.logData());
   /* logged to the console:
      {items: Array(3), currentItem: null, totalCalories: 0}
         currentItem: null
         items:(3) [{…}, {…}, {…}]
            0:{id: 0, name: "Steak dinner", calories: 1200}
            1:{id: 1, name: "cookie", calories: 300}
            2:{id: 2, name: "wine", calories: 200}
         totalCalories: null
         __proto__:Object
   */

   return {
      init: function (){
         // Fetch items from data structur
         const items = ItemCtrl.getItems();
         console.log(items);
         /* logged to the console:
            (3) [{…}, {…}, {…}]
               0:{id: 0, name: "Steak dinner", calories: 1200}
               1:{id: 1, name: "cookie", calories: 300}
               2:{id: 2, name: "wine", calories: 200}
               length: 3
         */

         // Populate ul with the items; pass in items that were fetched with the getItems()
         UICtrl.populateItemList(items);
      }
   }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();