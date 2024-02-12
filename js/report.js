$(document).ready(function () {
    hideLoader()
    var currentDate = new Date();
    var yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() );

    var formattedDate = yesterday.toISOString().split('T')[0]; // Get YYYY-MM-DD part
    $("#startDate").val(formattedDate);
    $("#endDate").val(formattedDate);
});

$("#startDate, #endDate").datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    onClose: function (dateText, inst) {
        $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay));
    }
});

$("#dateRangeForm").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting to the URL specified in the action attribute

    // Get the start and end dates
    var startDate = $("#startDate").datepicker("getDate");
    var endDate = $("#endDate").datepicker("getDate");
    var limit = $("#limit").val();


    // Check if either start or end date is empty
    if (!startDate || !endDate) {
        alert("Please select both a start date and an end date");
        return; // Stop further processing
    }

    // Check if the start date is less than or equal to the end date
    if (startDate <= endDate) {
        // Format the start and end dates in "yymmdd" format
        var sDate = $.datepicker.formatDate("yymmdd", startDate);
        var eDate = $.datepicker.formatDate("yymmdd", endDate);

        // Call the getdata function with the formatted dates
        fetchData(sDate, eDate, limit);

    } else {
        alert("Please select a start date that is less than or equal to the end date");
    }
});


// Function to fetch data asynchronously
async function fetchData(sDate, eDate, limit) {
    const xmain = localStorage.getItem("mainsub");
    const xsub = localStorage.getItem("office");
    const db = localStorage.getItem("db1");
    const adm = localStorage.getItem("role");
    const cid = localStorage.getItem("cidhash");
    showLoader()
    // Replace the URL with your actual API endpoint
    var apiUrl = 'https://script.google.com/macros/s/AKfycbwQumXiT60GPOriFA0OXuz2oBWQu55Hz0ZCdLw6ifPyeUEUdqfuhDxIm_8lI6qMY6F-uA/exec';

    // Construct the query parameters based on your requirements
    var queryParams = `?sdate=${sDate}&edate=${eDate}&limit=${limit}&cid=${cid}&xmain=${xmain}&xsub=${xsub}&adm=${adm}&db=${db}`;

    // Make a GET request using Fetch API
    await fetch(apiUrl + queryParams)
        .then(response => response.json())
        .then(data => {
            //  console.log(data);
            const reporttb = document.getElementById("reportdata");
            reporttb.innerHTML ="";
            let datartb = '';
            data.tst.forEach(function (tst) {
                datartb += `<tr>
                <td>${tst.day}</td>
                <td>${tst.datein}</td>
                <td>${tst.name}</td>
                <td>${tst.subname}</td>
                <td>${tst.typein}</td>
                <td>${tst.timein}</td>
                <td>${tst.disin}</td>
                <td>${tst.timeout}</td>
                <td>${tst.disout}</td>
                <td>${tst.notein}</td>

                <td>${tst.request}</td> 
                <td>${tst.reqdate}</td>   
                <td>${tst.reqtime}</td> 

                <td>${tst.permitdate}</td> 
                <td>${tst.permittime}</td>       
                <td>${tst.permitname}</td>       
                <td>${tst.permit_note}</td>    
        

                <td>${tst.verified}</td>
                <td>${tst.verifiedname}</td>
                <td>${tst.verified_note}</td>
                <td>${tst.verifieddate}</td>
                <td>${tst.verifiedtime}</td>

                <td>${tst.ref}</td>
          
            </tr>`
            })
            // console.log(datartb);
            reporttb.innerHTML = datartb;
            hideLoader()
            $('#dreportdata').DataTable({
                "data": data.tst,
                "columns": [
                    { "data": 'day' },
                    { "data": 'datein' },
                    { "data": 'name' },
                    { "data": 'subname' },
                    { "data": 'typein' },
                    { "data": 'timein' },
                    { "data": 'disin' },
                    { "data": 'timeout' },
                    { "data": 'disout' },
                    { "data": 'notein' },

                    { "data": 'request' },
                    { "data": 'reqdate' },
                    { "data": 'reqtime' },

                    { "data": 'permitdate' },
                    { "data": 'permittime' },
                    { "data": 'permitname' },
                    { "data": 'permit_note' },
            
                    { "data": 'verified' },
                    { "data": 'verifiedname' },
                    { "data": 'verified_note' },
                    { "data": 'verifieddate' },
                    { "data": 'verifiedtime' },
                    { "data": 'ref' }

                ],
                "language": {
                    "url": 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json',
                },
                "processing": true,
                "responsive": true,
                "autoFill": true,
              //  "select" : true,
                "order": [[1, 'asc'], [5, 'asc']],
                // "columnDefs": [
                //     {
                //         "targets": 0,
                //         "render": DataTable.render.datetime('ddd Do MMM YY')
                //     }
                // ],
                "colReorder": true,
                // "fixedColumns": true,
                "fixedHeader": true,
                "keys": true,
                "dom": 'lBfrtip', // เพิ่ม 'l' เพื่อแสดง "Show [n] entries"
                "lengthMenu": [ [10, 30, 50, 100, 150, -1], [10, 30, 50, 100, 150, "ทั้งหมด"] ], // รายการตัวเลือกในปุ่ม
                "buttons": [
                    'excel', 'print',
                ],
                "pageLength": 30
            });
        });

}

const loader = document.getElementById('loader');

function showLoader() {
    loader.style.display = 'block'; // แสดง loader
}

function hideLoader() {
    loader.style.display = 'none'; // ซ่อน loader
}
