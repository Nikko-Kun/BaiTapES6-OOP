import { Person } from "./person.js";
export class Employee extends Person{
    constructor(soNgayLam, luong, ...restPerson){
        super(...restPerson);
        this.soNgayLam = soNgayLam;
        this.luong = luong;
    }
    totalSalary(){
        this.total = this.soNgayLam * this.luong;
    }
    getDetails(){
        this.result =  `
        Ngày Làm: ${this.soNgayLam}<br/>
        Ngày Lương: ${this.luong}<br/>
        Tổng Lương: ${this.total}
        `
    }
}