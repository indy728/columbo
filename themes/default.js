import { reversePalette } from 'styled-theme/composer'
import palette from './palette'

const theme = {
    palette: palette
}

theme.reversePalette = reversePalette(theme.palette)

theme.shadow = {
    container: '0 2rem 6rem rgba(0,0,0,.3)',
    component: '0 1rem 3rem rgba(0,0,0,.3)'
}

theme.fonts = {
    primary: "'Lora', serif",
    header: "'Montserrat', sans-serif",
    script: "'Swanky and Moo Moo', cursive",
    nameplate: "'Lobster', cursive",
}

export default theme
