import { Component } from '@angular/core';
import {FormBuilder, Validators, ValidatorFn} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fakebook Account';

  myForm

  Users = []

  email :string = "";
  password : string = "";
  passconfirm : string = "";
  
   constructor (formBuilders : FormBuilder){
     this.myForm = formBuilders.group({
       email : ["",Validators.email],
       password : ['',Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
     });

     const confirmPasswordControl = new FormControl('', {
      validators: sameValueAs(this.myForm, 'password')
    });

    this.myForm.addControl('passconfirm', confirmPasswordControl); 

    function sameValueAs(group: FormGroup, controlName: string): ValidatorFn {
      return (control: FormControl) => {
            const myValue = control.value;
            const compareValue = group.controls[controlName].value;
    
            return (myValue === compareValue) ? null : {valueDifferentFrom:controlName};
    
      };
    }
}

  submit(){
   this.Users.push({email : this.email, password : this.password, passconfirm : this.passconfirm})
  }

}
