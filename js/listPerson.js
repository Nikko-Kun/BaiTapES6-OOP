import { getID, getValue, resetForm, ds } from "./main.js";
import { Validation } from "./validation.js";

export const validation = new Validation();

const checkValueInput = (id) => {
  getID(id).addEventListener("keyup", () => {
    let isValid = true;
    getID("personEmail").classList.remove("error");
    switch (id) {
      case "personEmail":
        isValid &=
          validation.checkEmpty(
            getValue(id),
            "spanEmail",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter your email address"
          ) &&
          validation.checkEmail(
            getValue(id),
            "spanEmail",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>example@gmail.com"
          );
        break;
      case "soNgaylam":
        isValid &=
          validation.checkEmpty(
            getValue(id),
            "spanDayNum",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here"
          ) &&
          validation.checkDayWork(
            getValue(id),
            "spanDayNum",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>not exceed 30 days"
          );
        break;
      case "diemToan":
        isValid &=
          validation.checkEmpty(
            getValue(id),
            "spanToan",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here"
          ) &&
          validation.checkPoint(
            getValue(id),
            "spanToan",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>[0 - 10 point]"
          );
        break;
      case "diemLy":
        isValid &=
          validation.checkEmpty(
            getValue(id),
            "spanLy",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here"
          ) &&
          validation.checkPoint(
            getValue(id),
            "spanLy",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>[0 - 10 point]"
          );
        break;
      case "diemHoa":
        isValid &=
          validation.checkEmpty(
            getValue(id),
            "spanHoa",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>Please enter here"
          ) &&
          validation.checkPoint(
            getValue(id),
            "spanHoa",
            "<i class='fa-solid fa-circle-exclamation pr-1' style='red'></i>[0 - 10 point]"
          );
        break;

      default:
        break;
    }
  });
};
document.getElementById("btnThem").addEventListener("click", () => {
  checkValueInput("personEmail");
  checkValueInput("soNgaylam");
  checkValueInput("diemToan");
  checkValueInput("diemLy");
  checkValueInput("diemHoa");
});




export function ListPerson(){
    this.mangDS = [];
    this.themDS = function(p){
        this.mangDS.push(p);
    }
    this.timIndex = function(ma) {
        var indexFind = -1;
        this.mangDS.map(function(p,index){
            if(p.id === ma){
                indexFind = index;
            }
        });
        console.log(indexFind);
        return indexFind;
    };
    this.xoaPerson = function(ma) {
        var index = this.timIndex(ma);
        console.log(index);
        if(index > -1){
            this.mangDS.splice(index,1);
        }
    }
    this.capNhat = function(p){
      var indexFind = this.timIndex(p.id);
      if(indexFind > -1){
          ds.mangDS[indexFind] = p;
          return true;
        }else{
            return false;
      }
  }
}

ListPerson.prototype.timKiemTheoTen =function(tuTim){
  var mangTK = [];
  var tuTimThuong = tuTim.toLowerCase();
  var tuTimReplace = tuTimThuong.replace(/\s/g,"");
  this.mangDS.map(function(p,index){
      var tenThuong = p.name.toLowerCase();
      var tenReplace = tenThuong.replace(/\s/g,"");

      var result = tenReplace.indexOf(tuTimReplace);
      if(result > -1){
          mangTK.push(p);
      }
  });
  return mangTK;
}