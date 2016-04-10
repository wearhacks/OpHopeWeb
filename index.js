//load all transactions saved in localstorage on page load
(function() {
    //if a counter exists then load all transactions
    var counter;
    if(!localStorage.counter){
        return false;
    } else {
        counter = Number(localStorage.counter);
        var i;
        for(i = 0; i <= counter; i++){
            addTableElement(i);
        }
        updateBalance();
    }
})();
// Get the button, and when the user clicks on it, execute saveTransaction
document.getElementById("submit").onclick = function() {saveTransaction()};
/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function saveTransaction() {
    //grab the data and save to vars
    var type = document.forms["new_transaction"]["type"].value;
    var description = document.forms["new_transaction"]["description"].value;
    var amount = document.forms["new_transaction"]["amount"].value;

    //validate the data
    if (type == null || type == "") {
        alert("You must select the Type of transaction");
        return false;
    }
    if (description == null || description == "") {
        alert("You must provide a Description of the transaction");
        return false;
    }
    if (amount == null || amount == "") {
        alert("You must specify the Amount of the transaction");
        return false;
    }

    //convert to object
    var transaction = {};
    transaction['type'] = type;
    transaction['description'] = description;
    transaction['amount'] = amount;

    //initialise counter to keep track of how many transactions there are so far
    var counter;
    if(!localStorage.counter){
        counter = 0;
    } else {
        counter = Number(localStorage.counter) + 1;
    }

    //save to local storage
    localStorage.setItem(counter, JSON.stringify(transaction));
    localStorage.setItem("counter", counter);
    console.log("object saved: ", JSON.parse(localStorage.getItem(counter)));

    //add table element
    addTableElement(counter);


    //clear form inputs
    document.forms["new_transaction"]["type"].value = '';
    document.forms["new_transaction"]["description"].value = '';
    document.forms["new_transaction"]["amount"].value = '';
    
    updateBalance();

}

function addTableElement(counter){
    var transaction = JSON.parse(localStorage.getItem(counter));
    //add table element
    //get the table tbody
    var transactions = document.getElementById('transactions');
    //add content to the new element just created
    //create the td elements
    var type_node = document.createElement("td");
    var description_node = document.createElement("td");
    var amount_node = document.createElement("td");
    //append data to the td elements
    type_node.appendChild(document.createTextNode(transaction.type));
    description_node.appendChild(document.createTextNode(transaction.description));
    amount_node.appendChild(document.createTextNode(transaction.amount));
    //append the td elemets to one tr element
    var transaction_node = document.createElement("tr");
    transaction_node.appendChild(type_node);
    transaction_node.appendChild(description_node);
    transaction_node.appendChild(amount_node);
    //append tr to tbody
    transactions.appendChild(transaction_node);
}

function updateBalance(){
    var counter;
    if(!localStorage.counter){
        return false;
    } else {
        counter = Number(localStorage.counter);
        var i, transaction, sum = 0;
        for(i = 0; i <= counter; i++){
            transaction = JSON.parse(localStorage.getItem(i));
            if(transaction.type == "Expense")
                sum = sum - Number(transaction.amount);
            if(transaction.type == "Income")
                sum = sum + Number(transaction.amount);
        }
        
        var balance = document.getElementById("balance");
        balance.innerHTML = sum;
    }
}