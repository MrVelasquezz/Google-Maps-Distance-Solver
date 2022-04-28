const axios = require('axios')
module.exports = async (street, house) => {
    const origin = "Pestalozzistraße 6, Graz, Austria"  //origin nr.1
    const destination = street + ' ' + house +', Graz, Austria'

    const getDistance = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?${encodeURI('origins='+origin+'&destinations='+destination+'&travelMode=WALKING')}&key=API_KEY`)
    const destinationsAnswer = getDistance.data.destination_addresses[0].split(',')
    const status = getDistance.data.rows[0].elements[0].status

    if (status == 'OK' && destinationsAnswer.length > 0 && destinationsAnswer.length > 2) {
        const distance = getDistance.data.rows[0].elements[0].distance.value 
        const plz = destinationsAnswer[1].split(' ')[1]
        if (distance <= 2000) {
            return {status: 'OK', cost: 2.20, dist: distance, dist_answer: destinationsAnswer, plz: plz}
        } else if (distance <= 3000) {
            return {status: 'OK', cost: 3.30, dist: distance, dist_answer: destinationsAnswer, plz: plz}
        } else if (distance <= 4000) {
            return {status: 'OK', cost: 3.80, dist: distance, dist_answer: destinationsAnswer, plz: plz}
        } else if (distance <= 5500) {
            return {status: 'OK', cost: 4.80, dist: distance, dist_answer: destinationsAnswer, plz: plz}
        }
        else{
            return {status: 'TOO_FAR', cost: 0, dist: distance, dist_answer: destinationsAnswer}
        }
    } else {
        return {status: 'ERROR', cost: 0, dist: 0, dist_answer: street+' '+ house}
    }
}