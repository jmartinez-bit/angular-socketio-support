import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;
  server: string = "http://localhost:3000";

  constructor() { 
    this.socket = io( this.server );
  }

  listen( eventName: string ): Observable<any> {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data: any) => {
        Subscriber.next(data); // Pasando datos al cliente
      });
    });
  }

  // El usuario mandando el mensaje
  emit( eventName: string, data: any ): void {
    this.socket.emit( eventName, data );
  }
  
}
