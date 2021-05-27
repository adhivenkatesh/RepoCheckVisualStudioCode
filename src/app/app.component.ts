import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Realtime chart client';

  public chartOptions:any={
    scaleShowVerticalLines:true,
    responsive:true,
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero:true
        }
      }]
    }

  }

  public chartLabels:string[]=['Realtime chartg'];
  public chartType:string='bar'
  public chartLegend:boolean=true;
  public colors:any[]=[
    {backgroundColor:"#5491DA"},
    {backgroundColor:"#e74C3C"},
    {backgroundColor:"#82E0AA"},
    {backgroundColor:"#E5E7E9"}
  ]



  constructor(public signalrService: SignalRService, private http:HttpClient){
    
  }

  ngOnInit(){
    this.signalrService.startConnection();
    this.signalrService.addTransferdatalistner();
    this.startHttpRequest();
  }

  private startHttpRequest=()=>{
    this.http.get('https://localhost:5001/api/chart')
    .subscribe(res=>{
      console.log(res);
    })
  }
}
