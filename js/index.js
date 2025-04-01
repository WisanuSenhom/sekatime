document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage();
    applySystemTheme();
});

function checkLocalStorage() {
    var storedUUID = localStorage.getItem("uuid");

    if (!storedUUID || storedUUID.trim() === "") {
        window.location.href = "login.html";
    }

    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    document.querySelector('#upic').src = localStorage.getItem('upic');
    
    sideLinks.forEach(item => {
        const li = item.parentElement;
        item.addEventListener('click', () => {
            sideLinks.forEach(i => i.parentElement.classList.remove('active'));
            li.classList.add('active');
        });
    });

    const menuBar = document.querySelector('.content nav .bx.bx-menu');
    const sideBar = document.querySelector('.sidebar');

    // ซ่อน Sidebar ทันทีหากเป็นหน้าจอมือถือ
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    }

    menuBar.addEventListener('click', () => {
        sideBar.classList.toggle('close');
    });

    const searchBtn = document.querySelector('.content nav form .form-input button');
    const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
    const searchForm = document.querySelector('.content nav form');

    searchBtn.addEventListener('click', function (e) {
        if (window.innerWidth < 576) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
                searchBtnIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchBtnIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            sideBar.classList.add('close');
        } else {
            sideBar.classList.remove('close');
        }
        if (window.innerWidth > 576) {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
        }
    });
}

function applySystemTheme() {
    const toggler = document.getElementById('theme-toggle');
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    // ตั้งค่าธีมตามธีมของระบบ
    document.body.classList.toggle("dark", prefersDarkMode.matches);
    toggler.checked = prefersDarkMode.matches;

    // อัปเดตธีมอัตโนมัติเมื่อระบบเปลี่ยนธีม
    prefersDarkMode.addEventListener("change", (e) => {
        document.body.classList.toggle("dark", e.matches);
        toggler.checked = e.matches;
    });

    // ให้ผู้ใช้เปลี่ยนธีมเอง (ไม่มีการเก็บค่า)
    toggler.addEventListener("change", function () {
        document.body.classList.toggle("dark", this.checked);
    });
}



function refreshPage() {
    location.reload(true); // รีเฟรชหน้าเว็บ
}

function clearLocal() {
    // Show a confirmation dialog using SweetAlert2
    Swal.fire({
        title: 'Are you sure?',
        // text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
    
        confirmButtonText: 'ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        // Check if the user clicked the "Yes, clear it!" button
        if (result.isConfirmed) {
            // Clear all data in Local Storage
            localStorage.clear();

            // Display a success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Local Storage has been cleared.',
                text: 'ออกจากระบบสำเร็จ!'
            }).then((result) => {
                // Check if the user clicked the "OK" button
                if (result.isConfirmed) {
                    // Close the current tab by navigating to a placeholder page
                    window.location.href = 'about:blank';
                }
            });
        }
    });
}




// เพิ่มคำสั่งนี้เพื่อแสดง Loader
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.loader-wrapper').classList.remove('hide');
});

// เพิ่มคำสั่งนี้หลังจากที่เนื้อหาหน้าเว็บโหลดเสร็จ
window.addEventListener('load', function () {
    // ซ่อน Loader หลังจากที่โหลดเสร็จ
    document.querySelector('.loader-wrapper').classList.add('hide');
});

function searchAndHighlight() {
    // var searchText = document.getElementById('searchInput').value;
    // if (searchText) {
    //   var content = document.body.innerHTML;
    //   var highlightedText = '<span class="highlight">' + searchText + '</span>';
    //   var regex = new RegExp(searchText, 'gi');
    //   content = content.replace(regex, highlightedText);
    //   document.body.innerHTML = content;
    // }



    
    var searchText = document.getElementById('searchInput').value;
    if (searchText.length == 4) {
     
        Swal.fire({
            icon: 'success',
            title: 'ดำเนินการต่อ',
            html: 'ตรวจสอบข้อมูลบุคคล : ' + searchText,
            confirmButtonText: 'ตกลง'  // กำหนดข้อความบนปุ่มตกลง
        }).then((result) => {
            if (result.isConfirmed) {
                // เมื่อผู้ใช้กดปุ่มตกลง
                // นำโค้ด fetch API มาวางที่นี่
                var url = 'https://script.google.com/macros/s/AKfycbwPPNCtFSkiNUOlNHT1EIT9Yh6YUotIKqbtv4kZDGsF3gDfrWiTPYojCkTdCJ60BYzJ/exec';
                var query = `?id=${searchText}&code=${localStorage.getItem("mainsub")}&role=${localStorage.getItem("role")}&xname=${localStorage.getItem("name")}&xoffice=${localStorage.getItem("office")}`;
                // console.log(url + query);
                fetch(url + query)
                    .then(response => response.json())
                    .then(data => {
                        // Check if data is found and not empty
                        if (data.cc && data.cc.length > 0) {
                            // Use the data as needed
                            console.log(data.cc);
                            data.cc.forEach(cc => {
                                Swal.fire({
                                    title: "ดำเนินการต่อ", // Change the title of the first pop-up
                                    input: "text",
                                    inputLabel: "ระบบได้ส่ง OTP ไปยังเจ้าของข้อมูล", // Modify the input label
                                    inputPlaceholder: "Enter OTP here",
                                    width: 400,
                                    inputAttributes: {
                                        maxlength: "4",
                                        autocapitalize: "off",
                                        autocorrect: "off"
                                    },
                                    preConfirm: (otp) => {
                                        if (otp == cc.otp) {
                                            Swal.fire({
                                                title: `${cc.name} - ${cc.role}`, // Improve the title
                                                html: `<p>หน่วยงาน: ${cc.xsub}</p>
                                                       <p>สังกัด: ${cc.xmain}</p>`,
                                                imageUrl: cc.pic,
                                                imageWidth: 300,
                                                imageHeight: 300,
                                                imageAlt: "Person Image",
                                                //showCancelButton: true, // Add a cancel button
                                                confirmButtonText: "ตกลง", // Customize the confirm button text
                                            });
                                        } else {
                                            Swal.showValidationMessage("OTP ไม่ถูกต้อง หากเจ้าของข้อมูลไม่ได้รับ OTP ให้ ออก Line Token หน้าตั้งค่า");
                                        }
                                    },
                                });                                

                            });

                        } else {
                            // Handle the case where no data is found or length is 0
                            Swal.fire({
                                icon: 'warning',
                                title: 'ไม่พบข้อมูล',
                                text: 'กรุณาตรวจสอบ หรือลองใหม่อีกครั้ง',
                            });

                        }
                    })
                    .catch(error => {
                        // Handle errors when calling the API
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'เกิดข้อผิดพลาดในการดึงข้อมูล: ' + error,
                        });

                    });

            }
        });
    } else if (searchText.length == 12) {
        Swal.fire({
            icon: 'success',
            title: 'ดำเนินการต่อ',
            html: 'ตรวจสอบการลงเวลา : ' + searchText,
            confirmButtonText: 'ตกลง'
        }).then((result) => {
            if (result.isConfirmed) {
                var url = 'https://script.google.com/macros/s/AKfycbyO71zwOWnlD-8Z0Xn_eVHTA9qNZcYXYTIv_Wr0KI-6U2qkMGbpeJZGEg0xjPKoabdh/exec';
                var query = `?id=${searchText}&db=${localStorage.getItem("db1")}&xname=${localStorage.getItem("name")}&xoffice=${localStorage.getItem("office")}`;
                fetch(url + query)
                    .then(response => response.json())
                    .then(data => {
                        if (data.cc && data.cc.length > 0) {
                            data.cc.forEach(cc => {
                                Swal.fire({
                                    title: "ดำเนินการต่อ",
                                    input: "text",
                                    inputLabel: "ระบบได้ส่ง OTP ไปยังเจ้าของข้อมูล ",
                                    inputPlaceholder: "กรอกเลข OTP",
                                    width: 400,
                                    inputAttributes: {
                                        maxlength: "4",
                                        autocapitalize: "off",
                                        autocorrect: "off"
                                    },
                                    preConfirm: (otp) => {
                                        if (otp == cc.otp) {
                                            swal.fire({
                                                icon: 'success',
                                                title: cc.name + '<br>' + cc.office,
                                                html: `วันที่ : ${cc.indate}<br>
                                                    การปฏิบัติงาน : ${cc.intype}<br>
                                                    เวลามา : ${cc.intime}<br>
                                                    ระยะ : ${cc.indistan} ${cc.inunit}<br>
                                                    เวลากลับ : ${cc.outtime}<br>
                                                    ระยะ : ${cc.outdistan} ${cc.outunit}<br>
                                                    พิกัด : ${cc.geo}<br>
                                                    `,
                                                footer: `<a href="https://www.google.co.th/maps/search/${cc.gis}" target="_blank">ดูพิกัดใน : Google Map</a>`
                                            });
                                        } else {
                                            Swal.showValidationMessage("OTP ไม่ถูกต้อง หากเจ้าของข้อมูลไม่ได้รับ OTP ให้ ออก Line Token หน้าตั้งค่า");
                                        }
                                    }
                                });
                            });
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'ไม่พบข้อมูล',
                                text: 'กรุณาตรวจสอบ หรือลองใหม่อีกครั้ง',
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'เกิดข้อผิดพลาดในการดึงข้อมูล: ' + error,
                        });
                    });
            }
        });
    }
   
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: 'โปรดกรอกเลขอ้างอิง<br>ข้อมูลบุคคล 4 หลัก<br>ข้อมูลการลงเวลา 12 หลัก<br>เพื่อค้นหาข้อมูล !'
        });
    }

}


// สร้างฟังก์ชั่นสำหรับดึงข้อมูล
function fetchDataIP() {
    // ใช้ fetch เพื่อส่งคำขอ GET ไปยัง API
    fetch('https://api.ipify.org/?format=json')
      .then(response => {
        // ตรวจสอบว่าคำขอสำเร็จหรือไม่
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // แปลงข้อมูล JSON และส่งต่อ
        return response.json();
      })
      .then(data => {
        // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับ
        console.log('Data from API:', data);
  
        // นำข้อมูลไปใส่ตัวแปรตามที่คุณต้องการ
        const ipAddress = data.ip;
        console.log('IP Address:', ipAddress);
      })
      .catch(error => {
        // จัดการเมื่อมีข้อผิดพลาด
        console.error('Error fetching data:', error);
      });
  }
  
  // เรียกใช้ฟังก์ชั่น fetchData เพื่อดึงข้อมูล
//   fetchDataIP();
  
