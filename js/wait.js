// Function to fetch data asynchronously
document.addEventListener("DOMContentLoaded", async function () {
  var UUID = localStorage.getItem("uuid");
  // console.log(sDate);
  // console.log(eDate);
  // console.log(UUID);
  // console.log(limit);
  showLoader();
  // Replace the URL with your actual API endpoint
  var apiUrl =
    "https://script.google.com/macros/s/AKfycbyQoVExSVyf6F2lWUCq-868Od1RvnOp2MNE4H264oPmG4_YXebrIrW9RkLWyP2QdoV4/exec";

  // Construct the query parameters based on your requirements
  var queryParams = `?id=${UUID}`;

  // Make a GET request using Fetch API
  await fetch(apiUrl + queryParams)
    .then((response) => response.json())
    .then((data) => {
      //  console.log(data);
      const reporttb = document.getElementById("reportdata");
      let datartb = "";
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

                <td>${tst.ref}</td>
          
            </tr>`;
      });
      // console.log(datartb);
      reporttb.innerHTML = datartb;
      hideLoader();

      if ($.fn.dataTable.isDataTable("#dreportdata")) {
        $("#dreportdata").DataTable().clear().destroy();
      }

      $("#dreportdata").DataTable({
        data: data.tst,
        columns: [
          { data: "day" },
          { data: "datein" },
          { data: "name" },
          { data: "subname" },
          { data: "typein" },
          { data: "timein" },
          { data: "disin" },
          { data: "timeout" },
          { data: "disout" },
          { data: "notein" },

          { data: "request" },
          { data: "reqdate" },
          { data: "reqtime" },

          { data: "ref" },
        ],
        language: {
          url: "https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json",
        },
        processing: true,
        responsive: true,
        autoFill: true,
        select: true,
        order: [
          [1, "asc"],
          [5, "asc"],
        ],
        // "columnDefs": [
        //     {
        //         "targets": 0,
        //         "render": DataTable.render.datetime('ddd Do MMM YY')
        //     }
        // ],
        colReorder: true,
        // "fixedColumns": true,
        fixedHeader: true,
        keys: true,
        dom: "lBfrtip", // เพิ่ม 'l' เพื่อแสดง "Show [n] entries"
        lengthMenu: [
          [10, 30, 50, 100, 150, -1],
          [10, 30, 50, 100, 150, "ทั้งหมด"],
        ], // รายการตัวเลือกในปุ่ม

        pageLength: 30,

        buttons: [
            {
                text: "อนุญาตรายบุคคล",
                action: async function () {
                  const table = $("#dreportdata").DataTable();
                  const selectedData = table.rows({ selected: true }).data();
              
                  if (!selectedData.length) {
                    return Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "กรุณาเลือกข้อมูลจากตารางก่อน!",
                    });
                  }
              
                  const selectedId = selectedData[0].ref;
              
                  const { value: status } = await Swal.fire({
                    title: `เลือกสถานะสำหรับ RefNo. : ${selectedId}`,
                    input: "select",
                    inputOptions: {
                      อนุญาต: "อนุญาต",
                      ไม่อนุญาต: "ไม่อนุญาต",
                    },
                    inputPlaceholder: "เลือกสถานะ...",
                    showCancelButton: true,
                    inputValidator: (value) =>
                      !value ? "กรุณาเลือกสถานะ" : undefined,
                  });
              
                  if (!status) return; // User canceled status selection
              
                  const { isConfirmed } = await Swal.fire({
                    title: "ยืนยันการดำเนินการ",
                    text: `คุณต้องการยืนยันการ "${status}" ใช่หรือไม่?`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "ยืนยัน",
                    cancelButtonText: "ยกเลิก",
                  });
              
                  if (!isConfirmed) {
                    return Swal.fire("การดำเนินการถูกยกเลิก", "", "info");
                  }
              
                  Swal.fire({
                    title: "กำลังบันทึกข้อมูล...",
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                  });

                     
                  try {
                    const response = await fetch(
                      `https://script.google.com/macros/s/AKfycbw_iodN_g0zw4PwzLn9E-u_x9pApSa5-DODWLDxplOxLFfsWYCaDI5mrg5jwD10_y2G/exec?ref=${selectedId}&sts=${status}&id=${UUID}`
                    );
              
                    const data = await response.json();
                    Swal.close();
              
                    const resultText = data?.sts?.[0]?.sts === "ok"
                      ? "บันทึกข้อมูลเรียบร้อยแล้ว!"
                      : "ไม่สามารถบันทึกข้อมูลได้";
              
                    Swal.fire({
                      icon: data?.sts?.[0]?.sts === "ok" ? "success" : "error",
                      title: "ผลลัพธ์",
                      text: resultText,
                    }).then(() => {
                      if (data?.sts?.[0]?.sts === "ok") location.reload();
                    });
                  } catch (error) {
                    Swal.close();
                    console.error("Fetch error:", error);
                    Swal.fire({
                      icon: "error",
                      title: "เกิดข้อผิดพลาด",
                      text: "ไม่สามารถเชื่อมต่อกับระบบได้",
                    });
                  }
                },
              },              
              {
                text: "อนุญาตทั้งหมด",
                action: function () {
                  var refArray = $("#dreportdata").DataTable().column(13, { search: "applied" }).data().toArray();
                  var count = refArray.length;
              
                  if (count < 1) {
                    Swal.fire({
                      title: "ผิดพลาด",
                      icon: "error",
                      text: "ไม่มีข้อมูลในตาราง",
                      confirmButtonText: "ตกลง",
                    });
                    return;
                  }
              
                  Swal.fire({
                    title: "คุณต้องการ.! อนุญาตหรือไม่?",
                    icon: "warning",
                    html: " จำนวน " + count + " รายการ",
                    showCancelButton: true,
                    confirmButtonText: "ตกลง",
                    cancelButtonText: "ยกเลิก",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "กำลังบันทึกข้อมูล...",
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading(),
                      });
              
                      const encodedRef = encodeURIComponent(JSON.stringify(refArray));
              
                      fetch(
                        `https://script.google.com/macros/s/AKfycbws7_FeW7jhLHWVrE64QXdwYDz4gSI8k5zsG4jk48hnWkhDklTOmM1moc_PR69T2Sb6/exec?ref=${encodedRef}&id=${UUID}`
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          Swal.close();
                          Swal.fire({
                            title: "สำเร็จ!",
                            text: "บันทึกข้อมูลเรียบร้อยแล้ว!",
                            icon: "success",
                          }).then(() => {
                            location.reload();
                          });
                        })
                        .catch((error) => {
                          Swal.close();
                          console.error("Error during fetch:", error);
                          Swal.fire(
                            "เกิดข้อผิดพลาด!",
                            "กรุณาลองใหม่อีกครั้ง",
                            "error"
                          );
                        });
                    }
                  });
                },
              }
              ,
          // {
          //     text: 'อนุญาตทั้งหมด(เดิม)',
          //     action: function () {
          //         var refArray = $('#dreportdata').DataTable().column(10, { search: 'applied' }).data().toArray()
          //         console.log(refArray);
          //         var count = refArray.length;
          //         console.log('Number of elements in the array:', count);

          //         Swal.fire({
          //             title: "คุณต้องการ.! อนุญาตทั้งหมดหรือไม่?",
          //             icon: "warning",
          //             // html: " จำนวน " + count + " รายการ",
          //             showCancelButton: true, // Show Cancel button
          //             confirmButtonText: "ตกลง", // Text for the Confirm button
          //             cancelButtonText: "ยกเลิก", // Text for the Cancel button
          //         })
          //             .then((result) => {
          //                 // Check if the user clicked "ตกลง"
          //                 if (result.isConfirmed) {
          //                     // Call the fetch function
          //                     fetch(`https://script.google.com/macros/s/AKfycbw6JUXHkUtaTlUbghOUkA2L4_hkGyLsxKzPfR4hTEV_tdSAMXwVhi-G0rKPwWz7NXi0iw/exec?id=${UUID}`)
          //                         .then(response => response.json())
          //                         .then(data => {
          //                             // Process the data as needed
          //                            // console.log(data);
          //                             // Show a success SweetAlert notification
          //                             Swal.fire({
          //                                 title: "สำเร็จ!",
          //                                 text: "บันทึกข้อมูลเรียบร้อยแล้ว!",
          //                                 icon: "success"
          //                               }).then(() => {
          //                                 location.reload();
          //                               });
          //                         })
          //                         .catch(error => {
          //                             // Handle errors
          //                             console.error('Error during fetch:', error);
          //                             // Show an error SweetAlert notification
          //                             Swal.fire("เกิดข้อผิดพลาด!", "กรุณาลองใหม่อีกครั้ง", "error");
          //                         });
          //                 } else {
          //                     // User clicked "ยกเลิก"
          //                     // Handle the cancellation or perform any other action
          //                 }
          //             });

          //     }
          // }
          "excel",
          "print",
        ], // button end
      });
    });
});

const loader = document.getElementById("loader");

function showLoader() {
  loader.style.display = "block"; // แสดง loader
}

function hideLoader() {
  loader.style.display = "none"; // ซ่อน loader
}
