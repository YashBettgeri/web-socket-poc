
var positions_json = {"customerPosition":{
    "1":{"perCurrencyPosition":{"JPY":34345.3,"EUR":123.35,"USD":134566.0,"CAD":34345.3,"INR":34345.3}},
    "2":{"perCurrencyPosition":{"JPY":34345.3,"EUR":123.35,"USD":134566.0,"CAD":34345.3,"INR":34345.3}},
    "3":{"perCurrencyPosition":{"JPY":34345.3,"EUR":123.35,"USD":134566.0,"CAD":34345.3,"INR":34345.3}}}};

var recordbook_json = {
    'USD/EUR':{
        'identifier':{'BUY':{
            1:{'price':1.235, 'quantity':153},
            2:{'price':1.232, 'quantity':150},
        },
        'SELL':{
            1:{'price':1.239, 'quantity':13},
            2:{'price':1.236, 'quantity':183},
            3:{'price':1.236, 'quantity':183}
        }}
    }
}

var json2 = [
    [
        {'price1':'1.6034', 'quantity1':'123', 'price2' : '1.3565', 'quantity2' : '325'},
        {'price1':'1.6034', 'quantity1':'123', 'price2' : '1.3565', 'quantity2' : '325'},
        {'price1':'1.6034', 'quantity1':'123', 'price2' : '1.3565', 'quantity2' : '325'}
    ],[
        {'price1':'1.6034', 'quantity1':'123', 'price2' : '1.3565', 'quantity2' : '325'},
        {'price1':'1.6034', 'quantity1':'123', 'price2' : '1.3565', 'quantity2' : '325'}
    ],[
        {'price1':'1.6034', 'quantity1':'123', 'price2' : '1.3565', 'quantity2' : '325'},
        {'price1':'1.6034', 'quantity1':'123', 'price2' : '1.3565', 'quantity2' : '325'}
    ]];

function build(){
    publishPositions(positions_json);
    publishBookOfRecords(json2);
}


function deleteChildElements(id){
    var elements = document.querySelector(id).getElementsByTagName('*');
    for(let k = elements.length-1 ; k >= 0 ; k--){
        elements[k].remove();
    }
}



function publishPositions(data){

    //get the div element in which tables are displayed
    var tableContainer = document.querySelector("#table-container-positions");

    //get the keys (user IDs) and values (array of positions key-value pairs) of json in arrays
    var users = Object.keys(data['customerPosition']);
    var positions = Object.values(data['customerPosition']);


    for(var i = 0 ; i < users.length ; i++){
        var table;
        var thead;
        var tbody;
        //check if table already exists
        if(document.querySelector('#positions-table-'+users[i]) === null){

            //creating table, table head and table body and assigning attributes
            table = document.createElement('table');
            thead = document.createElement('thead');
            tbody = document.createElement('tbody');
            table.className = "positions";
            table.id = "positions-table-"+users[i];
            tbody.id = "positions-table-body-"+users[i];


            //adding table head and table body to table
            table.appendChild(thead);
            table.appendChild(tbody);


            //creating first row and adding to table head
            let row_1 = document.createElement('tr');
            let heading = document.createElement('th');
            heading.colSpan = 2;
            heading.innerHTML = users[i];
            row_1.appendChild(heading);

            let row_2 = document.createElement('tr');
            let heading_1 = document.createElement('th');
            heading_1.innerHTML="Currency";
            let heading_2 = document.createElement('th');
            heading_2.innerHTML="Value"
            row_2.appendChild(heading_1);
            row_2.appendChild(heading_2);

            thead.appendChild(row_1);
            thead.appendChild(row_2);
            console.log("table : " +table.id+ " is created");
        }
        else{
            //get existing table's table id and table body id and delete all contents of table body
            const tbodyId = "positions-table-body-"+users[i];
            const tableId = "positions-table-"+users[i];
            table = document.getElementById(tableId);
            tbody = document.getElementById(tbodyId);
            deleteChildElements('#'+tbodyId);
            console.log("table :" +tableId+ " is updated");
        }

        var symbols = Object.keys(positions[i]['perCurrencyPosition']);
        var values = Object.values(positions[i]['perCurrencyPosition']);
        //creating body rows and adding to table body
        for(var j = 0 ; j < symbols.length ; j++){
            var rowData = document.createElement('tr');
            var cell1 = document.createElement('td');
            var cell2 = document.createElement('td');
            cell1.innerHTML=symbols[j];
            cell2.innerHTML=values[j];

            rowData.appendChild(cell1);
            rowData.appendChild(cell2);

            tbody.appendChild(rowData);
        }

        tableContainer.appendChild(table);

    }
    console.log("position tables updated");
}

function publishBookOfRecords(data){
    var tableContainer = document.querySelector("#table-container-order-book");

    //add logic to parse json keys and values content
    //read key values of json
    var symbols = ["EUR/USD","USD/INR","USD/JPY"];
    symbols.forEach((str,index)=> symbols[index] = str.replace('/',''));
    console.log(symbols);

    for(var i = 0 ; i < data.length ; i++){

        var table;
        var thead;
        var tbody;
        if(document.querySelector('#order-book-table-'+symbols[i]) === null){
            //creating table, table head and table body and assigning attributes
            table = document.createElement('table');
            thead = document.createElement('thead');
            tbody = document.createElement('tbody');
            table.className = "order-book";
            table.id = "order-book-table-"+symbols[i];
            tbody.id = "order-book-table-body-"+symbols[i];


            //adding table head and table body to table
            table.appendChild(thead);
            table.appendChild(tbody);

            //creating first row and adding to table head
            let row_1 = document.createElement('tr');
            let heading = document.createElement('th');
            heading.colSpan = 4;
            heading.innerHTML = symbols[i];
            row_1.appendChild(heading);

            //creating second row
            let row_2 = document.createElement('tr');
            let row_2_heading_1 = document.createElement('th');
            let row_2_heading_2 = document.createElement('th');
            row_2_heading_1.colSpan = 2;
            row_2_heading_2.colSpan = 2;
            row_2_heading_1.innerHTML = "BUY";
            row_2_heading_2.innerHTML = "SELL";
            row_2.appendChild(row_2_heading_1);
            row_2.appendChild(row_2_heading_2);

            //creating third row
            let row_3 = document.createElement('tr');
            let row_3_heading_1 = document.createElement('th');
            let row_3_heading_2 = document.createElement('th');
            let row_3_heading_3 = document.createElement('th');
            let row_3_heading_4 = document.createElement('th');
            row_3_heading_1.innerHTML = "Price";
            row_3_heading_2.innerHTML = "Quantity";
            row_3_heading_3.innerHTML = "Price";
            row_3_heading_4.innerHTML = "Quantity";
            row_3.appendChild(row_3_heading_1);
            row_3.appendChild(row_3_heading_2);
            row_3.appendChild(row_3_heading_3);
            row_3.appendChild(row_3_heading_4);

            //adding all rows to table head
            thead.appendChild(row_1);
            thead.appendChild(row_2);
            thead.appendChild(row_3);

            console.log("table : "+table.id+" is created");

        }
        else{
            const tbodyId = "order-book-table-body-"+symbols[i];
            const tableId = "order-book-table-"+symbols[i]
            table = document.getElementById(tableId);
            tbody = document.getElementById(tbodyId);
            deleteChildElements('#'+tbodyId);
            console.log("table : "+tableId+" is updated");
        }

        //add logic to parse json body content
        for(var j = 0 ; j < data[i].length ; j++){
            var dataRow = document.createElement('tr');
            var buyBookPrice = document.createElement('td');
            var buyBookQuantity = document.createElement('td');
            var sellBookPrice = document.createElement('td');
            var sellBookQuantity = document.createElement('td');
            buyBookPrice.innerHTML="sdg";
            buyBookQuantity.innerHTML="sdgfs";
            sellBookPrice.innerHTML="gsg";
            sellBookQuantity.innerHTML="sgsg";

            dataRow.appendChild(buyBookPrice);
            dataRow.appendChild(buyBookQuantity);
            dataRow.appendChild(sellBookPrice);
            dataRow.appendChild(sellBookQuantity);

            tbody.appendChild(dataRow);
        }

        tableContainer.appendChild(table);

    }
    console.log("order book tables updated");

}



