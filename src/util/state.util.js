export const toggleBooleanStateHandler = (that, attribute) => {
    that.setState(prevState => {
        return {
            [attribute]: !prevState[attribute]
        }
    })
}