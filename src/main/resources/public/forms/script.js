
var positions_json = {"customerPosition":{
    "1":{"perCurrencyPosition":{"JPY":34345.3,"EUR":123.35,"USD":134566.0,"CAD":34345.3,"INR":34345.3}},
    "2":{"perCurrencyPosition":{"JPY":34345.3,"EUR":123.35,"USD":134566.0,"CAD":34345.3,"INR":34345.3}},
    "3":{"perCurrencyPosition":{"JPY":34345.3,"EUR":123.35,"USD":134566.0,"CAD":34345.3,"INR":34345.3}}}};

var orderbook_json =
{"buySideOrderBook":
    {"EUR/USD":[{"customerId":100,"adjustedPrice":78.0,"price":78.0,"qty":120.0,"side":"BUY","symbol":"EUR/USD"},
                {"customerId":101,"adjustedPrice":88.0,"price":88.0,"qty":123.0,"side":"BUY","symbol":"EUR/USD"}],
    "USD/CAD":[{"customerId":100,"adjustedPrice":78.0,"price":78.0,"qty":120.0,"side":"BUY","symbol":"EUR/USD"},
                {"customerId":101,"adjustedPrice":88.0,"price":88.0,"qty":123.0,"side":"BUY","symbol":"EUR/USD"}]},
"sellSideOrderBook":
    {"EUR/USD":[{"customerId":103,"adjustedPrice":76.0,"price":76.0,"qty":194.0,"side":"SELL","symbol":"EUR/USD"},
                {"customerId":104,"adjustedPrice":73.0,"price":73.0,"qty":194.0,"side":"SELL","symbol":"EUR/USD"},
                {"customerId":105,"adjustedPrice":71.0,"price":71.0,"qty":194.0,"side":"SELL","symbol":"EUR/USD"}],
    "USD/JPY":[{"customerId":100,"adjustedPrice":78.0,"price":78.0,"qty":120.0,"side":"BUY","symbol":"EUR/USD"},
                {"customerId":101,"adjustedPrice":88.0,"price":88.0,"qty":123.0,"side":"BUY","symbol":"EUR/USD"}]}};



function build(){
    publishPositions(positions_json);
    publishOrderBook(orderbook_json);
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



function publishBuyOrderBook(buySideSymbols, buySideOrderBooks){
    for(var i = 0 ; i < buySideSymbols.length ; i++){
        var tableId = 'order-book-table-'+buySideSymbols[i].replace('/','');
        var tbodyId = '#order-book-table-body-'+buySideSymbols[i].replace('/','');
        createOrderBookTableSkeleton(buySideSymbols[i]);
        console.log("table : "+tableId+" is created");

        for(var j = 0 ; j < buySideOrderBooks[i].length ; j++){
            var dataRow = document.createElement('tr');
            dataRow.id = tableId+"-data-row-"+j;
            var buyBookPrice = document.createElement('td');
            var buyBookQuantity = document.createElement('td');
            var sellBookPrice = document.createElement('td');
            var sellBookQuantity = document.createElement('td');
            buyBookPrice.innerHTML=buySideOrderBooks[i][j]['price'];
            buyBookQuantity.innerHTML=buySideOrderBooks[i][j]['qty'];
            sellBookPrice.innerHTML = "";
            sellBookQuantity.innerHTML = "";


            dataRow.appendChild(buyBookPrice);
            dataRow.appendChild(buyBookQuantity);
            dataRow.appendChild(sellBookPrice);
            dataRow.appendChild(sellBookQuantity);

            document.getElementById(tbodyId).appendChild(dataRow);
        }
    }
}

function publishSellOrderBook(sellSideSymbols, sellSideOrderBooks){
    for(var i = 0 ; i < sellSideSymbols.length ; i++){
        var tableId = 'order-book-table-'+sellSideSymbols[i].replace('/','');
        var tbodyId = '#order-book-table-body-'+sellSideSymbols[i].replace('/','');
        console.log(tableId + " : "+document.getElementById(tableId));
        if(document.getElementById(tableId) === null || document.getElementById(tableId) === undefined){
            createOrderBookTableSkeleton(sellSideSymbols[i]);
            console.log("table : "+tableId+" is created");
            for(var j = 0 ; j < sellSideOrderBooks[i].length ; j++){
                var dataRow = document.createElement('tr');
                dataRow.id = tableId+"-data-row-"+j;
                var buyBookPrice = document.createElement('td');
                var buyBookQuantity = document.createElement('td');
                var sellBookPrice = document.createElement('td');
                var sellBookQuantity = document.createElement('td');

                buyBookPrice.innerHTML="";
                buyBookQuantity.innerHTML="";
                sellBookPrice.innerHTML=sellSideOrderBooks[i][j]['price'];
                sellBookQuantity.innerHTML=sellSideOrderBooks[i][j]['qty'];

                dataRow.appendChild(buyBookPrice);
                dataRow.appendChild(buyBookQuantity);
                dataRow.appendChild(sellBookPrice);
                dataRow.appendChild(sellBookQuantity);

                document.getElementById(tbodyId).appendChild(dataRow);
            }
        }
        else{
            for(var j = 0 ; j < sellSideOrderBooks[i].length ; j++){
                var dataRowId = tableId+"-data-row-"+j;
                if(document.getElementById(dataRowId) === null ){
                    var dataRow = document.createElement('tr');
                    var buyBookPrice = document.createElement('td');
                    var buyBookQuantity = document.createElement('td');
                    var sellBookPrice = document.createElement('td');
                    var sellBookQuantity = document.createElement('td');

                    buyBookPrice.innerHTML="";
                    buyBookQuantity.innerHTML="";
                    sellBookPrice.innerHTML=sellSideOrderBooks[i][j]['price'];
                    sellBookQuantity.innerHTML=sellSideOrderBooks[i][j]['qty'];

                    dataRow.appendChild(buyBookPrice);
                    dataRow.appendChild(buyBookQuantity);
                    dataRow.appendChild(sellBookPrice);
                    dataRow.appendChild(sellBookQuantity);

                    document.getElementById(tbodyId).appendChild(dataRow);
                }
                else{
                    var dataRowElements = document.getElementById(dataRowId).getElementsByTagName('td');
                    dataRowElements[2].innerHTML = sellSideOrderBooks[i][j]['price'];
                    dataRowElements[3].innerHTML = sellSideOrderBooks[i][j]['qty'];

                }
            }
        }
    }
}

function publishOrderBook(data){
    var buySideSymbols= Object.keys(data['buySideOrderBook']);
    var sellSideSymbols= Object.keys(data['sellSideOrderBook']);
    var buySideOrderBooks = Object.values(data['buySideOrderBook']);
    var sellSideOrderBooks = Object.values(data['sellSideOrderBook']);

    publishBuyOrderBook(buySideSymbols, buySideOrderBooks);
    publishSellOrderBook(sellSideSymbols, sellSideOrderBooks);
}



function createOrderBookTableSkeleton(symbol){
    var tableContainer = document.querySelector("#table-container-order-book");
    var table;
    var thead;
    var tbody;
    //creating table, table head and table body and assigning attributes
    table = document.createElement('table');
    thead = document.createElement('thead');
    tbody = document.createElement('tbody');
    table.className = "order-book";
    table.id = 'order-book-table-'+symbol.replace('/','');
    tbody.id = '#order-book-table-body-'+symbol.replace('/','');

    //adding table head and table body to table
    table.appendChild(thead);
    table.appendChild(tbody);

    //creating first row and adding to table head
    let row_1 = document.createElement('tr');
    let heading = document.createElement('th');
    heading.colSpan = 4;
    heading.innerHTML = symbol;
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

    tableContainer.appendChild(table);
}



