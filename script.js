'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// using The Geolocation API 
if (navigator.geolocation)
   navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position);

      // destructuring , so this will create  a varriable call latitude based 
      // out of the latitude property of this object. 
      const { latitude } = position.coords;
      const { longitude } = position.coords;


      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
      // this l here , is the main function that Leaflet gives us as  an entry point 

      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker(coords).addTo(map)
         .bindPopup('A pretty CSS popup.<br> Easily customizable.')
         .openPopup();



   }
      , function () {
         alert('Could not get your position')
      })


// Displaying a Map using a Third-party library  called (Leaflet)
