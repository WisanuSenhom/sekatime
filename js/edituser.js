document.addEventListener("DOMContentLoaded", function () {
  showLoader();
  urlapi =
    "https://script.google.com/macros/s/AKfycbwSQn-VpYHC6lGntFx3eqZbeGW5_MJhOvT9bynDi7j6wlFpkJILoM1ADjhlz3AuoUVLWQ/exec";
  queryapi = `?id=${localStorage.getItem("uuid")}`;
  fetch(urlapi + queryapi)
    .then((response) => response.json())
    .then((data) => {
      data.user.forEach(function (user) {
        document.querySelector("#pname").value = user.pname;
        document.querySelector("#fname").value = user.fname;
        document.querySelector("#lname").value = user.lname;
        document.querySelector("#position").value = user.position;
        document.querySelector("#rank").value = user.rank;
        oxmain = user.mainsub;
        oxsub = user.office;
        document.querySelector("#token").value = user.token;
      });

      getopion(oxmain, oxsub);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

async function getopion(oxmain, oxsub) {
  showLoader();
  // เมื่อหน้าเว็บโหลดเสร็จ, ดึงข้อมูล category และใส่ใน dropdown
  await fetch(
    "https://script.google.com/macros/s/AKfycbxqDazVhojy3PDLD2asS6Dp2dh-5zqiE9SVJr15BBh2nddc00ehKQNTC7_H1KXM6EhJFA/exec"
  )
    .then((response) => response.json())
    .then((data) => {
      const categoryDropdown = document.getElementById("xmain");

      // เพิ่ม option สำหรับแต่ละ category
      data.category.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        categoryDropdown.add(option);
      });

      document.querySelector("#xmain").value = oxmain;

      // โหลด subcategories สำหรับ category แรก
      loadSubcategories(oxsub);
    })
    .catch((error) => console.error("Error fetching categories:", error));
}

async function loadSubcategories(oxsub) {
  showLoader();
  const categoryDropdown = document.getElementById("xmain");
  const subcategoryDropdown = document.getElementById("xsub");

  // ดึงค่าที่ถูกเลือกใน dropdown ของ category
  const selectedCategoryId = categoryDropdown.value;
  // console.log(selectedCategoryId);

  // ดึงข้อมูล subcategories จาก API โดยใช้ selectedCategoryId
  await fetch(
    `https://script.google.com/macros/s/AKfycbwYUMzfkbM_B2fdgoGaJ7QKx_ACzg7cr0jn8I_x9yJdqHyWLurD_4IE5uX9tu_DW98/exec?categories=${selectedCategoryId}`
  )
    .then((response) => response.json())
    .then((data) => {
      // ลบค่าเก่าใน dropdown ของ subcategory
      subcategoryDropdown.innerHTML = "";

      // เพิ่ม option สำหรับแต่ละ subcategory
      data.category.forEach((subcategory) => {
        const option = document.createElement("option");
        option.value = subcategory.id;
        option.text = subcategory.name;
        subcategoryDropdown.add(option);
      });
      document.querySelector("#xsub").value = oxsub;

      loadSubdatas();
    })
    .catch((error) => console.error("Error fetching subcategories:", error));
}

async function loadSubdatas() {
  showLoader();
  const subcategoryDropdowns = document.getElementById("xsub");
  // ดึงค่าที่ถูกเลือกใน dropdown ของ category
  const selecteddatas = subcategoryDropdowns.value;
  // console.log(selecteddatas);
  // ดึงข้อมูล subcategories จาก API โดยใช้ selectedCategoryId
  await fetch(
    `https://script.google.com/macros/s/AKfycbxRMzDKnw3HwBzYZxxKUiRSQKYIUWhi6Le9-cY09zdgZ1uE1HUMkntKRkATNT8INBu3/exec?datas=${selecteddatas}`
  )
    .then((response) => response.json())
    .then((data) => {
      // document.querySelector('#latitude').innerHTML = "";
      // document.querySelector('#longitude').innerHTML = "";
      // document.querySelector('#db1').innerHTML = "";
      // document.querySelector('#db2').innerHTML = "";
      // document.querySelector('#db3').innerHTML = "";
      //  document.querySelector('#maincode').innerHTML = "";
      //  document.querySelector('#subcode').innerHTML = "";
      //  console.log(data);

      data.datas.forEach((subdatas) => {
        document.querySelector("#cmain").value = subdatas.maincode;
        document.querySelector("#csub").value = subdatas.subcode;
        document.querySelector("#lat").value = subdatas.lat;
        document.querySelector("#long").value = subdatas.long;
        document.querySelector("#db1").value = subdatas.db1;
        // document.querySelector('#db2').value = subdatas.db2;
        // document.querySelector('#db3').value = subdatas.db3;
        document.querySelector("#yourpic").src =
          localStorage.getItem("yourpic");
      });
      hideLoader();
    })
    .catch((error) => console.error("Error fetching subcategories:", error));
}

function submitForm() {
  // Get input values
  var pnameValue = document.getElementById("pname").value;
  var fnameValue = document.getElementById("fname").value;
  var lnameValue = document.getElementById("lname").value;
  var positionValue = document.getElementById("position").value;
  var rankValue = document.getElementById("rank").value;

  // You can now use these values as needed
  console.log("คำนำหน้า:", pnameValue);
  console.log("ชื่อ:", fnameValue);
  console.log("สกุล:", lnameValue);
  console.log("ตำแหน่ง:", positionValue);
  console.log("ประเภท:", rankValue);

  // location.reload();
}

// แก้ไขชื่อ
function editname() {
  var pnameValue = document.getElementById("pname").value;
  var fnameValue = document.getElementById("fname").value;
  var lnameValue = document.getElementById("lname").value;
  var positionValue = document.getElementById("position").value;
  var rankValue = document.getElementById("rank").value;

  Swal.fire({
    title: "ยืนยันการแก้ไข.!",
    html:
      "ชื่อ: " +
      pnameValue +
      fnameValue +
      " " +
      lnameValue +
      "<br>ตำแหน่ง : " +
      positionValue +
      "<br>ประเภท : " +
      rankValue,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    cancelButtonColor: "#d33",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      // Show loading indicator
      Swal.fire({
        title: "กำลังบันทึก...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      var urlperson = `https://script.google.com/macros/s/AKfycby_kFw7cVAIqDtkHtRMZcWqjE-roALrf3S40KdK85bESg9RI3Ei72fT8FeW72hh0rIv1Q/exec`;
      var dataperson = `?id=${localStorage.getItem(
        "uuid"
      )}&pname=${encodeURIComponent(pnameValue)}&fname=${encodeURIComponent(
        fnameValue
      )}&lname=${encodeURIComponent(lnameValue)}&position=${encodeURIComponent(
        positionValue
      )}&rank=${encodeURIComponent(rankValue)}`;

      fetch(urlperson + dataperson)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Close loading and show success message
          Swal.close();
          Swal.fire({
            title: "สำเร็จ!",
            text: "การแก้ไขข้อมูลเสร็จสิ้น",
            icon: "success",
            allowOutsideClick: false,
          }).then(() => {
            localStorage.clear();
            location.reload();
          });
        })
        .catch((error) => {
          // Close loading and show error message
          Swal.close();
          console.error("Fetch error:", error);

          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
            icon: "error",
          });
        });
    }
  });
}

// แก้ไขที่ทำงาน
function editwork() {
  var xmainValue = document.getElementById("xmain").value;
  var xsubValue = document.getElementById("xsub").value;
  var cmainValue = document.getElementById("cmain").value;
  var csubValue = document.getElementById("csub").value;

  var latValue = document.getElementById("lat").value;
  var longValue = document.getElementById("long").value;
  var db1Value = document.getElementById("db1").value;

  Swal.fire({
    title: "ยืนยันการแก้ไข.!",
    html:
      csubValue +
      " : " +
      xsubValue +
      " สังกัด " +
      cmainValue +
      " : " +
      xmainValue,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    cancelButtonColor: "#d33",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      var urlperson = `https://script.google.com/macros/s/AKfycby0PvZlQAiItxAxsDb_b1F2s5ZHYsGq9fsAJpXuGPv0-4bn-v6KTzjvb7ku5tigbhu4zw/exec`;
      var dataperson = `?id=${localStorage.getItem(
        "uuid"
      )}&xmain=${xmainValue}&xsub=${xsubValue}&cmain=${cmainValue}&csub=${csubValue}&lat=${latValue}&long=${longValue}&db1=${db1Value}`;
      fetch(urlperson + dataperson)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Handle the data returned from the server
          console.log(data);

          // Show a success message using SweetAlert
          Swal.fire({
            title: "สำเร็จ!",
            text: "การแก้ไขข้อมูลเสร็จสิ้น",
            icon: "success",
            allowOutsideClick: false,
          }).then(() => {
            localStorage.clear();
            location.reload();
          });
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error("Fetch error:", error);

          // Show an error message using SweetAlert
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
            icon: "error",
          });
        });
    }
  });
}

// แก้ไขรูปภาพ
function editwork() {
  var xmainValue = document.getElementById("xmain").value;
  var xsubValue = document.getElementById("xsub").value;
  var cmainValue = document.getElementById("cmain").value;
  var csubValue = document.getElementById("csub").value;

  var latValue = document.getElementById("lat").value;
  var longValue = document.getElementById("long").value;
  var db1Value = document.getElementById("db1").value;

  Swal.fire({
    title: "ยืนยันการแก้ไข.!",
    html:
      csubValue +
      " : " +
      xsubValue +
      " สังกัด " +
      cmainValue +
      " : " +
      xmainValue,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    cancelButtonColor: "#d33",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      // แสดงการโหลด
      Swal.fire({
        title: "กำลังบันทึกข้อมูล...",
        text: "กรุณารอสักครู่",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      var urlperson = `https://script.google.com/macros/s/AKfycby0PvZlQAiItxAxsDb_b1F2s5ZHYsGq9fsAJpXuGPv0-4bn-v6KTzjvb7ku5tigbhu4zw/exec`;
      var dataperson = `?id=${localStorage.getItem(
        "uuid"
      )}&xmain=${xmainValue}&xsub=${xsubValue}&cmain=${cmainValue}&csub=${csubValue}&lat=${latValue}&long=${longValue}&db1=${db1Value}`;
      fetch(urlperson + dataperson)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // ปิดการโหลดและแสดงข้อความสำเร็จ
          Swal.fire({
            title: "สำเร็จ!",
            text: "การแก้ไขข้อมูลเสร็จสิ้น",
            icon: "success",
            allowOutsideClick: false,
          }).then(() => {
            localStorage.clear();
            location.reload();
          });
        })
        .catch((error) => {
          // ปิดการโหลดและแสดงข้อความผิดพลาด
          console.error("Fetch error:", error);
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
            icon: "error",
          });
        });
    }
  });
}

// ขอ Token
function editauth() {
  var myParam = window.location.search;

  if (!myParam || myParam.trim() === "") {
    Swal.fire({
      title: "กรุณา ออก Token ก่อน!",
      text: "ค่าพารามิเตอร์ว่างเปล่า",
      icon: "error",
    });
    return; // Exit the function
  }

  var exc = myParam.split("code=")[1].split("&")[0];
  Swal.fire({
    title: "ยืนยันการแก้ไข.!",
    html: exc,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    cancelButtonColor: "#d33",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      var urlperson = `https://script.google.com/macros/s/AKfycbwpHkzIA1CCo7axs6MONxvrAvqwg00_lPTNe4wCL8mTl8kNTX5eCk4BV3LwQZyySEicXg/exec`;
      var dataperson = `?id=${localStorage.getItem("uuid")}&token=${exc}`;
      fetch(urlperson + dataperson)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Handle the data returned from the server
          console.log(data);

          // Show a success message using SweetAlert
          Swal.fire({
            title: "สำเร็จ!",
            text: "การแก้ไขข้อมูลเสร็จสิ้น",
            icon: "success",
          }).then(() => {
            location.reload();
          });
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error("Fetch error:", error);

          // Show an error message using SweetAlert
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
            icon: "error",
          });
        });
    }
  });
}

const loader = document.getElementById("loader");

function showLoader() {
  var overlay = document.getElementById("loadingOverlay");
  overlay.style.display = "flex";
}

function hideLoader() {
  var overlay = document.getElementById("loadingOverlay");
  overlay.style.display = "none";
}

// เมื่อกดปุ่ม submit
var form = document.getElementById("edittoken");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Use SweetAlert2 for confirmation
  Swal.fire({
    title: "ออก Line Token?",
    text: "เมื่อออก Line Token แล้ว โปรดให้รอหน้าเว็บโหลดเสร็จ แล้วกดปุ่ม บันทึก อีกครั้ง.!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms, proceed with your logic
      let uuid = localStorage.getItem("uuid");
      let url = "https://wisanusenhom.github.io/sekatime/setting.html";
      let cid = "oXTr5al05irtPoZ9pkWof9";
      let noti = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${cid}&redirect_uri=${url}&scope=notify&state=${uuid}`;

      // Redirect the user
      window.location.replace(noti);
    }
    // If user cancels, you can handle it or do nothing
  });
});

// รับการแจ้งเตือน
function toggleState() {
  var buttonnotify = document.getElementById("toggleButton");

  // Toggle the class and value attribute
  if (buttonnotify.classList.contains("ปิดรับการแจ้งเตือน")) {
    buttonnotify.classList.remove("ปิดรับการแจ้งเตือน");
    buttonnotify.classList.add("รับการแจ้งเตือน");
    buttonnotify.value = "ปิดรับการแจ้งเตือน";
  } else {
    buttonnotify.classList.remove("รับการแจ้งเตือน");
    buttonnotify.classList.add("ปิดรับการแจ้งเตือน");
    buttonnotify.value = "รับการแจ้งเตือน";
  }

  // เรียกใช้ฟังก์ชันที่ต้องการ
  var tokenValue = document.getElementById("token").value;
  if (tokenValue) {
    sentnotify(buttonnotify.value, tokenValue);
  } else {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "กรุณาออก Token แล้วบันทึก หากดำเนินการสำเร็จ จะมีข้อความส่ง ไปยัง Line",
    });
  }
}

// รับการแจ้งเตือน
function sentnotify(buttonnotify, tokenValue) {
  Swal.fire({
    title: "ยืนยัน.!",
    html: buttonnotify,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    cancelButtonColor: "#d33",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      var urlperson = `https://script.google.com/macros/s/AKfycbzF6nq3odlvAFrsY5LCmkZWenAv11fVuojQxz9ru0_stJFAwnqwPe6sqObJ3-7s1kaqsA/exec`;
      var dataperson = `?id=${localStorage.getItem(
        "uuid"
      )}&notify=${buttonnotify}&token=${tokenValue}`;
      fetch(urlperson + dataperson)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Handle the data returned from the server
          console.log(data);

          // Show a success message using SweetAlert
          Swal.fire({
            title: "สำเร็จ!",
            text: "การแก้ไขข้อมูลเสร็จสิ้น",
            icon: "success",
          }).then(() => {
            location.reload();
          });
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error("Fetch error:", error);

          // Show an error message using SweetAlert
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
            icon: "error",
          });
        });
    }
  });
}

function craetetoken() {
  Swal.fire({
    title: "ยืนยันการดำเนินการ",
    text: 'คลิก "ตกลง" เพื่อดำเนินการต่อ',
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      window.open("https://wisanusenhom.github.io/nu/token.html", "_blank");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("การดำเนินการถูกยกเลิก", "", "info");
    }
  });
}
