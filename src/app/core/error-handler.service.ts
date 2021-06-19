import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;
    if (errorResponse.name === 'HttpErrorResponse' && String(errorResponse.status).startsWith('4')) {
      this.messageService.add({severity: 'error', summary: errorResponse.error[0].msgUsuario});
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
      this.messageService.add({severity:'error', summary: msg});
    }
  }
}
