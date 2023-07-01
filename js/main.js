window.xemThongTin = xemThongTin;
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
        hienThiSV(ds.mangDS);
        getID("btnThem").style.display = "block";
        getID("userStudent").style.display = "flex";
        getID("userEmployee").style.display = "none";
        getID("userCustomer").style.display = "none";
        getID("userCustomer-review").style.display = "none";
        getID("btnAdd").onclick = themStudent;
        getID("btnCapNhat").onclick = capNhatThongTinSV;    
        break;
      case "2":
        hienThiNV(ds.mangDS);
        getID("btnThem").style.display = "block";
        getID("userStudent").style.display = "none";
        getID("userEmployee").style.display = "flex";
        getID("userCustomer").style.display = "none";
        getID("userCustomer-review").style.display = "none";
        getID("btnAdd").onclick = themEmployee;
        getID("btnCapNhat").onclick = capNhatThongTinNV;    
        break;
      case "3":
        hienThiCS(ds.mangDS);
        getID("btnThem").style.display = "block";
        getID("userStudent").style.display = "none";
        getID("userEmployee").style.display = "none";
        getID("userCustomer").style.display = "flex";
        getID("userCustomer-review").style.display = "block";
        getID("btnAdd").onclick = themCustomer;
        getID("btnCapNhat").onclick = capNhatThongTinCS;    
        break;
      case "0":
        hienThi(ds.mangDS);
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
    ds.mangDS = dataLocal;
    sortArrayDS();
    hienThi(ds.mangDS);
  }
}
getLocalStorage();

function sortArrayDS () {
  ds.mangDS.sort(function(a, b) {
    var x = a.name.toLowerCase(); // Bỏ qua Hoa Thường
    var y = b.name.toLowerCase(); // Bỏ qua Hoa Thường
    if(x < y) {
        return -1;
    }
    if(x > y) {
        return 1;
    }
    // Tên giống nhau
    return 0;
  });

}
sortArrayDS();

function themStudent() {
  var id = document.getElementById("personID").value;
  var ten = document.getElementById("personName").value;
  var email = document.getElementById("personEmail").value;
  var address = document.getElementById("personContact").value;
  var toan = document.getElementById("diemToan").value;
  var ly = document.getElementById("diemLy").value;
  var hoa = document.getElementById("diemHoa").value;

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
  
  isValid &= validation.checkEmpty(
    getValue("personContact"),
    "spanContact",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
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
)&&
validation.checkID(
  getValue("personID"),
  "spanID",
  "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>This id already exists",ds.mangDS
);

  if (isValid) {
    var p = new Student(toan, ly, hoa, id, ten, address, email);
    p.diemTB();
    p.getDetails();
    ds.themDS(p);
    setLocalStorage();
    hienThiSV(ds.mangDS);
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
  )&&
  validation.checkID(
    getValue("personID"),
    "spanID",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>This id already exists",ds.mangDS
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


  if (isValid) {

    var p = new Employee(ngayLam, luong, id, ten, address, email);
    p.totalSalary();
    p.getDetails();
    ds.themDS(p);
    setLocalStorage();
    hienThiNV(ds.mangDS);
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
  )&&
  validation.checkID(
    getValue("personID"),
    "spanID",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>This id already exists",ds.mangDS
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
    getValue("tenCongTy"),
    "spanCompanyName",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
  );

  isValid &= validation.checkEmpty(
    getValue("danhGia"),
    "spanReview",
    "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here!"
  );

  if (isValid) {

    var p = new Customer(tenCongTy, hoaDon, danhGia, id, ten, address, email);
    p.getDetails();
    ds.themDS(p);
    setLocalStorage();
    hienThiCS(ds.mangDS);
    resetForm();
  }
}

function hienThi(mang) {
  var content = "";
    mang.map(function (p, index) {
  
    if (true) {
      var tr = `<tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>${p.address}</td>
      <td>${p.result}</td>
      <td>
      <button class="btn btn-danger" id="xoaDT" onclick="xoaDoiTuong('${p.id}')">Xóa</button>
        <button class="btn btn-info btnInfo" id="xemTT" onclick="xemThongTin('${p.id}')" data-toggle="modal"
        data-target="#exampleModal">Xem</button>
      </td>
    </tr>`;
content += tr;
    }
  
  });
  getID("tbodylist").innerHTML = content;
}
function hienThiSV(mang) {
  var content = "";
    mang.map(function (p, index) {
  
    if (p.toan) {
      var tr = `<tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>${p.address}</td>
      <td>${p.result}</td>
      <td>
      <button class="btn btn-danger" id="xoaDT" onclick="xoaDoiTuong('${p.id}')">Xóa</button>
        <button class="btn btn-info btnInfo" id="xemTT" onclick="xemThongTin('${p.id}')" data-toggle="modal"
        data-target="#exampleModal">Xem</button>
      </td>
    </tr>`;
content += tr;
    }
  
  });
  getID("tbodylist").innerHTML = content;
}
function hienThiNV(mang) {
  var content = "";
    mang.map(function (p, index) {
  
    if (p.luong) {
      var tr = `<tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>${p.address}</td>
      <td>${p.result}</td>
      <td>
      <button class="btn btn-danger" id="xoaDT"  onclick="xoaDoiTuong('${p.id}')">Xóa</button>
        <button class="btn btn-info btnInfo" id="xemTT" onclick="xemThongTin('${p.id}')" data-toggle="modal"
        data-target="#exampleModal">Xem</button>
      </td>
    </tr>`;
content += tr;
    }
  
  });
  getID("tbodylist").innerHTML = content;
}
function hienThiCS(mang) {
  var content = "";
    mang.map(function (p, index) {
  
    if (p.tenCongTy) {
      var tr = `<tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>${p.address}</td>
      <td>${p.result}</td>
      <td>
      <button class="btn btn-danger" id="xoaDT" onclick="xoaDoiTuong('${p.id}')">Xóa</button>
        <button class="btn btn-info btnInfo" id="xemTT" onclick="xemThongTin('${p.id}')" data-toggle="modal"
        data-target="#exampleModal">Xem</button>
      </td>
    </tr>`;
content += tr;
    }
  
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
function capNhatThongTinSV() {
  var id = document.getElementById("personID").value;
  var ten = document.getElementById("personName").value;
  var email = document.getElementById("personEmail").value;
  var address = document.getElementById("personContact").value;
  var toan = document.getElementById("diemToan").value;
  var ly = document.getElementById("diemLy").value;
  var hoa = document.getElementById("diemHoa").value;

  var p = new Student(toan, ly, hoa, id, ten, address, email);
  p.diemTB();
  var result = ds.capNhat(p);
  if (result) {
    setLocalStorage();
    hienThiSV(ds.mangDS);
    resetForm();
    console.log("cap nhat thanh cong roi!");
  } else {
    alert("Cập nhật thất bại rồi nhé!");
  }
}
function capNhatThongTinNV() {
  var id = document.getElementById("personID").value;
  var ten = document.getElementById("personName").value;
  var email = document.getElementById("personEmail").value;
  var address = document.getElementById("personContact").value;
  var ngayLam = document.getElementById("soNgaylam").value;
  var luong = document.getElementById("luongNgay").value;

  var p = new Employee(ngayLam, luong, id, ten, address, email);
  p.totalSalary();
  var result = ds.capNhat(p);
  if (result) {
    setLocalStorage();
    hienThiNV(ds.mangDS);
    resetForm();
    console.log("cap nhat thanh cong roi!");
  } else {
    alert("Cập nhật thất bại rồi nhé!");
  }
}
function capNhatThongTinCS() {
  var id = document.getElementById("personID").value;
  var ten = document.getElementById("personName").value;
  var email = document.getElementById("personEmail").value;
  var address = document.getElementById("personContact").value;
  var tenCongTy = document.getElementById("tenCongTy").value;
  var hoaDon = document.getElementById("triGiaHoaDon").value;
  var danhGia = document.getElementById("danhGia").value;

  var p = new Customer(tenCongTy, hoaDon, danhGia, id, ten, address, email);
  p.getDetails();
  var result = ds.capNhat(p);
  if (result) {
    setLocalStorage();
    hienThiCS(ds.mangDS);
    resetForm();
    console.log("cap nhat thanh cong roi!");
  } else {
    alert("Cập nhật thất bại rồi nhé!");
  }
}

getID("txtSearch").onkeyup = function () {
  var tuTim = document.getElementById("txtSearch").value;
  var mangTK = ds.timKiemTheoTen(tuTim);
  hienThi(mangTK);
};
