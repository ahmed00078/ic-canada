import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../services/website.service';
import { FrameService } from '../services/frame.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  apps:any = []
constructor(private  websiteservice:WebsiteService,private frameservice: FrameService ,private router:Router){ }

ngOnInit(): void {
  this.TS_GetApps()
}


TS_GetApps(){
  this.apps=[]
  this.websiteservice.getAll().subscribe({
    next:(res:any)=>{
      this.apps=res
    }
  })
}


TS_CreateNewApp(){
  const request={
    title:'new website ',
  }
  this.websiteservice.create(request).subscribe({
    next: (res:any)=>{
      this.frameservice.create({
        key: this.TS_GenerateCode(4),
        content:"" ,
        route:"",
        title:"home",
        event: "",
        webSiteId:res.id,
      }).subscribe({
        next:(r:any)=>{
          console.log(r)
          this.router.navigate(["/making-app/"+res.id])
        }
      })
    

    }
  })
}

TS_GenerateCode(length: any) {
  const numbers = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPMLKJHGFDQSWXCVBN0123456789'
  var result = ''
  for (var i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * numbers.length)
    result += numbers.charAt(index)
  }
  return result
}

TS_DeleteWebsite(id:any){
  this.websiteservice.delete(id).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.TS_GetApps()
    }
  })
}














}
