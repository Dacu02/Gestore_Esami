export const primary_color = (dark=false) => ( dark ? "#141314" : "#f6f6ff" ) //bianco ari : dark-grey
// colore sfondo


export const secondary_color = "#4d6edd" // blu app
//colore dettagli


export const tertiary_color = (dark=false) => ( dark ? "#f9f6ee" : "#282c33" ) // nero lucid : 
//colore testo

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 840;

export const getOrientamento = () => (
    Dimensions.get("window").width > Dimensions.get("window").height ? "landscape":"portrait"
)

export const rapportoOrizzontale = (size:number) => (width / guidelineBaseWidth) * size;
export const rapportoVerticale = (size:number) => (height / guidelineBaseHeight) * size;
export const scala = (size:number, factor = 0.5) => size + (rapportoOrizzontale(size) - size) * factor;
