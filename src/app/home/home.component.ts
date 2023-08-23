import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiService:ApiService,private router:Router) { }
  users: any[]=[];
  ngOnInit(): void {
    this.getProfiles();
  }
  getProfiles(){
    this.apiService.getProfiles().subscribe((res:any)=>{
      this.users = res.users;
    });
  }
  redirectToDash(i:any){
    this.router.navigate(['/dashboard']);
    localStorage.setItem("user",i);
  }
}
