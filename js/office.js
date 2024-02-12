document.addEventListener('DOMContentLoaded', async function () {
    //   hideLoader()
    // สำหรับแสดง css โหลด
    showLoader()
    // เมื่อหน้าเว็บโหลดเสร็จ, ดึงข้อมูล category และใส่ใน dropdown
    await fetch(`https://script.google.com/macros/s/AKfycbxf96jrIyggdduxUK4ZMl_6lz2ewUE7jbarxnnu1W1hlTsQBkwQoEMdO6aOyCWWlkEoPg/exec?code=${localStorage.getItem('mainsub')}&code2=${localStorage.getItem('office')}&role=${localStorage.getItem('role')}`)
        .then(response => response.json())
        .then(data => {
            // ปิด css โหลด
            hideLoader()
            const officetb = document.getElementById("tbody");
            let datatb = '';
            if (data.office && data.office.length > 0) {
                data.office.forEach(function (office) {
                    datatb += `<tr>
             <td>${office.maincode}</td>
             <td>${office.xmain}</td>
             <td>${office.subcode}</td>
             <td>${office.name}</td>
             <td>${office.lat}</td>
             <td>${office.long}</td>
             <td>${office.db1}</td>          
         </tr>`
                });

                // เรียกฟังชั่น
                officetb.innerHTML = datatb;
                $(document).ready(function () {
                    $('#officedata').DataTable({
                        "language": {
                            "url": 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json',
                        },
                        "data": data.user,
                        "columns": [
                            { "data": 'maincode' },
                            { "data": 'xmain' },
                            { "data": 'subcode' },
                            { "data": 'name' },
                            { "data": 'lat' },
                            { "data": 'long' },
                            { "data": 'db1' },

                        ],
                        "processing": true,
                        "responsive": true,
                        "order": [[0, 'asc'], [2, 'asc'], [5, 'asc'], [6, 'asc'], [4, 'asc']],
                        "colReorder": true,
                        "fixedColumns": true,
                        "fixedHeader": true,
                        "keys": true,
                       "dom": 'lBfrtip', // เพิ่ม 'l' เพื่อแสดง "Show [n] entries"
                "lengthMenu": [ [10, 30, 50, 100, 150, -1], [10, 30, 50, 100, 150, "ทั้งหมด"] ], // รายการตัวเลือกในปุ่ม

                        "buttons": [
                            // {
                            //     text: 'ขอเพิ่มหน่วยงาน',
                            //     action: async function () {
                            //         const { value: formValues, dismiss: isCanceled } = await Swal.fire({
                            //             title: "เพิ่มกลุ่มงาน/หน่วยงาน",
                            //             html: `
                            //         <input type="text" id="OfficeCode" class="swal2-input" placeholder="รหัสหน่วยงาน"  required>
                            //         <input type="text" id="OfficeName" class="swal2-input" placeholder="ชื่อหน่วยงาน"  required>
                            //         <input type="number" id="Latitude" class="swal2-input" placeholder="ละติจูด"  required>
                            //         <input type="number" id="Longitude" class="swal2-input" placeholder="ลองติจูด"  required>
                            //         `,
                            //             focusConfirm: false,
                            //             showCancelButton: true, // เพิ่มตัวเลือกนี้เพื่อแสดงปุ่ม "ยกเลิก"
                            //             preConfirm: () => {
                            //                 const officeCode = document.getElementById('OfficeCode').value;
                            //                 const officeName = document.getElementById('OfficeName').value;
                            //                 const latitude = document.getElementById('Latitude').value;
                            //                 const longitude = document.getElementById('Longitude').value;

                            //                 // Check for empty values
                            //                 if (!officeCode || !officeName || !latitude || !longitude) {
                            //                     Swal.showValidationMessage('กรุณากรอกข้อมูลทุกช่อง');
                            //                 }

                            //                 return {
                            //                     OfficeCode: officeCode,
                            //                     OfficeName: officeName,
                            //                     Latitude: latitude,
                            //                     Longitude: longitude,
                            //                 };
                            //             }
                            //         });

                            //         if (isCanceled) {
                            //             Swal.fire("ยกเลิกแล้ว", "You pressed Cancel!", "info");
                            //         } else if (formValues) {
                            //             Swal.fire(JSON.stringify(formValues));
                            //             Swal.fire({
                            //                 title: 'ยืนยัน.!',
                            //                 html: formValues.OfficeName,
                            //                 icon: 'warning',
                            //                 showCancelButton: true,
                            //                 confirmButtonColor: '#007bff',
                            //                 cancelButtonColor: '#d33',
                            //                 confirmButtonText: 'ตกลง',
                            //                 cancelButtonText: 'ยกเลิก'
                            //             }).then((result) => {
                            //                 if (result.isConfirmed) {
                            //                     var urlperson = `https://script.google.com/macros/s/AKfycbw6aTKTWOVFm07RZSq0OTO1HsMgZrAAZppBgbzqs5RSnEiGjHnP_rmrzRMTGjvnnCsS/exec`;
                            //                     var dataperson = `?mcode=${OfficeCode}`;
                            //                     fetch(urlperson + dataperson)
                            //                         .then(response => {
                            //                             if (!response.ok) {
                            //                                 throw new Error(`HTTP error! Status: ${response.status}`);
                            //                             }
                            //                             return response.json();
                            //                         })
                            //                         .then(data => {
                            //                             // Handle the data returned from the server
                            //                             console.log(data);

                            //                             // Show a success message using SweetAlert
                            //                             Swal.fire({
                            //                                 title: 'ส่งคำขอเพิ่มหน่วยงานสำเร็จ!',
                            //                                 text: 'กรุณาติดต่อผู้พัฒนาเพื่อดำเนินการตรวจสอบข้อมูล',
                            //                                 icon: 'success'
                            //                             }).then(() => {
                            //                                 location.reload();
                            //                             });
                            //                         })
                            //                         .catch(error => {
                            //                             // Handle any errors that occurred during the fetch
                            //                             console.error('Fetch error:', error);

                            //                             // Show an error message using SweetAlert
                            //                             Swal.fire({
                            //                                 title: 'เกิดข้อผิดพลาด',
                            //                                 text: 'ไม่สามารถแก้ไขข้อมูลได้',
                            //                                 icon: 'error'
                            //                             });
                            //                         });
                            //                 }
                            //             });

                            //         }

                            //     }
                            // },
                            {
                                text: 'แก้ไขพิกัด',
                                action: async function () {
                                    var selectedRows = $('#officedata').DataTable().rows({ selected: true }).data();

                                    if (selectedRows.length > 0) {
                                        var selectedOffice = selectedRows[0];

                                        // Prepare an object to store the initial values
                                        const initialValues = {
                                            maincode: selectedOffice.maincode,
                                            subcode: selectedOffice.subcode,
                                            subname: selectedOffice.name,
                                            lat: selectedOffice.lat,
                                            long: selectedOffice.long,
                                            // Add similar lines for other properties
                                        };

                                        // Use Swal to prompt the user to edit the values
                                        const editedValues = await Swal.fire({
                                            title: "แก้ไขข้อมูลกลุ่มงาน/หน่วยงาน",
                                            html: `
                                            <input type="text" id="mainCode" class="swal2-input" placeholder="รหัสหลัก" value="${initialValues.maincode}" required disabled>
                                            <input type="text" id="OfficeCode" class="swal2-input" placeholder="รหัสหน่วยงาน" value="${initialValues.subcode}" required disabled>
                                            <input type="text" id="OfficeName" class="swal2-input" placeholder="ชื่อหน่วยงาน" value="${initialValues.subname}" required disabled>
                                            <input type="number" id="Latitude" class="swal2-input" placeholder="ละติจูด" value="${initialValues.lat}" required>
                                            <input type="number" id="Longitude" class="swal2-input" placeholder="ลองติจูด" value="${initialValues.long}" required>
                                        `,
                                            showCancelButton: true,
                                            focusConfirm: false,
                                            preConfirm: () => {
                                                const mainCode = document.getElementById('mainCode').value;
                                                const officeCode = document.getElementById('OfficeCode').value;
                                                const officeName = document.getElementById('OfficeName').value;
                                                const latitude = document.getElementById('Latitude').value;
                                                const longitude = document.getElementById('Longitude').value;

                                                // Check for empty values
                                                if (!mainCode || !officeCode || !officeName || !latitude || !longitude) {
                                                    Swal.showValidationMessage('กรุณากรอกข้อมูลทุกช่อง');
                                                }

                                                return {
                                                    mainCode: mainCode,
                                                    OfficeCode: officeCode,
                                                    OfficeName: officeName,
                                                    Latitude: latitude,
                                                    Longitude: longitude,
                                                };
                                            },

                                        });

                                        if (editedValues.value) {
                                            // Call the next action or process with the edited values
                                           //  console.log("User clicked ตกลง. Proceed with further action:", editedValues.value);
                                            Swal.fire({
                                                title: 'ยืนยัน.!',
                                                html: OfficeName.value+'<br><br> <a href="https://www.google.co.th/maps/search/'+Latitude.value+','+Longitude.value+' " target="_blank">ตรวจสอบพิกัด</a>',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#007bff',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'ตกลง',
                                                cancelButtonText: 'ยกเลิก'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    var urlperson = `https://script.google.com/macros/s/AKfycbw6aTKTWOVFm07RZSq0OTO1HsMgZrAAZppBgbzqs5RSnEiGjHnP_rmrzRMTGjvnnCsS/exec`;
                                                    var mainCode = editedValues.value.mainCode;
                                                    var officeCode = editedValues.value.OfficeCode;
                                                    var latitude = editedValues.value.Latitude;
                                                    var longitude = editedValues.value.Longitude;
                                                    
                                                    // Build the data string to be sent in the fetch call
                                                    var dataperson = `?mcode=${mainCode}&scode=${officeCode}&lat=${latitude}&lon=${longitude}`;
                                                    
                                                //    console.log(dataperson);
                                             
                                                    fetch(urlperson + dataperson)
                                                        .then(response => {
                                                            if (!response.ok) {
                                                                throw new Error(`HTTP error! Status: ${response.status}`);
                                                            }
                                                            return response.json();
                                                        })
                                                        .then(data => {
                                                            // Handle the data returned from the server
                                                            console.log(data);

                                                            // Show a success message using SweetAlert
                                                            Swal.fire({
                                                                title: 'สำเร็จ!',
                                                                text: 'การแก้ไขข้อมูลเสร็จสิ้น',
                                                                icon: 'success'
                                                            }).then(() => {
                                                                location.reload();
                                                            });
                                                        })
                                                        .catch(error => {
                                                            // Handle any errors that occurred during the fetch
                                                            console.error('Fetch error:', error);

                                                            // Show an error message using SweetAlert
                                                            Swal.fire({
                                                                title: 'เกิดข้อผิดพลาด',
                                                                text: 'ไม่สามารถแก้ไขข้อมูลได้',
                                                                icon: 'error'
                                                            });
                                                        });
                                                }
                                            });
                                        } else {
                                            // User clicked "ยกเลิก" (cancel) or closed the modal
                                            Swal.fire("ยกเลิกแล้ว", "You pressed Cancel!", "info");
                                        }

                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "No row selected!"
                                        });
                                    }
                                }
                            },
                            {
                                text: 'ตรวจสอบพิกัด',
                                action: async function () {
                                    var selectedRows = $('#officedata').DataTable().rows({ selected: true }).data();

                                    if (selectedRows.length > 0) {
                                        var selectedOffice = selectedRows[0];
                                        // Prepare an object to store the initial values
                                        const initialValues = {
                                            lat: selectedOffice.lat,
                                            long: selectedOffice.long,
                                        };

                                        // Construct the Google Maps link
                                        var googlemap = `https://www.google.co.th/maps/search/${initialValues.lat}${","}${initialValues.long}`;

                                        // Ask for confirmation using Swal.fire
                                        Swal.fire({
                                            title: 'Open Google Maps?',
                                            text: 'Do you want to open Google Maps for the selected location?',
                                            icon: 'question',
                                            showCancelButton: true,
                                            confirmButtonText: 'Yes',
                                            cancelButtonText: 'No'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                // Open the Google Maps link if the user confirms
                                                window.open(googlemap, '_blank');
                                            }
                                        });
                                    } else {
                                        // Show an error message if no row is selected
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'No row selected!'
                                        });
                                    }
                                }
                            },
                            'excel', 'print'],
                        "select": true,
                          "pageLength": 10
                    });

                })
            }
            else {
                // Data is empty, show Swal.fire alert
                Swal.fire({
                    icon: 'error',
                    title: 'ไม่มีสิทธิ์',
                    text: 'ข้อมูลไม่พบหรือไม่มีสิทธิ์เข้าถึง',
                });
            }


        })
    //     .catch(error => console.error("Error fetching categories:", error));


});






const loader = document.getElementById('loader');

function showLoader() {
    loader.style.display = 'block'; // แสดง loader
}

function hideLoader() {
    loader.style.display = 'none'; // ซ่อน loader
}

