import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalFunctionService {
  constructor() {}

  removeLocalStorageByValue(value: string) {
    try {
      /* declare var */
      const storageKeys = Object.keys(localStorage);
      const indexArr: number[] = [];

      /* find index to store in array var */
      storageKeys.findIndex((key, i) => {
        const isFound = key.includes(value);
        if (isFound) indexArr.push(i);
      });

      /* using index on index array to remove storage */
      indexArr.forEach((keyIndex) => {
        localStorage.removeItem(storageKeys[keyIndex]);
      });
      console.log('Storage keys was removing success.');
    } catch (error) {
      console.log('Failed to remove storage keys.');
    }
  }

  clearAllCookies() {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  }
}
