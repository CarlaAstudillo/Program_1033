var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject('0Ah_ynfjTAsO5dGp0c3p5Q3dKU3p0dzdTS1ZwVndsUnc');
    


});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        proxy: 'https://s3.amazonaws.com/nj-apps',
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    
    var tableColumns =   [
        {'mDataProp': 'agency', 'sTitle': 'Agency', 'sClass': 'left', "sWidth": "25%"},
        {'mDataProp': 'county', 'sTitle': 'County', 'sClass': 'left', "sWidth": "10%"},
        {'mDataProp': 'item', 'sTitle': 'Item', 'sClass': 'left', "sWidth": "25%"},

        {'mDataProp': 'quantity', 'sTitle': 'Quantity', 'sClass': 'left', "sWidth": "10%"},
        {'mDataProp': 'cost', 'sTitle': 'Cost (each)', 'sClass': 'left', "sWidth": "15%", "sType": "currency"},
        {'mDataProp': 'date', 'sTitle': 'Date Shipped', 'sClass': 'left', "sWidth": "15%"}
    ];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-hover" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
        'sPaginationType': 'bootstrap',
        'iDisplayLength': 10,
        'aaData': dataSource,
        'aaSorting' : [[1, 'asc']],
        
    "bAutoWidth": false, // Disable the auto width calculation 
        'aoColumns': createTableColumns(),
        'oLanguage': {
            'sLengthMenu': '_MENU_ per page'
        }
    });
};

// Use to sort the table via currency

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function ( a ) {
        a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
        return parseFloat( a );
    },
    
    "currency-asc": function ( a, b ) {
        return a - b;
    },
    
    "currency-desc": function ( a, b ) {
        return b - a;
    }
});

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
    return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
    return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};