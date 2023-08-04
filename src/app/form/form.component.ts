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


   
   
    AmountDetials:this.fb.array([
      this.amountGroup(),
      
    ]),


    total_Amount:this.fb.control("")
    

  })
   
  amountGroup(){
    return this.fb.group({
      Amount:this.fb.control("",{})
      
      
    })
    
  }
  // 
 
  // 
  skillGroup(){
    return  this.fb.group({
      skill1:this.fb.control(""),
      skill2:this.fb.control(""),
      skill3:this.fb.control(""),
    })
  }
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
  //// //////////////////////////////////////////////
 
 compareAmount(){
  console.log("inside compareAmount")
  console.log("sumAmount",this.sumAmount);
  this.total_amt=this.total_Amount
  console.log("totalAmount",this.total_amt)
  if (this.sumAmount==this.total_amt) {
    console.log("success");
    console.log(this.userform.value)
    alert(JSON.stringify(this.userform.value));
  } else {
    console.log("fail");
  }
 }


  /////////////////////////////////////////////////

  get AmountDetials(){
   
    return this.userform.get('AmountDetials') as FormArray

  }

  addAmount(){
    
    this.AmountDetials.push(this.amountGroup())
    this.sumAmount=this.calculateSum()
    
  }
  get total_Amount(){

    return this.userform.get("total_Amount")?.value
  }

  get addressdetials() {
    return this.userform.get('addressdetials') as FormArray;
  }
 
  addAddress() {
    this.addressdetials.push(this.addressForm());
  }
  calculateSum(): number {
    this.sumAmount=0

    // Loop through the controls in the AmountDetials FormArray and calculate the sum
    for (const control of this.AmountDetials.controls) {
      const value = +control?.get('Amount')?.value // Convert the value to a number using the unary + operator
      this.sumAmount += value;
    }

    return this.sumAmount;
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
      console.log();
      this.compareAmount()
     
    }
  }

}
