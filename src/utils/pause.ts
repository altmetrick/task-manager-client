//DEV ONLY Pause
export function pauseSuccess(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Pause success resolved');
    }, seconds * 1000);
  });
}
export function pauseError(seconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error from pause function!');
    }, seconds * 1000);
  });
}
