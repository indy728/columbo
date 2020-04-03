import { updateObject } from '../shared/objectUtility'

let suits = ['spades', 'hearts', 'diamonds', 'clubs']

const clubs = {
    clubs: {
        A: require(`./cardImg/clubs/ace.png`),
        "J": require(`./cardImg/clubs/jack.png`),
        'Q': require(`./cardImg/clubs/queen.png`),
        'K': require(`./cardImg/clubs/king.png`),
        '2': require(`./cardImg/clubs/2.png`),
        '3': require(`./cardImg/clubs/3.png`),
        '4': require(`./cardImg/clubs/4.png`),
        '5': require(`./cardImg/clubs/5.png`),
        '6': require(`./cardImg/clubs/6.png`),
        '7': require(`./cardImg/clubs/7.png`),
        '8': require(`./cardImg/clubs/8.png`),
        '9': require(`./cardImg/clubs/9.png`),
        '10': require(`./cardImg/clubs/10.png`),
    }
}

const spades = {
    spades: {
        'A': require(`./cardImg/spades/ace.png`),
        'J': require(`./cardImg/spades/jack.png`),
        'Q': require(`./cardImg/spades/queen.png`),
        'K': require(`./cardImg/spades/king.png`),
        '2': require(`./cardImg/spades/2.png`),
        '3': require(`./cardImg/spades/3.png`),
        '4': require(`./cardImg/spades/4.png`),
        '5': require(`./cardImg/spades/5.png`),
        '6': require(`./cardImg/spades/6.png`),
        '7': require(`./cardImg/spades/7.png`),
        '8': require(`./cardImg/spades/8.png`),
        '9': require(`./cardImg/spades/9.png`),
        '10': require(`./cardImg/spades/10.png`),
    }
}

const hearts = {
    hearts: {
        'A': require(`./cardImg/hearts/ace.png`),
        'J': require(`./cardImg/hearts/jack.png`),
        'Q': require(`./cardImg/hearts/queen.png`),
        'K': require(`./cardImg/hearts/king.png`),
        '2': require(`./cardImg/hearts/2.png`),
        '3': require(`./cardImg/hearts/3.png`),
        '4': require(`./cardImg/hearts/4.png`),
        '5': require(`./cardImg/hearts/5.png`),
        '6': require(`./cardImg/hearts/6.png`),
        '7': require(`./cardImg/hearts/7.png`),
        '8': require(`./cardImg/hearts/8.png`),
        '9': require(`./cardImg/hearts/9.png`),
        '10': require(`./cardImg/hearts/10.png`),
    }
}

const diamonds = {
    diamonds: {
        'A': require(`./cardImg/diamonds/ace.png`),
        'J': require(`./cardImg/diamonds/jack.png`),
        'Q': require(`./cardImg/diamonds/queen.png`),
        'K': require(`./cardImg/diamonds/king.png`),
        '2': require(`./cardImg/diamonds/2.png`),
        '3': require(`./cardImg/diamonds/3.png`),
        '4': require(`./cardImg/diamonds/4.png`),
        '5': require(`./cardImg/diamonds/5.png`),
        '6': require(`./cardImg/diamonds/6.png`),
        '7': require(`./cardImg/diamonds/7.png`),
        '8': require(`./cardImg/diamonds/8.png`),
        '9': require(`./cardImg/diamonds/9.png`),
        '10': require(`./cardImg/diamonds/10.png`),
    }
}

export default cardImages = {
    spades,
    hearts,
    diamonds,
    clubs
}