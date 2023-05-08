import { Component } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isCollapsed = false;
  isLoggedIn = false;
  searchText: string =  '';
  constructor(
    private _utilityService: UtilityService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._utilityService.isLoggedIn.subscribe((val) => {
      this.isLoggedIn = val
    })
  }

  mobileMenu() {
    setTimeout(()=>{
      this.isCollapsed = !this.isCollapsed
    }, 100)
  }

  onResize(event) {
    if(event.target.innerWidth > 560) {
      this.isCollapsed = false;
    }
  }

  logout() {
    this._utilityService.removeItem('isLoggedIn')
    this._utilityService.isLoggedIn.next(false);
    this._router.navigate(['/home'])
  }

  search() {
    if(/[^\w\s]/.test(this.searchText)) {
      this._router.navigate(['/error'])
    } else {
      this._utilityService.updateValue(this.searchText)
    }
  }
}
