window.xemThongTin = xemThongTin;
window.capNhatThongTin = capNhatThongTin;
window.xoaDoiTuong = xoaDoiTuong;
window.resetForm = resetForm;

import { ListPerson } from "./listPerson.js";
import { Student } from "./student.js";
import { Employee } from "./employee.js";
import { Customer } from "./customer.js";
import { validation } from "./listPerson.js";

export const getID = (id) => {
  return document.getElementById(id);
};

export const getValue = (id) => {
  return document.getElementById(id).value;
};
export function resetForm() {
  getID("personForm").reset();
  getID("personID").disabled = false;
}
const selecteUserBefore = () => {
  getID("UserSelected").addEventListener("change", function () {
    var User = this.value;
    switch (User) {
      case "1":
        console.log("test-SV");
        getID("btnThem").style.display = "block";
        getID("userStudent").style.display = "flex";
        getID("userEmployee").style.display = "none";
        getID("userCustomer").style.display = "none";
        getID("btnAdd").onclick = themStudent;
        break;
      case "2":
        console.log("test-NV");
        getID("btnThem").style.display = "block";
        getID("userStudent").style.display = "none";
        getID("userEmployee").style.display = "flex";
        getID("userCustomer").style.display = "none";
        getID("btnAdd").onclick = themEmployee;
        break;
      case "3":
        console.log("test-CS");
        getID("btnThem").style.display = "block";
        getID("userStudent").style.display = "none";
        getID("userEmployee").style.display = "none";
        getID("userCustomer").style.display = "flex";
        getID("userCustomer-review").style.display = "block";
        getID("btnAdd").onclick = themCustomer;
        break;
      case "0":
        alert("Please select user before!");
    }
  });
};

selecteUserBefore();

export const ds = new ListPerson();

function setLocalStorage() {
  localStorage.setItem("DS", JSON.stringify(ds.mangDS));
}
function getLocalStorage() {
  var dataLocal = JSON.parse(localStorage.getItem("DS"));
  if (dataLocal !== null) {
    hienThi(dataLocal);
    ds.mangDS = dataLocal;
  }
}
getLocalStorage();

const checkValueInput = () => {
  var isValid = true;

  isValid &=
    validation.checkEmpty(
      getValue("personEmail"),
      "spanEmail",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
    ) &&
    validation.checkEmail(
      getValue("personEmail"),
      "spanEmail",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>example@gmail.com"
    );

  isValid &=
    validation.checkEmpty(
      getValue("soNgaylam"),
      "spanDayNum",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
    ) &&
    validation.checkDayWork(
      getValue("soNgaylam"),
      "spanDayNum",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>not exceed 30 days"
    );

  isValid &=
    validation.checkEmpty(
      getValue("diemToan"),
      "spanToan",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
    ) &&
    validation.checkPoint(
      getValue("diemToan"),
      "spanToan",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>[0 - 10 point]"
    );

  isValid &=
    validation.checkEmpty(
      getValue("diemLy"),
      "spanLy",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
    ) &&
    validation.checkPoint(
      getValue("diemLy"),
      "spanLy",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>[0 - 10 point]"
    );

  isValid &=
    validation.checkEmpty(
      getValue("diemHoa"),
      "spanHoa",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
    ) &&
    validation.checkPoint(
      getValue("diemHoa"),
      "spanHoa",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>[0 - 10 point]"
    );

  isValid &=
    validation.checkEmpty(
      getValue("personName"),
      "spanName",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
    ) &&
    validation.checkName(
      getValue("personName"),
      "spanName",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please check your name again"
    );

  isValid &= validation.checkEmpty(
    getValue("personID"),
    "spanID",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
  );

  isValid &=
    validation.checkEmpty(
      getValue("triGiaHoaDon"),
      "spanBill",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
    ) &&
    validation.checkBill(
      getValue("triGiaHoaDon"),
      "spanBill",
      "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please check it again"
    );

  isValid &= validation.checkEmpty(
    getValue("personContact"),
    "spanContact",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
  );

  isValid &= validation.checkEmpty(
    getValue("luongNgay"),
    "spanDaySalary",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
  );

  isValid &= validation.checkEmpty(
    getValue("tenCongTy"),
    "spanCompanyName",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
  );

  isValid &= validation.checkEmpty(
    getValue("danhGia"),
    "spanReview",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
  );

  return isValid;
};

function themStudent() {
  var id = document.getElementById("personID").value;
  var ten = document.getElementById("personName").value;
  var email = document.getElementById("personEmail").value;
  var address = document.getElementById("personContact").value;
  var toan = document.getElementById("diemToan").value;
  var ly = document.getElementById("diemLy").value;
  var hoa = document.getElementById("diemHoa").value;

  console.log(ten, address, id, email, toan, ly, hoa);
  var isValid = true;

  checkValueInput();

  if (isValid) {
    var p = new Student(toan, ly, hoa, id, ten, address, email);
    p.diemTB();
    p.getDetails();
    ds.themDS(p);
    setLocalStorage();
    hienThi(ds.mangDS);
    resetForm();
  }
}
function themEmployee() {
  var id = document.getElementById("personID").value;
  var ten = document.getElementById("personName").value;
  var email = document.getElementById("personEmail").value;
  var address = document.getElementById("personContact").value;
  var ngayLam = document.getElementById("soNgaylam").value;
  var luong = document.getElementById("luongNgay").value;

  var isValid = false;

  checkValueInput();

  if (isValid) {
    var p = new Employee(ngayLam, luong, id, ten, address, email);
    p.totalSalary();
    p.getDetails();
    ds.themDS(p);
    setLocalStorage();
    hienThi(ds.mangDS);
    resetForm();
  }
}
function themCustomer() {
  var id = document.getElementById("personID").value;
  var ten = document.getElementById("personName").value;
  var email = document.getElementById("personEmail").value;
  var address = document.getElementById("personContact").value;
  var tenCongTy = document.getElementById("tenCongTy").value;
  var hoaDon = document.getElementById("triGiaHoaDon").value;
  var danhGia = document.getElementById("danhGia").value;

  var isValid = false;

  checkValueInput();

  if (isValid) {
    var p = new Customer(tenCongTy, hoaDon, danhGia, id, ten, address, email);
    p.getDetails();
    ds.themDS(p);
    setLocalStorage();
    hienThi(ds.mangDS);
    resetForm();
  }
}

function hienThi(mang) {
  var content = "";
  mang.map(function (p, index) {
    var tr = `<tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.email}</td>
          <td>${p.address}</td>
          <td>${p.result}</td>
          <td>
          <button class="btn btn-danger" id="xoaDT" style="display: none; onclick="xoaDoiTuong('${p.id}')">Xóa</button>
            <button class="btn btn-info btnInfo" id="xemTT" style="display: none; onclick="xemThongTin('${p.id}')" data-toggle="modal"
            data-target="#exampleModal">Xem</button>
          </td>
        </tr>`;
    content += tr;
  });
  getID("tbodylist").innerHTML = content;
}

function xoaDoiTuong(id) {
  ds.xoaPerson(id);
  hienThi(ds.mangDS);
  setLocalStorage();
}

function xemThongTin(ma) {
  resetForm();

  let indexFind = ds.timIndex(ma);

  if (indexFind > -1) {
    let pFind = ds.mangDS[indexFind];
    getID("personID").value = pFind.id;
    getID("personID").disabled = true;
    getID("personName").value = pFind.name;
    getID("personEmail").value = pFind.email;
    getID("personContact").value = pFind.address;
    getID("diemToan").value = pFind.toan;
    getID("diemLy").value = pFind.ly;
    getID("diemHoa").value = pFind.hoa;
    getID("soNgaylam").value = pFind.soNgayLam;
    getID("luongNgay").value = pFind.luong;
    getID("tenCongTy").value = pFind.tenCongTy;
    getID("triGiaHoaDon").value = pFind.hoaDon;
    getID("danhGia").value = pFind.danhGia;
  }
}

function capNhatThongTin() {
  var id = document.getElementById("personID").value;
  var ten = document.getElementById("personName").value;
  var email = document.getElementById("personEmail").value;
  var address = document.getElementById("personContact").value;
  var toan = document.getElementById("diemToan").value;
  var ly = document.getElementById("diemLy").value;
  var hoa = document.getElementById("diemHoa").value;
  var ngayLam = document.getElementById("soNgaylam").value;
  var luong = document.getElementById("luongNgay").value;
  var tenCongTy = document.getElementById("tenCongTy").value;
  var hoaDon = document.getElementById("triGiaHoaDon").value;
  var danhGia = document.getElementById("danhGia").value;

  var isValid = false;
  console.log("step1");
  checkValueInput();

  let user = getID("UserSelected").value;

  if (user == 1) {
    var p = new Student(toan, ly, hoa, id, ten, address, email);
    p.diemTB();
    var result = ds.capNhat(p);
  }
  if (user == 2) {
    var p = new Employee(ngayLam, luong, id, ten, address, email);
    p.totalSalary();
    var result = ds.capNhat(p);
  }
  if (user == 3) {
    var p = new Customer(tenCongTy, hoaDon, danhGia, id, ten, address, email);
    p.getDetails();
    var result = ds.capNhat(p);
  }

  if (result) {
    setLocalStorage();
    hienThi(ds.mangDS);
    resetForm();
    console.log("cap nhat thanh cong roi!");
  } else {
    alert("Cập nhật thất bại rồi nhé!");
  }
}

document.getElementById("txtSearch").onkeyup = function () {
  var tuTim = document.getElementById("txtSearch").value;
  var mangTK = ds.timKiemTheoTen(tuTim);
  hienThi(mangTK);
};
