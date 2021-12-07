import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { SpinnerService } from 'src/app/spinner.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private spinner:SpinnerService

  ) {

    let formControls = {
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('', [
        Validators.required
      ]),
      role: new FormControl('', [
        Validators.required
      ]),
      avatar: "data:image/png;base64,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"
      
    }

    this.registerForm = this.fb.group(formControls);
    

  }
  @ViewChild('fileInput')
  el!: ElementRef;
  imageUrl: any = '../../../../assets/img/user.png';
  editFile: boolean = true;
  removeUpload: boolean = false;

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get repassword() { return this.registerForm.get('repassword'); }
  get role() { return this.registerForm.get('role');  }
  get image() {return this.registerForm.get('file');}


  ngOnInit(): void {
  }
  uploadFile(event : any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let avatar = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(avatar);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registerForm.patchValue({
          avatar: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
   // let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEUzMzP///9EREQwMDAqKiotLS0iIiInJycaGhobGxsYGBglJSUeHh4WFhYTExOtra3T09O0tLTz8/Po6Og8PDx6enqJiYmnp6f5+fnLy8tVVVVeXl6SkpJQUFDk5OTNzc1sbGzb29udnZ2AgIC+vr5wcHBAQEBiYmIKCgqYmJiFhYVISEjm6EYEAAAKYklEQVR4nOWd62KqOhCFaRNuCqggeFfw3vr+73dEt5sA4WJmEjec9b9tvgKZZCazon0pkT+e7KPwcjtPten5toyj/WQRqPnTmvw/Md7HU8s2TKoToqUiRKem4bhkuV7Mpf95yYT+JHbtof4kK4ropuOtZlu5Q5BKeFzZhs6Fy6QP3c3IlzgIeYT+eug04f15loZ7SqSNQxZhEFpmK7yn6GA1ljQSOYRB6NI3+B5vq3dJpIxFBuF87b3L92Q8yfgeJRAuNEOALxU1RvjDwSc8efzY0ErODX0dgE041t6ZYMrSLezHiEw4uwIe4FODEHdIuIShBeW7a3hDnXAwCedL0SkmL50miKNCJAymIjGCJ2It8IaFRxjo7dZoreQd0caFRrg1wXNMDnGGNTAsQh8XUNOuE6SRIRHOz4ivKC4iEuEGa5Jh5CUoQ8MhDIf4gPdtI8oKDoVwb0sAvMfFG8bgMAh3nhTA++oGYwGHQOgPkafRTC7CbINAeJEwy7xkwz9FOOFIzkf4lL75PKGPsZ2olg3eLoIJY4nvaCoHupWCEi5cuYAahc6nUMKztHn0pWvyUcKJzGnmKX31UcKp9Ed4D4qwbDiMcOLIB9T0ywcJ5X+FqVxQ/Q1EuJMbC1+ih48RniTHwpcMSKUYQugP1ABqBmQBDiEc4aRHm6UvP0S4RM/NVMkCbDEAhIH8aP8SpOoGIJyoeknvr2n8EcJQ0UyayvkIYcUpGSmyxFdu4oRb2fsmVkPxJL844VHdZ3hf1pw+QLiGlbPfE5l+gHClLBqmMoSTGeKEmsKJ5j7VJMoJfZWf4f0ZCpdMhQmVTqWQyVSYcKFie5/JjJQTKg0WkKSiMKHCVWkq8ZWpMOFeRlG0hlB4iyhM+KMy4N9DvnC1tDOEwouazhAKD1T8O+z9M1Q805Bv5YTKEm1PfWAu7X88VLxq+8CaJlFTs3jJXCsnDNQSimdMhQnnSrf4miN8alh8j39TuscfCNcQxQlVldaeosIFNnHCmcqQT8TPRokT7tQVZiBbfADhXNaZS57EE1GQusVG4WzqiRcQAYQK90/kLD5MAOFYXcwXX9HAqtxEWUQEFNdAhL+qIiKhgFFCCMeqTpsAYgXwxJCKc3upQL0lIEJFmQzYYW8Qoa8m6DugngTY2UQlxzGIDhojjDBR8RANWCsi8Iywgi0UEd84YRAGV+mEwEcIPqt/kL04JQQ4QighendsURa05xncMyO17Ql8jB2DUPI20QU3r8EJtzJXpza8aR2h/3Akb59IAedKEQm/LrLmU2gofAil01nWHsPDcMdCIdzKmU9dFDMenH78hYyljfGLMjYkT4UR/ik3ExwJn8Jy/vjBjhkU0kXCCs29JcL9FqnwyYSi8Bx4IswXld7QbD8RXZR+8BBNeBv+X2E6YY3gVmZPGUiTzEOobma7RrfSVhqAOiqLwvVrC6bwBRzBs4h6CNtVMIZGDVNLcEeE7gw58iBvKnFDbO9kEUI/OY7Wh1Mcj3ij2S5t4QnHpOVDJf7+FJ8O69kxEWsqeZdwOwk1w3IMk1JdN0zu2ng0FPsadc4D9H+tIdUpNYeO5Wjh5P1DJ28RLn6nnkGZJ0ScKS9RNI+u7+dRdXeZlH7TkbL/LEINb3p48+xQe8IkMhxaev+IteT9W4PDW0bJd77BhjPy0C3/QepY4TuQbQnHF69iyLr7w/uBILq29o8iprfalX9FUhV7qHVuX6xpR5gs62ZI4zvh/dB89u22yaZSm0S8XxDVLJGIo7XNo7Yi/HXrI4Du7vk/OI50a1j3s8S0jRN3rMm0vjhJrFW7RGMLwh1pLoRWPMZ0pPuVMTDMctMwoUPb3az5qZh52Oy3rLfLcjQT7lt5O1d8jX8oJ9FSv8cYx/gj2zLo7TDbVUW4/BRaKbfNweFGwlPbbGj1Y3zK3+6Ox8norslxHNRF72BltZyjjGXzCqiJcNW+VE/cCGXFtbfbr/vouXGh00C4eiuqDQncBfB4fqsJQJ82IdYTxm8etiDOGVYMGy/bvqAZYsOLU0t4eL+nglg3ccbdqiEs8UQbMh51hHuhkgtxyExoFzA5D4Q2XsP68k0NoXAimxhOyFmE1Wq7vv9nBP+eXROo6ggDA5BXopa2b1/bnE+WHqRaXuv+XU0IrO2SoX05toke/jE0gBksUmcfWUm4h/c16YZ7mSV1dMFifbvvOMF/idakH6sIkQwF9KFlbqLJuPTG+snxJ9YcB+koR43NaRUh4vkDYhq250yXcRitU0VhvCGexVuNi8uufE8rCGfovXdET7MtD/29ngxR1d17fEJfZbcIjipP2fIJ1fY0oaiyjZZLOFbrW4KjQcUig0uozkwPUVVnpXmE0t2P5ajijB+PUGVDE6IqrDM4hAtVbRTYsrkPkUPY0UdY9RDLhGOVfYW4cnnTaZlQpeEjsrjGCyXCDi5nMvFco0uEM7V+F7ji9SmWCNVYdMuS0UyYdDVUPGWXK4tFQsXmSNjimJsXCTedfkl53aYFwqC7wfApuxQSC4SKvZHwVW6oLRBeurpie6nsCZYnnHf9EXJsXvKEis2fZKh0y0CeMOp2rEhVco3OE353O1akKvUr5ggV9WbLlZvUEB67/xmWXcFyhEpNyGWpuHDLEXYyi1hUMSLmCNXZschUoZjIEiq20ZOlgpkNS9iDeJ+qEPNZQsWGnbJUSGWwhL2YSksZN5aww3lEVoXEMEvY8f39X1mVhP34DItZU4awF6vSVHmvU4ZQsW+uPOXvwmAIexIOi7kahrDzWaiX8nezMoQ9CYfFtTdDeOrDzuIh0+cT9iUcFkxtGEK1FzjJlD3mEiq+wEmmcp68GWHQzVM0POX2TxnhuMvl7bxyIT8j7EWi7SlzzyXsyf43VW4PnBEq9ViXK/rLJex4fZtV7sBwRtiDqsxLuV1+RnjoRw7joQGXsCdZmofYMmlG2MGz3ZViQ35GGPdma5GfTDPCzh9SYMRONRmh2ttvJYupzmSEvSitvcQcHOopIVMI7ikhk27rKSGzbuspIZNQ/D8R9ipaMCbZ/VzTsGe/+rnyZg/V9HJ/mMtj9DKLkcu2Mbm2/mSicjnhjLA3BdJUg4RD2OmGp6IM3t6iD8dnX2JvgGYIexQu2BOYDGGPkt5s8Ykh7Hy/TKZrwCXsz4eYu5eVJVR8Ibw8Dfm1p/tr2u3ew0x2RR2/NwnF/N0tOcJdPwrd+atN8j0znTUbYFXwcSl0dvXhIbqLGsKvS/fXNcUblIpdst2fTgdBLeHXrOs7jJKvWclxYNXt97R8/07ZF6PTrUEcN9Oyt0nSyhn53xThXLXH8xjq7B6DuBzvbK4TVkefIvHaOfB8pYf4uri20fk3sPM99zDui1Etc8q3hK1whpzHXcstWnGFHWylQ+sEwThVnWjJaKCZ8MsPQXfiqJTunaptduvcrpOL14XnSL1V3V2X9Z7syQFqYixbuuGESS1D080B/uhyxTL7xRahznU1gvnqPzRfRDfHMkyqYxr/AkSITk3Dtr5/jy3M31vepOMnx310iJff/4I2lzD6OY5bWtv/BzAmqQIxDJOaAAAAAElFTkSuQmCC';
    this.editFile = true;
    this.removeUpload = false;
    this.registerForm.patchValue({
      avatar: "data:image/png;base64,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"
    });
  }


  register(){
    this.spinner.requestStarted();
    let data = this.registerForm.value ;
    let user = new User(undefined, data.firstname, data.lastname, data.email, data.password, data.role, data.avatar ) ;
    console.log(user);
    this.userService.addUser(user).subscribe(
      res=>{
        this.spinner.requestEnded();
        this.toastr.warning("Registration done Successfully");
        this.router.navigate(['/verify-email']) 
      },
      err=>{
        this.spinner.resetSpinner();
        console.log(err);
      }
    )
  }
    

}
