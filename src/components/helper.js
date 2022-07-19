//formate la date en localeDateString pour l'afficher en JJ/MM/AAAA
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
}

//calcule le nombre de jours entiers entre deux dates, retourne un entier
export const getDaysBetweenTwoDates = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays + 1
}

//retourne la date en nombre entier
export const transformDateToNumber = (date) => {
    return new Date(date).getTime()
}

//calcul du total de la location
export const totalPrice = (items) => {
    let total = 0
    let totalDays = getDaysBetweenTwoDates(items[0].startDate, items[0].endDate)
    totalDays <= 0 ?
        totalDays = 1 : totalDays = getDaysBetweenTwoDates(items[0].startDate, items[0].endDate)

    for (let key in items) {

        total += items[key].price
    }
    return total * totalDays
}

//frais logistique de 100
export const logistique = () => {
    return 100
}

// calcule le nombre de jours
export const getDays = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}

   //retire un jour de la date
 export function removeDay(date, days) {
    var result = new Date(date)
    result.setDate(result.getDate() - days)
    return result
}