import { getID, getValue } from "./main.js";
// import { getValue } from "./main.js";

export function Validation() {
    this.checkEmpty = function (value, spanID, message) {
        if (value === "") {
            getID(spanID).innerHTML = message;
            getID(spanID).style.display = "block";
            return false;
        }

        getID(spanID).innerHTML = "";
        getID(spanID).style.display = "none";
        return true;
    }
    this.checkID = function (value, spanID, message, ds) {
        var isExist = ds.some(function (p, index) {
            // return biểu thức so sanh
            return p.id === value;
        });
        if (isExist) {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
        //?hợp lệ
        document.getElementById(spanID).innerHTML = "";
        document.getElementById(spanID).style.display = "none";
        //trả kết quả true
        return true;
    }
    this.checkEmail = function (value, spanID, message) {
        var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (value.match(pattern)) {

            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";

            return true;
        }

        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";

        return false;
    }
        this.checkPoint = function (value, spanID, message) {
        var pattern = /^[0-9]+$/;
        if (value.match(pattern) && value >= 0 && value <= 10) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;
    }
    this.checkDayWork = function (value, spanID, message) {
        var pattern = /^[0-9]+$/;
        if (value.match(pattern) && value >= 0 && value <= 30) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;
    }
    this.checkBill = function (value, spanID, message) {
        var pattern = /^[0-9]+$/;
        if (value.match(pattern) && value >= 0) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;
    }
    this.checkName = function (value, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (value.match(pattern)) {
            getID(spanID).innerHTML = "";
            getID(spanID).style.display = "none";
            return true;
        }
        getID(spanID).innerHTML = message;
        getID(spanID).style.display = "block";
        return false;

    }
    
}