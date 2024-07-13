export const randomCode = () => {
    let randomNum = Math.floor(Math.random() * 100000000);
    let randomEightDigits = randomNum.toString().padStart(12, '0');
    return randomEightDigits;
}
