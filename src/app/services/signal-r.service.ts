import { Injectable } from '@angular/core';

import * as signalR from '@aspnet/signalr';

import  { ChartModel } from  '../_interfaces/chartmodel.model';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public data!:ChartModel[];

  private hubconnection!: signalR.HubConnection;

  public startConnection =()=>{
    this.hubconnection= new signalR.HubConnectionBuilder()
    .withUrl('https//localhost:5001/chart')
    .build();

    this.hubconnection
    .start()
    .then(()=>console.log('connection started....'))
    .catch( err=> console.log('Error while starting this connection...'))
  }

public addTransferdatalistner= ()=>{
  this.hubconnection.on('TRANSFERCHARTDATA',(data)=>{
    this.data=data;
    console.log(data);
  });
}

  constructor() { }
}
