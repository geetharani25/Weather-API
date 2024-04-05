// weather.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apikey = '052e816352c558cfbd6a8853de4bfdd7';
  constructor(private http: HttpClient) { }

  getWeather(city: any) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apikey}`);
  }

  saveWeatherData(data: any) {
    return this.http.post('http://localhost:3000/api/weather', data);
  }

  getAllWeatherData() {
    return this.http.get<any[]>('http://localhost:3000/api/allweather');
  }
}
