export const idTransform = str => {
    return (
        str.toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .trim()
            .replace(/[\s]+/g, '-')
            .replace(/^the/i, '')
    )
}

export const nameTransform = str => {
    return (
        str.toLowerCase()
            .replace(/[^a-zA-Z0-9\s()']/g, '')
            .trim()
            .replace(/[\s]+/g, ' ')
    )
}

export const titleCase = str => {
    const preChar = [' ', '(']
    // const preChar = [' ', '(', '\'']
    let newStr = str.toLowerCase()
    preChar.forEach(char => {
        let splitStr = newStr.split(char);
        for (let i = 0; i < splitStr.length; i++) {
            // cannot transform an immutable array, so replaces the array instead
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        newStr = splitStr.join(char)
    })
    return newStr;
}

export const qtyStringToFloat = str => {
    let splitStr = ''
    let float = 0
    const fractions = ['1/4', '1/2', '3/4']
    const decimals = ['25', '5', '75']

    if (str.match(/[ ]/g)) {
        splitStr = str.split(' ')
        splitStr[1] = decimals[fractions.indexOf(splitStr[1])]
        str = splitStr.join('.')
        console.log('[stringUtility] splitStr: ', splitStr)
    } else if (str.match(/\//g)) {
        str = '.' + decimals[fractions.indexOf(str)]
    }
    float = (Math.round(parseFloat(str) * 4) / 4).toFixed(2)
    return float
}

export const qtyFloatToString = float => {
    let floatString = float.toString()
    let splitStr = floatString.split('.')
    const converter = {
        '00': '',
        '25': '1/4',
        '50': '1/2',
        '75': '3/4',
    }
    if (splitStr[1] === '00') return splitStr[0]
    splitStr[1] = converter[splitStr[1]]
    if (splitStr[0] === '0') return splitStr[1]
    return splitStr.join(' ')
}

export const makePlural = str => {
    let newStr = ''
    if (str.match(/[(ch)(sh)sxz]$/i)){
        newStr = str + 'es'
    } else {
        newStr = str + 's'
    }
    return newStr
}