'use strict';

// Get element function
const $ = (e) => {
  return document.querySelector(e);
};

const $$ = (e) => {
  return document.querySelectorAll(e);
};

// LocalStorage get and set Data

const savetoStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

// Public variables

const appMenu = $('#sidebar');

const _KEY = 'petDataList';
const petDataList = getFromStorage(_KEY);

const _BR = 'breedDataList';
const breedDataList = getFromStorage(_BR);

const date = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

// Sidebar Animations

appMenu.onclick = () => {
  appMenu.classList.toggle('active');
};
