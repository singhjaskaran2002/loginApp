import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from './chat.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  public form: FormGroup;

  ngOnInit() {
  }

  @ViewChild('chatDiv') private myScrollContainer: ElementRef<any>

  senderClass: boolean;
  chatRecepient: string;
  messageArray: Array<{ sender: string, receiver: string, message: string }> = [];
  chatSender: string;
  message: string;
  user: string;

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      message: ['', Validators.required]
    });

    this.user = localStorage.getItem('chatRecepient');
    this.chatRecepient = localStorage.getItem('chatRecepient');
    this.chatSender = localStorage.getItem('loggedEmail');

    this.chatService.newMessage().subscribe(data => {
      this.messageArray.push(data);
      this.message = '';
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage() {
    if (this.form.valid) {
      var data = { sender: this.chatSender, receiver: this.chatRecepient, message: this.message };
      this.chatService.send(data);
      document.getElementById("messageBox").focus();
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }

  }

}
