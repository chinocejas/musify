import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import { ArtistService } from '../../services/artist.services';
import { UploadService } from '../../services/upload.service'
import {GLOBAL} from '../../services/global';
import { User } from '../../models/user';
import { Artist } from '../../models/artist';
@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css'],
  providers: [UserService, ArtistService,UploadService]
})
export class ArtistEditComponent implements OnInit {
  public titulo:string;
  public identity;
  public token;
  public url:string;
  public artists: Artist[];
  public artist: Artist;
  public errorMessage;
  public isEdit=true;
  public artistId;
  public fileToUpload: Array<File>;
  constructor(
    private _userServices: UserService,
    private _artistServices: ArtistService,
    private _uploadServices:UploadService,
    private _router:Router,
    private _route: ActivatedRoute
  ) {
    this.titulo = 'Editar Artista';
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.url = GLOBAL.url;
    
   }

  ngOnInit() {
    //llamar al metodo del api para sacar un artista en base a su id
    this.getArtist();
  }

  getArtist(){
  this._route.params.forEach((params:Params)=>{
    let id = params['id'];
    this.artistId = id;
    this._artistServices.getArtist(this.token, id).subscribe(
      response =>{
        if(!response.artist){
          this._router.navigate(['/']);
        }
        else{
          this.artist = response.artist;
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
  });    
  }

  onSubmit(){
    console.log(this.fileToUpload);
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];
          this._artistServices.editArtist(this.token,id,this.artist).subscribe(
            response=>{
              
              if(!response.artist){
                this.errorMessage= 'Error en el servidor';
              } else{
                           
                //subir imagen de artista
                this._uploadServices.makeFileRequest(this.url+'upload-image-artist/'+ id,[],this.fileToUpload,this.token,'image').then(
                    (result) => {
                      this._router.navigate(['/']);
                    },
                    (error)=>{
                      console.log(error);
                    }
                );
                this.errorMessage= 'El artista se ha modificado  correctamente';
               this._router.navigate(['./artists']);
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
        });
  }

  
  fileChangeEvent(fileInput){
    this.fileToUpload=<Array<File>>fileInput.target.files;
    console.log(this.fileToUpload);
  }


}
