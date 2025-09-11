export interface Forecast {
  name:         string;
  date:         string;
  temp_min:     number;
  temp_max:     number;
  humidity_avg: number;
  weather:      Weather;
  pop_max:      number;
  wind_max:     WindMax;
}

export interface Weather {
  main:        string;
  description: string;
  icon:        string;
}

export interface WindMax {
  speed: number;
  deg:   number;
  gust:  number;
}
