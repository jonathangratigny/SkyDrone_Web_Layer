//formate la date en localeDateString pour l'afficher en JJ/MM/AAAA
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
}

//calcule le nombre de jours entre deux dates, retourne un entier
export const getDaysBetweenTwoDates = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}

//retourne la date en nombre entier
export const transformDateToNumber = (date) => {
    return new Date(date).getTime()
}
