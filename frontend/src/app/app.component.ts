import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'users-frontend';
  name = '';
  email = '';
  phoneNo = '';
  ticketNo = '';
  users = [];
  phoneNoSearch = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    // this.fetchAllUser();
  }

  onSubmit() {
    console.log('On Submit')
    this.http.post<any>('http://localhost:3000/users', {
      name: this.name,
      email: this.email,
      phoneNo: this.phoneNo,
      ticketNo: this.ticketNo
    }).subscribe(data => {
      console.log(data)
      // this.fetchAllUser();
    })
  }

  fetchAllUser() {
    this.http.get<any>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
    })
  }

  searchUserByPhone() {
    this.http.get<any>('http://localhost:3000/users-by-phone/' + this.phoneNoSearch).subscribe(data => {
      this.users = [data];
    })
  }

  clearUserSearch() {
    // this.fetchAllUser();
    this.phoneNoSearch = '';
  }
}
