import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
    `
    @keyframes colores {
      from{color: green;}
      to{color: green;}
    }
    .botones{
      border: none;
      background: none;
      line-height: 30px;
    }
    .botones .fa-check {
      color: green;
    }
    .botones .fa-times {
      color: red;
    }
    .card-body{
      overflow: auto;
    }
    .verde {
      color: #000;
      animation: colores 2s ease 
    }
    `
  ]
})
export class ChatComponent implements OnInit {

  @ViewChild('final') final!: ElementRef<HTMLSpanElement>;

  userChat = {
    user: "",
    text: ""
  }

  myMessages: any;
  eventName: string = "send-message";

  constructor( private activated: ActivatedRoute, private webService: WebSocketService ) { }

  ngOnInit(): void {
    
    const id = this.activated.snapshot.params.id;
    this.userChat.user = id;

    this.webService.listen( "text-event" ).subscribe((data) => {
      this.myMessages = data;
      $("#final").animate({ scrollTop: $('#final')[0].scrollHeight}, 1000);
      $(".item").css({color: 'green'});
    });
  }

  myMessage( ok?: boolean ) {

    if(ok) {
      this.userChat.text = 'Si';
    } else if(ok == false) {
      this.userChat.text = 'No';
    }

    this.webService.emit( this.eventName, this.userChat );
    this.userChat.text = "";
  }



}
