import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'user-edit',
    templateUrl:'../views/user-edit.html',
    providers:[UserService]
})
export class UserEditComponent implements OnInit{
    public titulo:string;
    public user:User;
    public identity;
    public token;
    public alertMessage = null;
    public filesToUpload: Array<File>;
    public url:string;
    constructor(
        private _userServices: UserService
    ){
        this.titulo = 'Actualizar mis datos';
        this.identity = this._userServices.getIdentity();
        this.token = this._userServices.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
        
    }
    ngOnInit(){
       // console.log('User-edit.component cargado');
        

    }

    onSubmit(){
        //console.log(this.user);
        this._userServices.updateUser(this.user).subscribe(
            response =>{
                
                if(!response.user){
                    this.alertMessage = 'User no se ha actualizado';
                    
                }else{
                    
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    //para actualizar el identity de toda la app
                    document.getElementById("identity_name").innerHTML = this.user.name;
                    this.alertMessage = 'User se ha actualizado correctamente';
                    if(!this.filesToUpload){
                        //redireccion
                    }else{
                        this.makeFileRequest(this.url+'upload-image-user/'+this.user._id,[],this.filesToUpload).then(
                            (result:any) =>{
                                this.user.image = result.image;
                                localStorage.setItem('identity', JSON.stringify(this.user));
                               
                                let image_path = this.url+'get-image-user/'+this.user.image;
                                document.getElementById("image-logged").setAttribute('src',image_path);
                            }
                        );
                    }

                }
            },
            error => {
            var errorMessage =<any>error;
             if(errorMessage != null){
                var body= JSON.parse(error._body);
                this.alertMessage = body.message;
                console.log(errorMessage);
                }
            }
        );
    }

    fileChangeEvent(fileInput:any){
        //recoge los archivos seleccionados en el input
        this.filesToUpload = <Array<File>>fileInput.target.files;

        console.log(this.filesToUpload);
    }

    makeFileRequest(url:string, params:Array<string>,files:Array<File>){
        var token = this.token;

        return new Promise(function (resolve, reject){
            var formData:any = new FormData();
            //xhr va a ser las peticiones AJAX de JS tipicas
            var xhr = new XMLHttpRequest();
            //en files pueden venir varios archivos, asi que los recorre a todos y los guarda en formData
            for(var i=0; i< files.length;i++){
                formData.append('image', files[i],files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 ){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                    
                }
            }
            xhr.open('POST', url,true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}