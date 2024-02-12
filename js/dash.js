document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the username from local storage
    var uname = localStorage.getItem("name");

    // Select the element with id "utimeline"
    var utimelineElement = document.getElementById("utimeline");

    // Fetch data from the server (replace 'your_api_endpoint' with the actual API endpoint)
    var gas = 'https://script.google.com/macros/s/AKfycby0bCwNY5tyoVzfb1aM_48Yvs0PInOqUEnb_Aw2Bdyt4t2dBQ-m3FBA4lkMtmgaYHC53w/exec';
    var qdata = `?id=${localStorage.getItem("refid")}&db=${localStorage.getItem("db1")}`;

    fetch(gas + qdata)
        .then(response => response.json())
        .then(data => {
            if (data.cc && data.cc.length > 0) {
                // Assuming the server response has a property named 'cc' and 'intime'
                var timelineData = `${uname} : การปฏิบัติงาน ${data.cc[0].intype} , ลงเวลาเมื่อ ${data.cc[0].intime} , ระยะ ${data.cc[0].indistan} ${data.cc[0].inunit}, พิกัด ${data.cc[0].geo}`; // Assuming you want the first 'intime' value

                // Set the text content of the element with the fetched data
                utimelineElement.innerText = timelineData;
            } else {
                var timelineData = `${uname} : ยังไม่ลงเวลาในการปฏิบัติงาน `;
                utimelineElement.innerText = timelineData;
              //  console.error('Invalid or empty server response:', data);
           
                // Handle errors or empty responses here
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle fetch errors here
        });
// เรียกรายงานลงเวลาประจำเดือน
// รับวันที่ปัจจุบัน
var currentDate = new Date();

// ดึงปีและเดือน
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; // เดือนเริ่มต้นที่ 0 (มกราคม) ดังนั้นต้องเพิ่ม 1

// รูปแบบ yyyymm
var formattedDate = year.toString() + (month < 10 ? '0' : '') + month.toString();

//console.log(formattedDate); // ผลลัพธ์เช่น "202402" (สำหรับเดือนกุมภาพันธ์ 2024)
fetchData(formattedDate);
    
});


document.addEventListener("DOMContentLoaded", function () {
    var mainsub = localStorage.getItem("mainsub");

    var report01 = document.getElementById("report01");
    var report02 = document.getElementById("report02");
    var report03 = document.getElementById("report03");
    var report04 = document.getElementById("report04");

    var gas = 'https://script.google.com/macros/s/AKfycbwXgExfjt-vFLKmdIJfxh1GyLopWF2BULEXcMhUvMqbyJg5eWfdUug2NOKRQ2XmUbLW/exec';
    var qdata = `?sub=${mainsub}`;

    fetch(gas + qdata)
        .then(response => response.json())
        .then(data => {
            var targetValues = {
                report01: data.cc[0].req,
                report02: data.cc[0].allow,
                report03: data.cc[0].all,
                report04: data.cc[0].check
            };

            animateNumbers(report01, targetValues.report01, 1000);
            animateNumbers(report02, targetValues.report02, 1000);
            animateNumbers(report03, targetValues.report03, 1000);
            animateNumbers(report04, targetValues.report04, 1000);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors here
        });

    function animateNumbers(element, targetValue, duration) {
        var startValue = 0;
        var startTime;

        function updateNumber(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;
            var percentage = Math.min(progress / duration, 1);

            var currentValue = startValue + percentage * (targetValue - startValue);

            // Format the number with commas if it's greater than 3
            var formattedValue = currentValue > 3 ? numberWithCommas(Math.round(currentValue)) : Math.round(currentValue);

            element.innerText = formattedValue;

            if (percentage < 1) {
                requestAnimationFrame(updateNumber);
            }
        }

        requestAnimationFrame(updateNumber);
    }

    // Function to add commas to a number
    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});



function sheet1() {
    var role = localStorage.getItem("role");
    var mainsub = localStorage.getItem("mainsub");

    var uuid = localStorage.getItem("uuid");
    var cid = localStorage.getItem("cidhash");
    var ggform = `https://docs.google.com/forms/d/e/1FAIpQLSe6rQO7Za36aVclMHeOqmTvz96JpYYmSPQrnb0wT0za85CbRw/viewform?usp=pp_url&entry.2080721284=${uuid}&entry.830072577=${cid}&entry.359101490=SekaTime`;

    if (role !== "user" && role !== null && role !== undefined) {
        Swal.fire({
            title: 'ดำเนินการต่อ',
            text: 'หากไม่สามารถเข้าถึงข้อมูลได้ ให้แจ้ง gmail เพื่อเพิ่มสิทธิ์ในการเข้าถึงข้อมูล',
            icon: 'success',
            confirmButtonText: 'ตกลง',
            footer: `<a href="${ggform}" target="_blank">แจ้ง G-Mail</a>`
        }).then((result) => {
            if (result.isConfirmed) {
                if (mainsub == 'สสอ.เซกา') {
                    window.open('https://docs.google.com/spreadsheets/d/1PDnuSZKZl-kIcLwsLGKKkd0QSPKfljY9dfHBaf2InCI/edit', '_blank');
                } else if (mainsub == 'สสจ.บึงกาฬ') {
                    window.open('https://docs.google.com/spreadsheets/d/18m82mO9zpcI9EXSAwqEqClPABrxpjRPz2UGSZ9G7qZ4/edit', '_blank');
                // } else if (mainsub == 'สสอ.บึงกาฬ') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.พรเจริญ') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.โซ่พิสัย') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.ปากคาด') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.บึงโขงหลง') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.ศรีวิไล') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.บุ่งคล้า') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                } else {
                    // Display a Swal.fire notification for unknown code values
                    Swal.fire({
                        title: 'แจ้งเตือน',
                        text: 'ไม่พบลิงค์ที่เกี่ยวข้องกับหน่วยงานของท่าน',
                        icon: 'warning',
                        confirmButtonText: 'ตกลง'
                    });
                }
            }
        });
    } else {
        Swal.fire({
            title: 'ปฏิเสธ',
            text: 'ไม่อนุญาตให้เข้าถึงข้อมูล เฉพาะผู้ดูแลระบบ หัวหน้าหน่วยงาน ผู้อำนวยการ และผู้บริหารเท่านั้น',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
    }
}


function looker() {
    var role = localStorage.getItem("role");
    var mainsub = localStorage.getItem("mainsub");

    var uuid = localStorage.getItem("uuid");
    var cid = localStorage.getItem("cidhash");
    var ggform = `https://docs.google.com/forms/d/e/1FAIpQLSe6rQO7Za36aVclMHeOqmTvz96JpYYmSPQrnb0wT0za85CbRw/viewform?usp=pp_url&entry.2080721284=${uuid}&entry.830072577=${cid}&entry.359101490=SekaTime`;

    if (role !== null && role !== undefined) {
        Swal.fire({
            title: 'ดำเนินการต่อ',
           // text: 'หากไม่สามารถเข้าถึงข้อมูลได้ ให้แจ้ง gmail เพื่อเพิ่มสิทธิ์ในการเข้าถึงข้อมูล',
            icon: 'success',
            confirmButtonText: 'ตกลง',
         //   footer: `<a href="${ggform}" target="_blank">แจ้ง G-Mail</a>`
        }).then((result) => {
            if (result.isConfirmed) {
                if (mainsub == 'สสอ.เซกา') {
                    window.open('https://lookerstudio.google.com/reporting/ff395d88-d610-4664-9625-d867d1b00304', '_blank');
                } else if (mainsub == 'สสจ.บึงกาฬ') {
                    window.open('https://lookerstudio.google.com/reporting/610860af-4711-4ba0-8ebd-f74bf0e819b9', '_blank');
                // } else if (mainsub == 'สสอ.บึงกาฬ') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.พรเจริญ') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.โซ่พิสัย') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.ปากคาด') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.บึงโขงหลง') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.ศรีวิไล') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                // } else if (mainsub == 'สสอ.บุ่งคล้า') {
                //     window.open('ลิงค์ที่ต้องการ 2', '_blank');
                } else {
                    // Display a Swal.fire notification for unknown code values
                    Swal.fire({
                        title: 'แจ้งเตือน',
                        text: 'ไม่พบลิงค์ที่เกี่ยวข้องกับหน่วยงานของท่าน',
                        icon: 'warning',
                        confirmButtonText: 'ตกลง'
                    });
                }
            }
        });
    } else {
        Swal.fire({
            title: 'ปฏิเสธ',
            text: 'ไม่อนุญาตให้เข้าถึงข้อมูล เฉพาะผู้ดูแลระบบ หัวหน้าหน่วยงาน ผู้อำนวยการ และผู้บริหารเท่านั้น',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
    }
}

function dashboardlooker() {
    Swal.fire({
        title: 'Oops...',
        text: 'อยู่ระหว่างการพัฒนา',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
    });
}



function showSwal() {
    // แสดงป๊อปอัพ Swal.fire เมื่อคลิกที่ลิงก์
    Swal.fire({
      title: 'ลงเวลา OT',
      text: 'คุณต้องการลงเวลา OT ใช่หรือไม่?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.isConfirmed) {
        // กระทำเมื่อผู้ใช้คลิก "ใช่"
        Swal.fire('อยู่ระหว่างการพัฒนา!', '', 'warning');
        // สามารถเพิ่มโค้ดเพื่อทำลายลิงก์หรือดำเนินการอื่น ๆ ตามที่ต้องการได้
      } else {
        // กระทำเมื่อผู้ใช้คลิก "ไม่" หรือปิดป๊อปอัพ
        Swal.fire('ยกเลิกการลงเวลา OT', '', 'info');
      }
    });
  }


async function fetchData(formattedDate) {
    const cid = localStorage.getItem("cidhash");
    const db1 = localStorage.getItem("db1");
    // Replace the URL with your actual API endpoint
    var apiUrl = 'https://script.google.com/macros/s/AKfycbwjLcT7GFTETdwRt_GfU6j-8poTK6_t400RPLa4cMY72Ih3EYAWQIDyFQV0et7lMQG2LQ/exec';

    // Construct the query parameters based on your requirements
    var queryParams = `?startdate=${formattedDate}&cid=${cid}&db=${db1}`;

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
                "order": [[22, 'asc'], [5, 'asc']],
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
