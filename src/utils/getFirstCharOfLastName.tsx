export const getFirstCharOfLastName = (name: string) => {
    const words: string[] = name.split(" ");
    const lastName: string = words[words.length - 1];
    return lastName.charAt(0).toUpperCase();
}