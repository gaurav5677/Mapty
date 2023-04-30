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

let map, mapEvent;

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


      // Displaying a Map using a Third-party library  called (Leaflet)

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);




      // this will give the exact coord of location on which the user will click   
      // handling clicks on map 
      map.on('click', function (mapE) {
         mapEvent = mapE;
         form.classList.remove('hidden');
         inputDistance.focus();







      })


   }
      , function () {
         alert('Could not get your position')
      })



form.addEventListener('submit', function (e) {
   e.preventDefault();


   // Clear input Fileds
   inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';


   console.log(mapEvent);


   const { lat, lng } = mapEvent.latlng;


   L.marker([lat, lng])
      .addTo(map)
      .bindPopup(L.popup({
         maxWidth: 250,
         minWidth: 50,
         autoClose: false,
         closeOnClick: false,
         className: 'running-popup',
      }))
      .setPopupContent('Workout')
      .openPopup();
})




inputType.addEventListener('change', function () {
   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
   inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
})