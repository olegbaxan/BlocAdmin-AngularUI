import {Component, ElementRef, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'blocadmin-app';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
token?:Subscription;
  constructor(private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              // private el: ElementRef
  ) { }

  ngOnInit(): void {
    // debugger;
    console.log("Router",this.router);
    console.log("Route",this.route);

    this.token=this.route.queryParams
      .subscribe(params => {
        return params.token;
      });
    this.configureParameters();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const person = this.tokenStorageService.getPerson();
      this.roles = person.roles;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_BLOCADMIN');

      this.username = person.username;
    }else if(window.location.pathname.includes('/password/forgot/reset')){
      console.log("Router",this.router);
      console.log("Routerpath",window.location);

      // const url = this.el;
      // console.log("URL",url)
      // this.router.navigate(['/password/forgot/reset', { externalUrl: url }], {
      //   skipLocationChange: true,
      // });
      // this.router.navigate(['password/forgot/reset']);
    }
    else{
      this.tokenStorageService.signOut();
      this.isLoggedIn = false;
      this.showAdminBoard = false;
      this.showModeratorBoard = false;
      // this.router.navigate(['/login']);
    }
  }
  configureParameters() :void {
  localStorage.setItem("page","1");

  }
  logout(): void {
    this.tokenStorageService.signOut();
    localStorage.setItem("role","");
    localStorage.setItem("person","");
    // window.location.reload();
    // this.router.navigate(['/login']);
  }
}
