"use strict";

const trainingInformation = [
   {
      "id": 1,
      "name": "Йога",
      "time": "10:00 - 11:00",
      "maxParticipants": 15,
      "currentParticipants": 8
   },
   {
      "id": 2,
      "name": "Пилатес",
      "time": "11:30 - 12:30",
      "maxParticipants": 10,
      "currentParticipants": 5
   },
   {
      "id": 3,
      "name": "Кроссфит",
      "time": "13:00 - 14:00",
      "maxParticipants": 20,
      "currentParticipants": 15
   },
   {
      "id": 4,
      "name": "Танцы",
      "time": "14:30 - 15:30",
      "maxParticipants": 12,
      "currentParticipants": 10
   },
   {
      "id": 5,
      "name": "Бокс",
      "time": "16:00 - 17:00",
      "maxParticipants": 8,
      "currentParticipants": 6
   }
]

const localStorageKey = "signUpTraining";
const section = document.querySelector('.section');

trainingInformation.forEach((element) => {
   let disabledCancelRecording = "disabled";
   let disabledSignUp = "";
   const array = JSON.parse(localStorage.getItem(localStorageKey));
   if (array != null) {
      array.forEach((elem) => {
         if (elem.id === element.id) {
            element.currentParticipants += 1;
            disabledCancelRecording = "";
            disabledSignUp = "disabled";
         }
      });
   };

   section.insertAdjacentHTML("afterbegin",
      itemRecords(element, disabledSignUp, disabledCancelRecording));
});

function itemRecords (item, signUp, cancelRecording) {
   return `
      <div class="itemTraining">
         <h3>Занятие: ${item.name}</h3>
         <p>Время проведения: ${item.time}</p>
         <p>Максимальное количество мест: ${item.maxParticipants}</p>
         <p class="currentParticipants">Текущее количеставо участников: <span class="numbercurrentParticipants">${item.currentParticipants}</span></p>
         <button ${signUp} onClick="signUp(this, ${item.id})" class="sign-up-button">Записаться</button>
         <button ${cancelRecording} onClick="cancelRecording(this, ${item.id})" class="cancel-recording-button">Отменить запись</button>
         <br>
         <br>
      </div>
   `;
}

/**Функция записи при нажатии на кнопку "Записаться"*/
function signUp (item, id) {
   const numbercurrentParticipants =
      item.parentElement.getElementsByClassName("numbercurrentParticipants");

   const cancelRecordingButton =
      item.parentElement.getElementsByClassName("cancel-recording-button");

   numbercurrentParticipants.item(0).textContent =
      Number(numbercurrentParticipants.item(0).textContent) + 1;

   cancelRecordingButton.item(0).disabled = false;

   item.disabled = true;

   saveLocalStorage(id);
}

/**Функция отмены записи при нажатии на кнопку "Отменить запись"*/
function cancelRecording (item, id) {
   const numbercurrentParticipants =
      item.parentElement.getElementsByClassName("numbercurrentParticipants");

   const signUpButton =
      item.parentElement.getElementsByClassName("sign-up-button");

   numbercurrentParticipants.item(0).textContent =
      Number(numbercurrentParticipants.item(0).textContent) - 1;

   signUpButton.item(0).disabled = false;

   item.disabled = true;

   removeLocalStorage(id);
}

/**Функция записи в localStorage */
function saveLocalStorage (id) {
   let record = localStorage.getItem(localStorageKey);
   if (record === null) {
      record = JSON.stringify([{ id: id }]);
   } else {
      const arr = JSON.parse(record);
      arr.push({ id: id });
      record = JSON.stringify(arr);
   }
   localStorage.setItem(localStorageKey, record);
}

/**Функция удаления из localStorage */
function removeLocalStorage (id) {
   let arr;
   let record = localStorage.getItem(localStorageKey);
   if (record !== null) {
      arr = JSON.parse(record);
      const index = arr.indexOf(arr.find(it => it.id === id));
      arr.splice(index, 1);
      record = JSON.stringify(arr);
   }
   if (arr.length !== 0) {
      localStorage.setItem(localStorageKey, record);
   } else {
      localStorage.removeItem(localStorageKey);
   }
}