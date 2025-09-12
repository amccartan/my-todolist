export function setLocalStorageItem(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
}

export function getLocalStorageItem(key: string) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.error('Error reading from localStorage', error);
  }
}


export function replaceLocalStorageItem(key: string, value: unknown) {
   localStorage.removeItem(key); //delete item
   setLocalStorageItem(key, value);
}
