import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';
  constructor() { }

  ngOnInit(): void {
    
  }

 
  keytab(event){
    const val = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
    let nextInput = event.srcElement.nextElementSibling; // get the sibling element

    var target = event.target || event.srcElement;
    var id = target.id // prints undefined

    if(nextInput == null)  // check the maxLength from here
        return;
    else
        nextInput.focus(); 
  }
}
