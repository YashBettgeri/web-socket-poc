function test(){
    updateTable(order);
}

const table = document.getElementById("orders-table");

const order = {"orderId":"12395",
            "orderType": "TP",
            "currencyPair": "USD/INR",
            "orderSide": "Sell",
            "limitPrice":"3.5762",
            "status":"active",
            "totalQuantity":"1000",
            "executedQuanttity":"200",
            "executionType":"aggressive",
            "strategy":"SEEK"};

const childOrders = [["23456","SL", "EUR/JPY", "Buy", "1.2345", "Active", "1000", "100", "Passive", "TWAP"],
                    ["23457","SL", "EUR/JPY", "Buy", "1.2345", "Active", "1000", "100", "Passive", "TWAP"]];

                       
function showChildOrders(id){
    const parentOrdersTable = document.getElementById("orders-table");

    const cells = parentOrdersTable.rows[id].getElementsByTagName('td');
        if(cells[cells.length - 1].textContent === "Child Orders"){
            cells[cells.length - 1].innerHTML = "<button onclick=\"showChildOrders("+id+")\">Child Orders &#x25BC</button>";
        }
        else{
            cells[cells.length - 1].innerHTML = "<button onclick=\"showChildOrders("+id+")\">Child Orders</button>"
        }

    if(parentOrdersTable.rows[id+1].classList.contains("contains-child")){
        parentOrdersTable.rows[id+1].classList.toggle("child-orders");  
    }
    else{
        const rowToInsert = parentOrdersTable.rows[id+1];
        for(var i = 0 ; i < childOrders[0].length ; i++){ //i means type i.e., orderID, status, executionType etc...
            const childOrdersTable = document.createElement("table");
            // childOrdersTable.border="1";
            childOrdersTable.className = "child-orders-table";
            for(var j = 0 ; j < childOrders.length ; j++){ //j means number of values of each type
                const newRow = childOrdersTable.insertRow();
                const newCell = newRow.insertCell();
                newCell.textContent = childOrders[j][i];
            }
            const cellToInsert = rowToInsert.insertCell();
            cellToInsert.appendChild(childOrdersTable)
        }
        rowToInsert.insertCell();
        rowToInsert.classList.add("contains-child");
    }

}

function searchParentOrder(order){
    const table = document.getElementById("orders-table");
    
    const tbody = table.getElementsByTagName("tbody")[0];
    const rows = tbody.getElementsByClassName("parent-orders");

    console.log(rows);
    for(var i = 0 ; i < rows.length ; i++){
        const cells = rows[i].getElementsByTagName('td');
        console.log("actual value : "+cells[0].textContent+" \nexpected value : "+order['orderId']);
        if(cells[0].textContent === order["orderId"]){

            return 2*i+1; //returning +1 to consider thead 1 row
        }
    }
    return -1;
}

function updateTable(order){
    const rowNumber = searchParentOrder(order);
    console.log("order found at "+rowNumber);
    if(rowNumber !== -1){
        console.log("order is being updated");
        updateRow(rowNumber, order);
        
    }
    else{
        console.log("order is being added");
        addRow(order);
    }
}

function updateRow(rowNumber, order){
    const table = document.getElementById("orders-table");
    const row = table.rows[rowNumber];
    const cells = row.getElementsByTagName('td');
    var i = 0;
    for(const key in order){
        cells[i].textContent = order[key];
        i++;
    }
}

function addRow(order){
    
    const numberOfRows = table.rows.length;
    const tbody = table.getElementsByTagName('tbody')[0];
    const newRow = tbody.insertRow();
    newRow.className = "parent-orders";
    const emptyNewRow = tbody.insertRow();

    for(const key in order){
        const newCell = newRow.insertCell();
        newCell.textContent = order[key];
    }

    const childOrderCell = newRow.insertCell();
    childOrderCell.innerHTML = "<button onclick=\"showChildOrders("+numberOfRows+")\">Child Orders</button>"
}

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});




        