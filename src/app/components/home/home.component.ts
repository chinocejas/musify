import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import { User } from '../../models/user';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  public titulo:string;
  public identity;
  public token;
  public url:string;
  constructor(
    private _userServices: UserService,
    private _router:Router,
    private _route: ActivatedRoute
  ) {
    this.titulo = 'Home';
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
    this.url = GLOBAL.url;
   }

  ngOnInit() {
    
  }

}
