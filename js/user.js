document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem('uuid');
    const xmain = localStorage.getItem('mainsub');
    const loader = document.getElementById('loader');

    if (!userId) {
        window.location.href = 'login.html';
        return;
    }

    function showLoader() {
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    showLoader();

    await fetch(`https://script.google.com/macros/s/AKfycbx_wknldnTbHr4a32h1-3iYe1v_Fx9c4o7BzL9wfgEG1_dEESAHENT_22SZH9EufXHDxg/exec?id=${userId}`)
        .then(response => response.json())
        .then(data => {
            hideLoader();

            const usertb = document.getElementById("tbody");
            let datatb = '';
            data.user.forEach(function (user) {
                datatb += `<tr>
                    <td>${user.status}</td>
                    <td><img src="${user.upic}" width="50" height="50"></td>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.position}</td>
                    <td>${user.mainsub}</td>
                    <td>${user.office}</td>
                    <td>${user.role}</td>
                    <td>${user.boss}</td>
                    <td>${user.ceo}</td>
                    <td>${user.docno}</td>
                </tr>`;
            });
            usertb.innerHTML = datatb;

            if ($.fn.dataTable.isDataTable("#userdata")) {
                $("#userdata").DataTable().clear().destroy();
            }

            $('#userdata').DataTable({
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json',
                },
                data: data.user,
                columns: [
                    {
                        data: 'status',
                        render: function (data) {
                            const statusClass = data === 'deactive' ? 'status pending' : data === 'active' ? 'status completed' : 'primary';
                            return `<span class="${statusClass}">${data}</span>`;
                        }
                    },
                    {
                        data: 'upic',
                        render: function (data) {
                            return `<img src="${data}" alt="User Image" width="50" height="50">`;
                        }
                    },
                    { data: 'id' },
                    { data: 'name' },
                    { data: 'position' },
                    { data: 'mainsub' },
                    { data: 'office' },
                    { data: 'role' },
                    { data: 'boss' },
                    { data: 'ceo' },
                    { data: 'docno' }
                ],
                processing: true,
                responsive: true,
                order: [[0, 'asc'], [2, 'asc'], [5, 'asc'], [6, 'asc'], [4, 'asc']],
                colReorder: true,
                fixedColumns: true,
                fixedHeader: true,
                keys: true,
                dom: 'lBfrtip',
                lengthMenu: [[10, 30, 50, 100, 150, -1], [10, 30, 50, 100, 150, "ทั้งหมด"]],
                select: true,
                pageLength: 10,
                buttons: [
                    {
                        text: 'กำหนด สถานะ',
                        action: async function () {
                            const selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();
                            if (selectedRows.length === 0) {
                                Swal.fire("Oops...", "โปรดเลือกรายการ", "error");
                                return;
                            }

                            const selectedId = selectedRows[0].id;
                            const { value: status } = await Swal.fire({
                                title: `Select ID: ${selectedId}`,
                                input: "select",
                                inputOptions: {
                                    active: "active",
                                    deactive: "deactive"
                                },
                                inputPlaceholder: "เลือกสถานะ",
                                showCancelButton: true,
                                inputValidator: (value) => {
                                    return new Promise((resolve, reject) => {
                                        if (value !== '') {
                                            Swal.fire({
                                                title: 'กำลังบันทึก...',
                                                allowOutsideClick: false,
                                                didOpen: () => Swal.showLoading()
                                            });

                                            fetch(`https://script.google.com/macros/s/AKfycbzG3iZIFdXR_GtjwdXhVYgjKG5v5TkZY9z4ECoqQU8128z_xeq4jgRFtR-DmOtYZkjF/exec?id=${selectedId}&sts=${value}&updateby=${localStorage.getItem("name")}`)
                                                .then(res => res.json())
                                                .then(() => {
                                                    Swal.fire("สำเร็จ", "การแก้ไขข้อมูลสำเร็จ", "success").then(() => location.reload());
                                                    resolve();
                                                })
                                                .catch(error => {
                                                    Swal.fire("Error", `เกิดข้อผิดพลาด: ${error.message}`, "error");
                                                    reject();
                                                });
                                        } else {
                                            resolve("กรุณาเลือกสถานะ");
                                        }
                                    });
                                }
                            });
                        }
                    },
                    {
                        text: 'กำหนด สิทธิ์',
                        action: async function () {
                            const selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();
                            if (selectedRows.length === 0) {
                                Swal.fire("Oops...", "โปรดเลือกรายการ", "error");
                                return;
                            }

                            const selectedId = selectedRows[0].id;
                            try {
                                const response = await fetch(`https://script.google.com/macros/s/AKfycbxRvUvrua5NNeRskiXrcVF4zI1NNgJFRiFaB3a4jIlpB4Mv6NCHoxo_oBKZIuM0M1Zo/exec?id=${userId}&updateby=${localStorage.getItem("name")}`);
                                const data = await response.json();
                                const options = {};
                                data.role.forEach(item => options[item.id] = item.name);

                                await Swal.fire({
                                    title: `Select ID: ${selectedId}`,
                                    input: "select",
                                    inputOptions: options,
                                    inputPlaceholder: "เลือกสิทธิ์",
                                    showCancelButton: true,
                                    inputValidator: (value) => {
                                        return new Promise((resolve) => {
                                            if (value !== '') {
                                                Swal.fire({
                                                    title: 'กำลังบันทึก...',
                                                    allowOutsideClick: false,
                                                    didOpen: () => Swal.showLoading()
                                                });

                                                fetch(`https://script.google.com/macros/s/AKfycbyBJA6m1I4CxRUPE_a5GuN2dDo8gS2Mxr1-qkm9MpCe0xSeo6o-G4cgsP-w8Mh98fua/exec?id=${selectedId}&sts=${value}&updateby=${localStorage.getItem("name")}`)
                                                    .then(res => res.json())
                                                    .then(() => {
                                                        Swal.fire("สำเร็จ", "การแก้ไขข้อมูลสำเร็จ", "success").then(() => location.reload());
                                                        resolve();
                                                    })
                                                    .catch(error => {
                                                        Swal.fire("Error", `เกิดข้อผิดพลาด: ${error.message}`, "error");
                                                        resolve();
                                                    });
                                            } else {
                                                resolve("กรุณาเลือกสิทธิ์");
                                            }
                                        });
                                    }
                                });
                            } catch (error) {
                                Swal.fire("Error", `เกิดข้อผิดพลาดในการดึงข้อมูล: ${error.message}`, "error");
                            }
                        }
                    },
                    {
                        text: 'กำหนด เลขที่หนังสือ',
                        action: async function () {
                            const selectedRows = $('#userdata').DataTable().rows({ selected: true }).data();
                            if (selectedRows.length === 0) {
                                Swal.fire("Oops...", "เลือกรายการที่ต้องกำหนดเลขที่หนังสือ", "error");
                                return;
                            }

                            const selectedId = selectedRows[0].id;
                            const { value: docno } = await Swal.fire({
                                title: `Select ID: ${selectedId}`,
                                input: "text",
                                inputLabel: "กรอกเลขที่หนังสือ",
                                inputPlaceholder: "บก xxxx",
                                showCancelButton: true,
                                inputValidator: (value) => {
                                    return new Promise((resolve) => {
                                        if (value.trim() !== '') {
                                            Swal.fire({
                                                title: 'กำลังบันทึก...',
                                                allowOutsideClick: false,
                                                didOpen: () => Swal.showLoading()
                                            });

                                            fetch(`https://script.google.com/macros/s/AKfycbzJb3Bsc5VNCvukDAdS_LKgTzSIQqIRO8H_882LAFJM0YJNnsyagUEa5QcuMn4yYHii/exec?id=${selectedId}&sts=${value.trim()}&updateby=${localStorage.getItem("name")}`)
                                                .then(res => res.json())
                                                .then(() => {
                                                    Swal.fire("สำเร็จ", "บันทึกเลขที่หนังสือแล้ว", "success").then(() => location.reload());
                                                    resolve();
                                                })
                                                .catch(error => {
                                                    Swal.fire("Error", `เกิดข้อผิดพลาด: ${error.message}`, "error");
                                                    resolve();
                                                });
                                        } else {
                                            resolve("กรุณากรอกเลขที่หนังสือ");
                                        }
                                    });
                                }
                            });
                        }
                    },
                    'excel', 'print'
                ]
            });
        })
        .catch(error => {
            hideLoader();
            console.error("Error fetching data:", error);
            Swal.fire("Error", "ไม่สามารถโหลดข้อมูลได้", "error");
        });
});

