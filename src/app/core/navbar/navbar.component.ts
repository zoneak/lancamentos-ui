import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  usuarioLogado = '';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

}
