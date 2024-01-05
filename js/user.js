document.addEventListener("DOMContentLoaded", async function () {
    // Check if the 'id' value exists in local storage
    const userId = localStorage.getItem('uuid');

    // If 'id' is not present, redirect to the login page
    if (!userId) {
        window.location.href = 'login.html'; // Replace 'login.html' with the actual login page URL
        return; // Stop further execution of the script
    }
    const xmain = localStorage.getItem('mainsub');
    // const xsub = localStorage.getItem('office');
    const loader = document.getElementById('loader');

    function showLoader() {
        loader.style.display = 'block'; // แสดง loader
    }

    function hideLoader() {
        loader.style.display = 'none'; // ซ่อน loader
    }
    // สำหรับแสดง css โหลด
    showLoader()
    // เมื่อหน้าเว็บโหลดเสร็จ, ดึงข้อมูล category และใส่ใน dropdown
    await fetch(`https://script.google.com/macros/s/AKfycbx_wknldnTbHr4a32h1-3iYe1v_Fx9c4o7BzL9wfgEG1_dEESAHENT_22SZH9EufXHDxg/exec?id=${userId}`)
        .then(response => response.json())
        .then(data => {
            // ปิด css โหลด
       
            hideLoader()
            const usertb = document.getElementById("tbody");
            let datatb = '';
            data.user.forEach(function (user) {
                datatb += `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.position}</td>
                <td>${user.office}</td>
                <td>${user.mainsub}</td>
                <td>${user.role}</td>
                <td>${user.boss}</td>
                <td>${user.ceo}</td>
                <td ${user.status}</td>
                <td ${user.upic}</td>   
                <td ${user.docno}</td>                                 
            </tr>`
            });

            // เรียกฟังชั่น
            usertb.innerHTML = datatb;
            $(document).ready(function () {
                $('#userdata').DataTable({
                    "language": {
                        "url": 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json',
                    },
                    "data": data.user,
                    "columns": [
                        { "data": 'status'},
                        { 
                            "data": 'upic',
                            "render": function (data, type, full, meta) {
                                // Assuming 'upic' contains the URL or path to the image
                                return '<img src="' + data + '" alt="User Image" width="50" height="50">';
                            }
                        },
                        { "data": 'id' },
                        { "data": 'name' },
                        { "data": 'position' },
                        { "data": 'mainsub' },
                        { "data": 'office' },
                        { "data": 'role' },
                        { "data": 'boss' },
                        { "data": 'ceo' },
                        { "data": 'docno' },
                        
                    ],
                    "processing": true,
                    "responsive": true,
                    "order": [[0, 'asc'], [2, 'asc'],[5, 'asc'], [6, 'asc'],[4, 'asc']],
                    "colReorder": true,
                    "fixedColumns": true,
                    "fixedHeader": true,
                    "keys": true,
                    "dom": 'Bfrtip',
                    "createdRow": function (row, data, dataIndex) {
                        // Add the span element with the appropriate CSS class to the 'status' column
                        const statusCell = $('td', row).eq(0); // Assuming 'status' is the 9th column (index 8)
                        const statusClass = data.status === 'deactive' ? 'status pending' : data.status === 'active' ? 'status completed' : 'primary';
                        statusCell.html(`<span class="${statusClass}">${data.status}</span>`);
                    },
             
                    "buttons": [
                        {
                            text: 'กำหนดสถานะ',
                            action: async function () {
                                var selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();

                                if (selectedRows.length > 0) {
                                    var selectedId = selectedRows[0].id;
                                    //   alert('Selected ID: ' + selectedId);
                                    const { value: status } = await Swal.fire({
                                        title: "Select ID : " + selectedId,
                                        input: "select",
                                        inputOptions: {
                                            active: "active",
                                            deactive: "deactive",
                                        },
                                        inputPlaceholder: "เลือกสถานะ",
                                        showCancelButton: true,
                                        inputValidator: (value) => {
                                            return new Promise((resolve) => {
                                                if (value !== '') {
                                                    fetch(`https://script.google.com/macros/s/AKfycbz0tjKWPT4kawZplDkWr67d0PncRzdWX6FyC2FK-x5_bzPO-D30xBAL-irqAUMnJSeg/exec?id=${selectedId}&sts=${value}`)
                                                        .then(response => response.json())
                                                        .then(data >= {
                                                            Swal.fire({
                                                                title: 'สำเร็จ!',
                                                                text: 'การแก้ไขข้อมูลเสร็จสิ้น',
                                                                icon: 'success'
                                                            }).then(() => {
                                                                location.reload();
                                                            });
                                                        });
                                                    resolve();
                                                } else {
                                                    resolve("Please select");
                                                }

                                            });
                                        }
                                    });
                                    if (status) {
                                        Swal.fire(`You selected: ${status}`);
                                    };

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
                            text: 'กำหนดสิทธิ์',
                            action: async function () {
                                var selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();

                                if (selectedRows.length > 0) {
                                    var selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();

                                    if (selectedRows.length > 0) {
                                        var selectedId = selectedRows[0].id;

                                        // Fetch options from API
                                     await   fetch(`https://script.google.com/macros/s/AKfycbxRvUvrua5NNeRskiXrcVF4zI1NNgJFRiFaB3a4jIlpB4Mv6NCHoxo_oBKZIuM0M1Zo/exec?id=${userId}`)
                                            .then(response => response.json())
                                            .then(data => {
                                                // Extract value and label from the fetched data
                                                const options = {};
                                                data.role.forEach(item => {
                                                    options[item.id] = item.name;
                                                });

                                                Swal.fire({
                                                    title: "Select ID : " + selectedId,
                                                    input: "select",
                                                    inputOptions: options,
                                                    inputPlaceholder: "เลือกสิทธิ์",
                                                    showCancelButton: true,
                                                    inputValidator: (value) => {
                                                        return new Promise((resolve) => {
                                                            if (value !== '') {
                                                                fetch(`https://script.google.com/macros/s/AKfycbyBJA6m1I4CxRUPE_a5GuN2dDo8gS2Mxr1-qkm9MpCe0xSeo6o-G4cgsP-w8Mh98fua/exec?id=${selectedId}&sts=${value}`)
                                                                    .then(response => response.json())
                                                                    .then(data => {
                                                                        // Handle the response data
                                                                        resolve();
                                                                        Swal.fire({
                                                                title: 'สำเร็จ!',
                                                                text: 'การแก้ไขข้อมูลเสร็จสิ้น',
                                                                icon: 'success'
                                                            }).then(() => {
                                                                location.reload();
                                                            });
                                                                    });
                                                            } else {
                                                                resolve("Please select");
                                                            }
                                                        });
                                                    }
                                                });
                                            })
                                            .catch(error => {
                                                console.error('Error fetching data:', error);
                                            });
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "No row selected!"
                                        });
                                    }
                                }
                            }

                        },
                        {
                            text: 'กำหนด หัวหน้า/ผอ./ผู้รับรอง/ผู้บริหาร/ผู้ช่วย',
                            action: async function () {
                                var selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();

                                if (selectedRows.length > 0) {
                                    var selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();

                                    if (selectedRows.length > 0) {
                                        var selectedId = selectedRows[0].id;

                                        // Fetch options from API
                                     await   fetch(`https://script.google.com/macros/s/AKfycbzlanx_NXl5qy1mlvQP6oMl6zElUxDJ9nLUiZEqIHO0RKP7OcxkHKo5n_XUb-5UEHRN/exec?xmain=${xmain}`)
                                            .then(response => response.json())
                                            .then(data => {
                                                // Extract value and label from the fetched data
                                                const options = {};
                                                data.role.forEach(itemx => {
                                                    options[itemx.id] = itemx.name;
                                                });

                                                Swal.fire({
                                                    title: "Select ID : " + selectedId,
                                                    input: "select",
                                                    inputOptions: options,
                                                    inputPlaceholder: "เลือกหัวหน้า",
                                                    showCancelButton: true,
                                                    inputValidator: (value) => {
                                                        return new Promise((resolve) => {
                                                            if (value !== '') {
                                                                fetch(`https://script.google.com/macros/s/AKfycbycQZ5goIDuxiTSnaA6NTGGY5sgmKfVgDAt1wDDXqxn6sGRfDnYODVHJH67BQd_TvADbw/exec?id=${selectedId}&sts=${value}`)
                                                                    .then(response => response.json())
                                                                    .then(data => {
                                                                        // Handle the response data
                                                                        resolve();
                                                                        Swal.fire({
                                                                title: 'สำเร็จ!',
                                                                text: 'การแก้ไขข้อมูลเสร็จสิ้น',
                                                                icon: 'success'
                                                            }).then(() => {
                                                                location.reload();
                                                            });
                                                                    });
                                                            } else {
                                                                resolve("Please select");
                                                            }
                                                        });
                                                    }
                                                });
                                            })
                                            .catch(error => {
                                                console.error('Error fetching data:', error);
                                            });
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "No row selected!"
                                        });
                                    }
                                }
                            }

                        },
                        // ระดับเหนือขึ้นไป
                        // {
                        //     text: 'ผู้บริหาร/รอง/ผู้ช่วย',
                        //     action: async function () {
                        //         var selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();

                        //         if (selectedRows.length > 0) {
                        //             var selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();

                        //             if (selectedRows.length > 0) {
                        //                 var selectedId = selectedRows[0].id;

                        //                 // Fetch options from API
                        //              await   fetch(`https://script.google.com/macros/s/AKfycbyaLKaN7oSFwsgWOvPpPkZ2LcXiY2D0RfAf7hpvTaaVdXIt62gryLA4rOVTzFT3qLfsow/exec?xmain=${xmain}`)
                        //                     .then(response => response.json())
                        //                     .then(data => {
                        //                         // Extract value and label from the fetched data
                        //                         const options = {};
                        //                         data.role.forEach(itemz => {
                        //                             options[itemz.id] = itemz.name;
                        //                         });

                        //                         Swal.fire({
                        //                             title: "Select ID : " + selectedId,
                        //                             input: "select",
                        //                             inputOptions: options,
                        //                             inputPlaceholder: "เลือกผู้บริหาร",
                        //                             showCancelButton: true,
                        //                             inputValidator: (value) => {
                        //                                 return new Promise((resolve) => {
                        //                                     if (value !== '') {
                        //                                         fetch(`https://script.google.com/macros/s/AKfycbwaXAr5CnbPB_9fivSZfSv3UcSMaXK128ILqJnMOshKDjpzu2Ztsq77WY47PYDZP7bi/exec?id=${selectedId}&sts=${value}`)
                        //                                             .then(response => response.json())
                        //                                             .then(data => {
                        //                                                 // Handle the response data
                        //                                                 resolve();
// Swal.fire({
//                                                                 title: 'สำเร็จ!',
//                                                                 text: 'การแก้ไขข้อมูลเสร็จสิ้น',
//                                                                 icon: 'success'
//                                                             }).then(() => {
//                                                                 location.reload();
//                                                             });
                        //                                             });
                        //                                     } else {
                        //                                         resolve("Please select");
                        //                                     }
                        //                                 });
                        //                             }
                        //                         });
                        //                     })
                        //                     .catch(error => {
                        //                         console.error('Error fetching data:', error);
                        //                     });
                        //             } else {
                        //                 Swal.fire({
                        //                     icon: "error",
                        //                     title: "Oops...",
                        //                     text: "No row selected!"
                        //                 });
                        //             }
                        //         }
                        //     }

                        // },
                        {
                            text: 'กำหนด เลขที่หนังสือ',
                            action: async function () {
                                var selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();

                                if (selectedRows.length > 0) {
                                    var selectedId = selectedRows[0].id;
                                    //   alert('Selected ID: ' + selectedId);
                                    const { value: docno } = await Swal.fire({
                                        title: "Select ID : " + selectedId,
                                        input: "text",
                                        inputLabel: "กรอกเลขที่หนังสือ",
                                        inputPlaceholder: "บก xxxx",
                                        showCancelButton: true,
                                        inputValidator: (value) => {
                                            return new Promise((resolve) => {
                                                if (value !== '') {
                                                    fetch(`https://script.google.com/macros/s/AKfycbzJb3Bsc5VNCvukDAdS_LKgTzSIQqIRO8H_882LAFJM0YJNnsyagUEa5QcuMn4yYHii/exec?id=${selectedId}&sts=${value}`)
                                                        .then(response => response.json())
                                                        .then(data >= {
                                                            Swal.fire({
                                                                title: 'สำเร็จ!',
                                                                text: 'การแก้ไขข้อมูลเสร็จสิ้น',
                                                                icon: 'success'
                                                            }).then(() => {
                                                                location.reload();
                                                            });
                                                        });
                                                    resolve();
                                                } else {
                                                    resolve("Please select");
                                                }

                                            });
                                        }
                                    });
                                    if (docno) {
                                        Swal.fire(`You selected: ${docno}`);
                                    };

                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "No row selected!"
                                    });
                                }
                            }
                        }, 'excel', 'print'
                        // สิ้นสุดปุ่ม
                    ],
                    "select": true,
                  //  "pageLength": 20
                });

            })


        })
    //     .catch(error => console.error("Error fetching categories:", error));


});



