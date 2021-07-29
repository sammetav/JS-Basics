var sheet_data;
var x = 3;
const excel_file = document.getElementById('excel_file');
if (excel_file){
excel_file.addEventListener('change', (event) => {
    if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type)) {
        document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';
        excel_file.value = '';
        return false;
    }
    var reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = function (event) {
        var data = new Uint8Array(reader.result);
        var work_book = XLSX.read(data, { type: 'array' });
        var sheet_name = work_book.SheetNames;
        sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });
        console.log(sheet_data);
        formatTable(sheet_data);
        totalHours();   
        HoursPerCustomer();
        excel_file.value = '';
    }


});
}

function formatTable(sheet_data){
var index;
let clone_sheet_data = [...sheet_data];
    if (clone_sheet_data.length > 0) {
        var table_output = '<table class="table table-striped table-bordered">';
        for (var row = 0; row < clone_sheet_data.length; row++) {
            table_output += '<tr>';
            let sheetdata1;
            sheetdata1 = clone_sheet_data[row];
            if (sheetdata1.length > 0)
            {
            
            console.log(sheetdata1);
            for (var cell = 0; cell < sheetdata1.length; cell++) {
                
                if (row == 0) {
                    if (cell <= 2)
                    {
                        table_output += '<th>' + sheetdata1[cell] + '</th>';
                    }
                    else if(cell > 2 && cell == x)
                    {
                        table_output += '<th>' + sheetdata1[cell] + '</th>';
                    }
                    
                }
                else {
                    if (cell <= 2)
                    {
                        table_output += '<td>' + sheetdata1[cell] + '</td>';
                    }
                    else if(cell > 2 && cell == x)
                    {
                        table_output += '<td>' + sheetdata1[cell] + '</td>';
                    }
                    
                }
            }
            if (row == 0)
            {
                table_output += '<th>' + 'Hours Per Customer' + '</th>';
            }
            if (row > 0 && x != null)
            {
                const number = parseInt(sheetdata1.slice(x,x + 1))/100;
                const value  = number * sheet_data[row][2];
                table_output += '<td>' + value + '</td>';
            }
            table_output += '</tr>';
            }
        }

        table_output += '</table>';
        document.getElementById('excel_data').innerHTML = table_output;
        
    }
}

function myFunction(){
    x = document.getElementById("mySelect").value;
    console.log(x);
    formatTable(sheet_data);
}



function totalHours(){
    var hours = [];
    
    for (var row = 1; row < sheet_data.length; row++)
    {
        hours.push(...sheet_data[row].slice(2,3));
    }
    const totalnoHours = hours.reduce((a, e) => a+e);
    console.log(totalnoHours);

    document.getElementById("companyHoursTot").innerHTML = "Company Hours: " + totalnoHours;

}
function HoursPerCustomer(){
    var CShours = [];
    
    for (var row = 1; row < sheet_data.length; row++)
    {
        console.log(sheet_data);
        CShours.push(...sheet_data[row].slice());
    }
    const totalHoursForCustomer = CShours.reduce((a, e) => a+e);
    console.log(totalHoursForCustomer);

    //document.getElementById("HoursPerCustomer").innerHTML = "Company Hours: " + totalHoursForCustomer;

}

function columnE(){
    
}

var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#cmd').click(function () {
    doc.fromHTML($('#printData').html(), 20, 20, {
        'width': 500,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
});

