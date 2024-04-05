import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup = new FormGroup({});
  WeatherData: any;
  backgroundImageUrl: string = '';
  showWeatherContainer: boolean = false;
  allWeatherData: any[] = []; 
  showAllWeatherContainer: boolean = false;
  showFilterPopup: boolean = false;
  GreterThan: boolean = false;
  LessThan: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherForm = this.formBuilder.group({
      cityName: ['', Validators.required]
    });
  }

  toggleWeatherContainer(): void {
    this.showAllWeatherContainer = false;
    this.showWeatherContainer = true;
  }

  getWeather(): void {
    const cityName = this.weatherForm.get('cityName')!.value;
    this.weatherService.getWeather(cityName)
      .subscribe(data => {
        this.WeatherData = data;
        this.setBackgroundImageUrl();
        console.log(data);
      }, error => {
        this.WeatherData = { error: true };
      });
  }
  
  setBackgroundImageUrl(): void {
    const temperature = this.WeatherData.main.temp - 273.15; 
    if (temperature > 26) {
      this.backgroundImageUrl = "https://img.wattpad.com/0e6aad3ebb7022555bce425a0fb3cbfee375632b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f527977516e676c436957453673413d3d2d313039383939363238342e313639313137613535666464646562373139353839333238373337342e676966";
    } else if (temperature >= 20 && temperature <= 26) {
      this.backgroundImageUrl = "https://media.tenor.com/o-HYudI-awkAAAAM/fall.gif";
    } else {
      this.backgroundImageUrl = "https://i.pinimg.com/564x/5c/65/54/5c65549a2ff33e35fd75a5c9cc4c359e.jpg";
    }

    this.showWeatherContainer = true; 
  }

  saveWeather(): void {
    const { name, main, weather } = this.WeatherData;
    const data = {
      cityName: name,
      temperature: main.temp - 273.15,
      humidity: main.humidity,
      weather: weather[0].description
    };
    this.weatherService.saveWeatherData(data).subscribe(() => {
      console.log('Weather data saved successfully');
    }, error => {
      console.error('Error saving weather data:', error);
    });
  }

  getAllWeatherData(): void {
    this.weatherService.getAllWeatherData()
      .subscribe(data => {
        this.allWeatherData = data;
        this.showAllWeatherContainer = true;
        this.showWeatherContainer = false;
      }, error => {
        console.error('Error fetching all weather data:', error);
      });
  } 
  
  onFilter(){
    this.showFilterPopup = !this.showFilterPopup;
  }

  onSelectTempGt(){
    this.GreterThan = !this.GreterThan;
  }
  onSelectTempLt(){
    this.LessThan = !this.LessThan;
  }
  apply(): void {
    if (this.GreterThan && this.LessThan) {
      this.getAllWeatherData();
    } else {
      if (this.GreterThan && !this.LessThan) {
        this.allWeatherData = this.allWeatherData.filter(data => data.temperature > 25);
      } else if (this.LessThan && !this.GreterThan) {
        this.allWeatherData = this.allWeatherData.filter(data => data.temperature < 25);
      } else {
        this.getAllWeatherData();
      }
    }
  }
  
  
  
}
