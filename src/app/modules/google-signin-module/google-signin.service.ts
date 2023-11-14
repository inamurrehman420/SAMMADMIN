/*
*Author : Manikandan Maheswaran
*email : m.manikandanmct@gmail.com
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare const gapi: any;
@Injectable()
export class GoogleAuthService {
  constructor(private http : HttpClient) {}
  /**
* Calling Google login API and fetching account details.
* @param callback Callback to function
*/


  public authenticateUser(clientId, callback) {
    let auth2 : any;
    let result : any;
    gapi.load('auth2', function () {
      auth2 = gapi
        .auth2
        .init({client_id: clientId, scope: 'profile email'});
      //Login button reference
      let element : any = document.getElementById('google-login-button');
      
      auth2.attachClickHandler(element, {}, function (googleUser) {
        //Getting profile object
        let profile = googleUser.getBasicProfile();
        //Setting data to localstorage.
        localStorage.setItem('token', googleUser.getAuthResponse().id_token);
        localStorage.setItem('image', profile.getImageUrl());
        localStorage.setItem('name', profile.getName());
        localStorage.setItem('email', profile.getEmail());
        // Alternatively you can create an object and return it like that - result = {
        // token: googleUser.getAuthResponse().id_token, name: profile.getName(), image:
        // profile.getImageUrl(), email: profile.getEmail(), };
        callback.emit(googleUser);
      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
      });
    });
  }


  // our solution
  // public authenticateUser(clientId, callback) {
  //   let auth2: any;
  //   let result: any;
  //   gapi.load('auth2', function () {
  //     auth2 = gapi
  //       .auth2
  //       .init({ client_id: clientId, scope: 'profile email' });
  //     // Open the authentication link in a new window
  //     let authWindow = window.open("http://localhost:7001/api/auth/google", "_blank", "width=500,height=600");
  
  //     // Check for response every 2 seconds
  //     let interval = setInterval(function () {
  //       if (authWindow.closed) {
  //         clearInterval(interval);
  //         debugger
  //         // Retrieve data from localStorage or the server once the window is closed
  //         let token = localStorage.getItem('token');
  //         let image = localStorage.getItem('image');
  //         let name = localStorage.getItem('name');
  //         let email = localStorage.getItem('email');
  //         // You can also use the result object if you choose to set it
  //         // const result = {
  //         //   token: token,
  //         //   name: name,
  //         //   image: image,
  //         //   email: email
  //         // };
  //         // Emit the callback with the retrieved data
  //         callback.emit({ token, name, image, email });
  //       }
  //     }, 2000);
  //   });
  // }
  



  /**
* Logout user from Google
* @param callback Callback to function
*/
  userLogout(callback) {
    //You will be redirected to this URL after logging out from Google.
    let homeUrl = "http://localhost:4200";
    let logoutUrl = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah" +
        "/logout?continue=" + homeUrl;
    document.location.href = logoutUrl;
    callback();
  }
}