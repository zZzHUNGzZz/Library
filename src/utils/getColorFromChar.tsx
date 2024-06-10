export const getColorFromChar = (char: string) => {
    const colorColection = [
        { char: 'A', color: '#ff7875' },
        { char: 'B', color: '#ff85c0' },
        { char: 'C', color: '#5cdbd3' },
        { char: 'D', color: '#b37feb' },
        { char: 'E', color: '#ff9c6e' },
        { char: 'F', color: '#fadb14' },
        { char: 'G', color: '#ffc069' },
        { char: 'H', color: '#85a5ff' },
        { char: 'I', color: '#ffd666' },
        { char: 'J', color: '#d3f261' },
        { char: 'K', color: '#69b1ff' },
        { char: 'L', color: '#95de64' },
        { char: 'M', color: '#f5222d' },
        { char: 'N', color: '#eb2f96' },
        { char: 'O', color: '#13c2c2' },
        { char: 'P', color: '#722ed1' },
        { char: 'Q', color: '#fa541c' },
        { char: 'R', color: '#ad8b00' },
        { char: 'S', color: '#fa8c16' },
        { char: 'T', color: '#2f54eb' },
        { char: 'U', color: '#faad14' },
        { char: 'V', color: '#a0d911' },
        { char: 'W', color: '#1677ff' },
        { char: 'X', color: '#52c41a' },
        { char: 'Y', color: '#ad2102' },
        { char: 'Z', color: '#391085' },
    ];

    const foundColor = colorColection.find(item => item.char === char);
    return !!foundColor ? foundColor.color : '#10239e';
}