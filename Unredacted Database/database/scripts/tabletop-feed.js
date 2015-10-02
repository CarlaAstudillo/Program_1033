var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){




    

    initializeTabletopObject('https://docs.google.com/spreadsheets/d/1GzJa6zsNIQHp-tNl_5RY3jtjYvNjYeF6etbYxKBhg6Q/pubhtml');
    $('#title').html("<h2>New Jersey 1033 Program</h2><p>Search our database to see which law enforcement agencies received surplus military weapons and equipment from the U.S. Department of Defense's 1033 Program. The database was obtained from the <a href='http://www.nj.gov/oag/' target='_blank'>N.J. Attorney General’s office</a> through a public records request. This is an active inventory list, which means that the DOD tracks the equipment for as long as the agency has it. However, when it comes to general non-tactical items like office supplies, DOD stops tracking it after a year. Download the raw data <a href='http://s3.amazonaws.com/nj-data/program_1033/database-unredacted/data/NJ-UNREDACTED-1033.csv'>here</a></p>");

});





// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
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
		{'mDataProp': 'agency', 'sTitle': 'Agency', "sWidth": "30%", 'sClass': 'left'},
        {'mDataProp': 'county', 'sTitle': 'County', "sWidth": "10%", 'sClass': 'left'},
        {'mDataProp': 'item', 'sTitle': 'Item', "sWidth": "30%", 'sClass': 'left'},
        {'mDataProp': 'quantity', 'sTitle': 'Quantity', "sWidth": "5%", 'sClass': 'left'},
        {'mDataProp': 'datereceived', 'sTitle': 'Date Received', "sWidth": "10%", 'sClass': 'left'},
        {'mDataProp': 'totalcost', 'sTitle': 'Total Cost', "sWidth": "10%", 'sClass': 'left'}
	];
    return tableColumns;

}


// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-hover" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
		'sPaginationType': 'bootstrap',
		'iDisplayLength': 25,
        'aaSorting': [[ 0, 'asc' ]],
        'aaData': dataSource, 
        'aoColumns': createTableColumns(),
        'oLanguage': {
            'sLengthMenu': '_MENU_ <br>records per page'
        }
    });
var pymChild = new pym.Child(); 

};






//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};

