import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

   
  constructor(public fb:FormBuilder){}
  
  sumAmount:any=""
  total_amt:any=""
  userform:FormGroup=this.fb.group({
    
    name:new FormControl("",{
      validators:[
        Validators.required,Validators.maxLength(20),
        Validators.pattern("^[A-Za-z][A-Za-z0-9_]{4,20}$")
      ]
    }),
    email:new FormControl("",{
      validators:[
        Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"),
        Validators.email
      ]
    }),
   
    addressdetials: this.fb.array([ 
     this.addressForm()
    ],Validators.required),


   
  
    

  })
   

  
  addressForm(){
    return this.fb.group({
      city:this.fb.control("",{
        validators:Validators.required,
      }),
      state:this.fb.control("",{
        validators:Validators.required,
      })
    })
  }
 
  get addressdetials() {
    return this.userform.get('addressdetials') as FormArray;
  }
 
  addAddress() {
    this.addressdetials.push(this.addressForm());
  }

  remove(index:any){
    this.addressdetials.removeAt(index)
  }

  isCityInvalid(index: number) {
    const addressGroup = this.addressdetials.at(index);
    const cityControl = addressGroup.get('city');
    return cityControl?.invalid && cityControl?.touched;
  }

  isStateInvalid(index: number) {
    const addressGroup = this.addressdetials.at(index);
    const stateControl = addressGroup.get('state');
    return stateControl?.invalid && stateControl?.touched ;
  }
  submit(){
    if(this.userform.invalid) {
      return this.userform.markAllAsTouched();
  
    }else{
      console.log(this.userform.value);
     
     
    }
  }

}
