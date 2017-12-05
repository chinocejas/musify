import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import {UserService} from './services/user.service';
import {FakeService} from './services/json-placeholder';
import {GLOBAL} from './services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    UserService, 
    FakeService
    ]
  
})
export class AppComponent implements OnInit {
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public registrarUsuario = false;
  public url;
  
  
  constructor(
    private _userServices:UserService,
    private _fakeService:FakeService,
    private _router:Router,
    private _route: ActivatedRoute

      ){
      this.user = new User('','','','','','ROLE_USER','',);
      this.user_register = new User('','','','','','ROLE_USER','',);
      this.url = GLOBAL.url;
      }
      ngOnInit(){
      this.identity = this._userServices.getIdentity();
      this.token = this._userServices.getToken();
      console.log(this.identity);
      console.log(this.token);

      
      
      
    
      
      
      
     

      }

   public onSubmit(){
     console.log(this.user);
     //conseguir datos usuario identificado
     this._userServices.signUp(this.user).subscribe( 
      response => {
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){ 
          alert("El usuario no se logueo correctamente")
        }else{
          //Crear elemento en Local Storage para tener al user en sesion
          localStorage.setItem('identity', JSON.stringify(identity));
          //conseguir token para enviar a cada peticion http

          this._userServices.signUp(this.user, 'true').subscribe( 
            response => {
              let token = response.token;
              this.token = token;
              if(this.token.length <= 0 ){
                alert("El token no se ha generado correctamente ")
              }else{
                //Crear elemento en Local Storage para tener token disponible
                localStorage.setItem('token', token);
                this.user = new User('','','','','','ROLE_USER','',);
      
              }
            },
            error =>{
              var errorMessage =<any>error;
              if(errorMessage != null){
                var body= JSON.parse(error._body);
                this.errorMessage = body.message;
                this.user = new User('','','','','','ROLE_USER','',);
                console.log(errorMessage);
              }
            }
           );

        }
      },
      error =>{
        var errorMessage =<any>error;
        if(errorMessage != null){
          var body= JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(errorMessage);
        }
      }
     );
   }
   public logOut(){
     localStorage.removeItem('identity');
     localStorage.removeItem('token');
     localStorage.clear();
     this.identity=null;
     this.token=null;
     //redirigiendo a home
     this._router.navigate(['/']);
   }

   onSubmitRegister(){
    console.log(this.user_register);
    this._userServices.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;
        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El usuario se ha registrado Correctamente. Identificate como :  ' + this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','',);
        }
      },
      error =>{
        var errorMessage =<any>error;
        if(errorMessage != null){
          var body= JSON.parse(error._body);
          this.alertRegister = body.message;
          this.user_register = new User('','','','','','ROLE_USER','',);
          console.log(errorMessage);
        }
      }
    );
}
    formularioRegister(){
      console.log(this.registrarUsuario);
      this.registrarUsuario = !this.registrarUsuario;
    }

   

}
