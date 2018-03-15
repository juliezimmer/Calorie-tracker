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
      logData: function(){
         return data;
      }
   }
})();

// UI Controller
// UICtrl is set equal to IIFE that will automatically run
const UICtrl = (function(){
   
   // public method
   return {

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
         console.log('Initializing App...'); 
      }
   }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();