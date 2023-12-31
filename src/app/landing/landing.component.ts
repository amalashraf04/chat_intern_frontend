import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent {

  statusArray: string[] = [];
  inviteform:any;
  userdash:any;
  friend:any[] = [];
  friendsdata:any;
  friendname:any;
  activestatus:any;
  dp:any;
  url:any;
  socket = io('http://localhost:3001');
  
//pic
profilePictureUrl: string | undefined;

  constructor(private chatService: BackendService,private fb:FormBuilder,private route:ActivatedRoute,
    private router :Router,private messageservice:ChatService){
   
    this.inviteform = this.fb.group({
      name:[''],
      email :['']
     })


  }

  ngOnInit(){
    this.fetchUserProfilePicture();
    // this.friendprofilepicture();
    this.socket.emit('loggedinusers',localStorage.getItem('userid'));
    // this.onlinestatus()
      this.uniquelogin();

  }

  fetchUserProfilePicture() {
    const userId = localStorage.getItem('userid');
    if (userId) {
      this.chatService.getUserProfilePicture(userId).subscribe(
        (response: any) => {
          // Assuming the response contains the URL of the profile picture
          this.profilePictureUrl = 'http://localhost:3000' + response.profilePictureUrl;
        },
        (error) => {
          console.error('Error fetching profile picture:', error);
        }
      );
    }
  }

  // friendprofilepicture(){
  //   const userId = localStorage.getItem('userid');
  //   const friendid = this.userdash.friends.find((friend: any) => friend._id === userId);
  //   if (friendid) {
  //     const bobProfilePictureUrl = 'http://localhost:3000/uploads/' + friendid.pic;
  //     console.log('friends Profile Picture URL:', bobProfilePictureUrl);
  //   } else {
  //     console.log('Bob not found in friends list.');
  //   }
  // }

  invite() {
    let friend = this.inviteform.value;
    let userid = this.route.snapshot.params['id'];
    console.log(friend)
    this.chatService.addfriend(friend,userid).subscribe((res: any) => {
      if (res.status === 200) {
        this.friend = [res.data];
        console.log("friend reached front from back");
        console.log(this.friend);
        alert("friend added");
      } else if (res.status ===300){
        alert("you are already friends");

      }
      else if (res.status === 500) {
        alert("not a registered user");
      } else {
        alert("friend cannot be added");
      }
    });
  }
  
  uniquelogin(){
    let userid = this.route.snapshot.params['id'];
    console.log(userid)
    this.chatService.uniquelanding(userid).subscribe((res:any)=>{
        this. userdash = res.data;
        this.chatService.setfriends(this.userdash.friends);
        console.log(this.userdash)
        this.onlinestatus();
        this.dp = res.data.pic;
        console.log(this.dp)
        // this.url ='./assets/'

    })


  }
     onlinestatus(){
      // this.statusArray = [];


     const friendslist=   this.chatService.getfriends()
     for(let i=0;i<friendslist.length;i++){
      let chatfriend = friendslist[i]
      console.log('for loop friend friend')
      this.chatService.onlinestatus(chatfriend).subscribe((res:any)=>{
        this.activestatus =  res.data
         console.log(this.activestatus)
         this.statusArray.push(this.activestatus);
         console.log(this.statusArray)
       })
      }
   }

  
  
    chathead(fid:any){
    console.log(fid)
    let userid = this.route.snapshot.params['id'];
        console.log(userid)
    this.router.navigate(['land', userid, 'chatroom'], { queryParams: { fid: fid } });


  }
  
 
  logout(){
    let userid= localStorage.getItem('userid')
    this.chatService.userlogout(userid).subscribe((res:any)=>{
      console.log('loggedout')
     let status = res.data;

    })
    localStorage.removeItem('token')
    this.router.navigate(['']);

  }

}
