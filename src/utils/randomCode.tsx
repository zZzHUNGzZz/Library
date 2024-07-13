export const randomCode = (code: string) => {
    let randomNum = Math.floor(Math.random() * 100000000);
    let randomEightDigits = code + randomNum.toString().padStart(12, '0');
    return randomEightDigits;
}
