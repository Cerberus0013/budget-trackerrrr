let db;

//establishing a connection

const request = indexedDB.open('budget_tracker', 1)

//event listener
request.onupgradeneeded = function(event) {
 
  const db = event.target.result;
  
  db.createObjectStore('new_tracker', { autoIncrement: true });
};
// upon a successful 
request.onsuccess = function(event) {
  /
  db = event.target.result;

  
  if (navigator.onLine) {
    // we haven't created this yet, but we will soon, so let's comment it out for now
    // uploadPizza();
  }
};

request.onerror = function(event) {
  // log error here
  console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions 
  const transaction = db.transaction(['new_tracker'], 'readwrite');

  // access the object store for `new_pizza`
  const pizzaObjectStore = transaction.objectStore('new_tracker');

  // add record to your store with add method
  pizzaObjectStore.add(record);
}