import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username: string;
    password: string;

    constructor(private authService: AuthService) {
    }
    login() {
        this.authService.authenticate(this.username, this.password)
            .subscribe((res) => {
                console.log(res);
                // this.location.back();
            }, (error) => {
                console.log(error);
            });
    }
    ngOnInit() {
    }

}
