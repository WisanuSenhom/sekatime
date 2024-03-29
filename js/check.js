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
    var UUID = localStorage.getItem("uuid");
    // console.log(sDate);
    // console.log(eDate);
    // console.log(UUID);
    // console.log(limit);
    showLoader()
    // Replace the URL with your actual API endpoint
    var apiUrl = 'https://script.google.com/macros/s/AKfycbxcOFBkv6nyx4Vpl47Po97TLfg_PLwUvl5PC3MY4ukdvINc4_KJTi8PtrXqcskuhgUZWw/exec';

    // Construct the query parameters based on your requirements
    var queryParams = `?sdate=${sDate}&edate=${eDate}&limit=${limit}&id=${UUID}`;

    // Make a GET request using Fetch API
    await fetch(apiUrl + queryParams)
        .then(response => response.json())
        .then(data => {
            //  console.log(data);
            const reporttb = document.getElementById("reportdata");
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

                    { "data": 'ref' }

                ],
                "language": {
                    "url": 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json',
                },
                "processing": true,
                "responsive": true,
                "autoFill": true,
                "select": true,
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

                "pageLength": 30,

                "buttons": [
                    {
                        text: 'ตรวจสอบรายบุคคล',
                        action: async function () {
                            var selectedRows = $('#dreportdata').DataTable().rows({ selected: true }).data();
                        
                            if (selectedRows.length > 0) {
                                var selectedId = selectedRows[0].ref;
                        
                                const { value: status } = await Swal.fire({
                                    title: "Select RefNo. : " + selectedId,
                                    input: "select",
                                    inputOptions: {
                                      ปฏิบัติงานจริง: "ปฏิบัติงานจริง",
                                        ไม่ได้ปฏิบัติงาน: "ไม่ได้ปฏิบัติงาน",
                                    },
                                    inputPlaceholder: "เลือกการตรวจสอบ",
                                    showCancelButton: true,
                                    inputValidator: (value) => {
                                        return new Promise((resolve) => {
                                            if (value !== '') {
                                                resolve();
                                            } else {
                                                resolve("Please select");
                                            }
                                        });
                                    }
                                });
                        
                                if (status) {
                                    const { isConfirmed } = await Swal.fire({
                                        title: 'ยืนยันการเลือก',
                                        text: `คุณต้องการยืนยันการ ${status} หรือไม่?`,
                                        icon: 'question',
                                        showCancelButton: true,
                                    });
                        
                                    if (isConfirmed) {
                                        // User confirmed, proceed with the fetch request
                                        fetch(`https://script.google.com/macros/s/AKfycbz8sQAQRVABFmSh8wXUs_Mc7Fk0t-9psUsTULSGarOYh2hE4jA8OYX4krRLeTENExCAOA/exec?ref=${selectedId}&sts=${status}&id=${UUID}`)
                                            .then(response => response.json())
                                            .then(data => {
                                                // Process the response data if needed
                                                Swal.fire({
                                                    title: "สำเร็จ!",
                                                    text: "บันทึกข้อมูลเรียบร้อยแล้ว!",
                                                    icon: "success"
                                                  }).then(() => {
                                                    location.reload();
                                                  });
                                            });
                                    } else {
                                        // User canceled the confirmation
                                        Swal.fire('การเลือกถูกยกเลิก');
                                    }
                                }
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "No row selected!"
                                });
                            }
                        }                        
                    }
                   ,
                    {
                        text: 'ตรวจสอบตามช่วงวันที่',
                        action: function () {
                            var refArray = $('#dreportdata').DataTable().column(10, { search: 'applied' }).data().toArray()
                            console.log(refArray);
                            var count = refArray.length;
                           // console.log('Number of elements in the array:', count);

                            Swal.fire({
                                title: "คุณต้องการ.! ยืนยันการมาปฏิบัติงานจริงหรือไม่?",
                                icon: "warning",
                                html: " จำนวน " + count + " รายการ",
                                showCancelButton: true, // Show Cancel button
                                confirmButtonText: "ตกลง", // Text for the Confirm button
                                cancelButtonText: "ยกเลิก", // Text for the Cancel button
                            })
                                .then((result) => {
                                    // Check if the user clicked "ตกลง"
                                    if (result.isConfirmed) {
                                   
                                    //    let    xxfetch = (`https://script.google.com/macros/s/AKfycbws7_FeW7jhLHWVrE64QXdwYDz4gSI8k5zsG4jk48hnWkhDklTOmM1moc_PR69T2Sb6/exec?ref=${refArray}&id=${UUID}`)
                                 //  console.log(xxfetch);
                                        // Call the fetch function
                                        fetch(`https://script.google.com/macros/s/AKfycbw6JFOKVaKHvVWQ-9_LVzxKW-xNaJXfyKltpiE-aUuPi0kHy4bQ9es41L56nbxMvxOH/exec?ref=${refArray}&id=${UUID}`)
                                            .then(response => response.json())
                                            .then(data => {
                                                // Process the data as needed
                                           //     console.log(data);
                                                // Show a success SweetAlert notification
                                                Swal.fire({
                                                    title: "สำเร็จ!",
                                                    text: "บันทึกข้อมูลเรียบร้อยแล้ว!",
                                                    icon: "success"
                                                  }).then(() => {
                                                    location.reload();
                                                  });
                                            })
                                            .catch(error => {
                                                // Handle errors
                                                console.error('Error during fetch:', error);
                                                // Show an error SweetAlert notification
                                                Swal.fire("เกิดข้อผิดพลาด!", "กรุณาลองใหม่อีกครั้ง", "error");
                                            });
                                    } else {
                                        // User clicked "ยกเลิก"
                                        // Handle the cancellation or perform any other action
                                    }
                                });

                        }
                    },
                    {
                        text: 'ตรวจสอบทั้งหมด',
                        action: function () {
                            var refArray = $('#dreportdata').DataTable().column(10, { search: 'applied' }).data().toArray()
                            console.log(refArray);
                            var count = refArray.length;
                            console.log('Number of elements in the array:', count);

                            Swal.fire({
                                title: "คุณต้องการ.! ยืนยันการมาปฏิบัติงานจริงทั้งหมดหรือไม่?",
                                icon: "warning",
                                // html: " จำนวน " + count + " รายการ",
                                showCancelButton: true, // Show Cancel button
                                confirmButtonText: "ตกลง", // Text for the Confirm button
                                cancelButtonText: "ยกเลิก", // Text for the Cancel button
                            })
                                .then((result) => {
                                    // Check if the user clicked "ตกลง"
                                    if (result.isConfirmed) {
                                        // Call the fetch function
                                        fetch(`https://script.google.com/macros/s/AKfycbwibq-LO6vgRVFFqfyjYXiUQ91ZIzU24zaAmxrqMbkM-xu-m_DWNBRae-a8vx-c0cXN/exec?id=${UUID}`)
                                            .then(response => response.json())
                                            .then(data => {
                                                // Process the data as needed
                                                console.log(data);
                                                // Show a success SweetAlert notification
                                                Swal.fire({
                                                    title: "สำเร็จ!",
                                                    text: "บันทึกข้อมูลเรียบร้อยแล้ว!",
                                                    icon: "success"
                                                  }).then(() => {
                                                    location.reload();
                                                  });
                                            })
                                            .catch(error => {
                                                // Handle errors
                                                console.error('Error during fetch:', error);
                                                // Show an error SweetAlert notification
                                                Swal.fire("เกิดข้อผิดพลาด!", "กรุณาลองใหม่อีกครั้ง", "error");
                                            });
                                    } else {
                                        // User clicked "ยกเลิก"
                                        // Handle the cancellation or perform any other action
                                    }
                                });

                        }
                    }
                    ,'excel', 'print'


                ] // button end
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
