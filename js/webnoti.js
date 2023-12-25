document.addEventListener("DOMContentLoaded", function() {
    // ทำสิ่งต่าง ๆ เมื่อหน้าเว็บโหลดเสร็จ
    console.log("หน้าเว็บได้โหลดเสร็จแล้ว!");
  
    // ตรวจสอบ Web Notification และขออนุญาต
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          // ผู้ใช้อนุญาตให้แสดง Notification
          showNotification();
        }
      });
    } else {
      console.log('Web Notification ไม่ได้รับการสนับสนุนในเบราว์เซอร์นี้');
    }
  });
  
  // ฟังก์ชั่นสร้างและแสดง Notification
  function showNotification() {
    var notification = new Notification('สวัสดี!', {
      body: 'ยินดีต้อนรับสู่ตัวอย่าง Web Notification',
      icon: 'images/logo.png'
    });
  
    notification.onclick = function () {
      // ทำอะไรก็ตามเมื่อผู้ใช้คลิกที่ Notification
      window.open('https://www.example.com');
    };
  }
  