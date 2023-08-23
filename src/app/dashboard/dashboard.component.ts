import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private apiService:ApiService,private router:Router) { }
  sideItems:any[] = [
    {
      "name":"Profile"
    },
    {
      "name":"Posts"
    },
    {
      "name":"Gallery"
    },
    {
      "name":"Todo"
    },
  ];
  personalDetails:any[] =[
    {
      "name":"Username :"
    },
    {
      "name":"E-mail :"
    },
    {
      "name":"Phone :"
    },
    {
      "name":"Website :"
    },
  ];
  companyDetails:any[]=[
    {
      "name":"Name :"
    },
    {
      "name":"cathphrase :"
    },
    {
      "name":"bs :"
    },
  ];
  addressDetails:any[]=[
    {
      "name":"Street :"
    },
    {
      "name":"Suite :"
    },
    {
      "name":"City :"
    },
    {
      "name":"Zipcode :"
    },
  ];

  chatHistory:any[]=[
    {
      "message":"Hello",
      "type":"r",
      "time":"9:50am"
    },
    {
      "message":"hii",
      "type":"s",
      "time":"9:51am"
    },
    {
      "message":"how are you?",
      "type":"r",
      "time":"9:53am"
    },
    {
      "message":"i am good",
      "type":"s",
      "time":"9:55am"
    },
    {
      "message":"how's you",
      "type":"s",
      "time":"9:58am"
    },
    {
      "message":"i am fine .",
      "type":"r",
      "time":"10:00am"
    },
    {
      "message":"what's your thougths on the chat interface and the website?",
      "type":"r",
      "time":"10:20am"
    }
  ]
  usersList:any;
  userIndex:any;
  user:any;
  selected=0;
  profileClicked:boolean = false;
  chatStatus:boolean = false;
  indChatStatus:boolean = false;
  indChatExpanded:boolean = false;
  currentActivechat:any;
  currentMessage:string='';
    center:any;
    zoom = 10;
    // openchat:any[]=[];
   
  ngOnInit(): void {
    this.userIndex = localStorage.getItem('user');
    this.getProfiles();
    this.center = { lat: this.user.address.geo.lat, lng: this.user.address.geo.lng };

  }
 getProfiles(){
    this.apiService.getProfiles().subscribe((res:any)=>{
      this.usersList = res.users;
      this.user = this.usersList[this.userIndex];
      console.log(this.user);
    });

  }
  findPeopleWithoutCurrent(people: any[]): any[] {
    return people.filter(p => p.name !== this.user.name);
  }
  changeselection(index:any){
    this.selected = index;
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  changeUser(i:any){
    console.log(i);
    localStorage.clear();
    localStorage.setItem('user',i);
    this.router.navigate(['/dashboard']);
    location.reload();
  }
  chatUser(i:any){
    this.indChatStatus = true;
    console.log(i);
    this.currentActivechat = i;
    
  }
  closeChat(){
    this.currentActivechat = '';
    this.indChatStatus = false;
  }
  registerChat(message:string){
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    const mess = {
      "message":message,
      "type":"s",
      "time":time
    }
    this.chatHistory.push(mess);
    this.scrolltoBottom();
    this.currentMessage = '';
  }
  scrolltoBottom(){
    setTimeout(() => {
      const scroll_to_bottom = document.getElementById('chatWindow') as HTMLElement;
      scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
    }, 1000);
     
  }
}


