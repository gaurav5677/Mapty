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



class App {
   #map;
   #mapEvent;  // now both of this become private instance properties 


   //////////////////////Constructor//////////////////////
   constructor() {
      this._getPosition();
      // using The Geolocation API 
      form.addEventListener('submit', this._newWorkout.bind(this));
      inputType.addEventListener('change', this._toggelElevationField);



   }

   //////////////////////getPosition//////////////////////
   _getPosition() {
      if (navigator.geolocation)
         navigator.geolocation.getCurrentPosition(
            this._loadMap.bind(this),
            function () {
               alert('Could not get your position');
            });
   }

   _loadMap(position) {
      // console.log(position);
      // destructuring , so this will create  a varriable call latitude based 
      // out of the latitude property of this object. 
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
      // this l here , is the main function that Leaflet gives us as  an entry point 

      const coords = [latitude, longitude];
      console.log(this);
      // Displaying a Map using a Third-party library  called (Leaflet)

      this.#map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.#map);

      // this will give the exact coord of location on which the user will click   
      // handling clicks on map 
      this.#map.on('click', this._showForm.bind(this));


   }

   _showForm(mapE) {
      this.#mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();

   }

   _toggelElevationField() {
      inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

   }

   _newWorkout(e) {
      e.preventDefault();
      // Clear input Fileds
      inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
      // console.log(mapEvent);
      const { lat, lng } = this.#mapEvent.latlng;
      L.marker([lat, lng])
         .addTo(this.#map)
         .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 50,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
         })
         )
         .setPopupContent('Workout')
         .openPopup();
   }
}

const app = new App();
// app._getPosition();
