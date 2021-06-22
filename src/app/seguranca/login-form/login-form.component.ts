import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from './../auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private title: Title,
    private router: Router,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Login');
  }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro => {
        console.log(erro);
        this.errorHandler.handle(erro);
      });
  }

}
