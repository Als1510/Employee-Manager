import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  searchText = new BehaviorSubject('');

  isLoggedIn = new BehaviorSubject(
    this.getItem('isLoggedIn') || false
  )

  constructor() { }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }

  updateValue(val: string) {
    this.searchText.next(val);
  }

  getValue(){
    return this.searchText;
  }
}
