function getLastSunday() {
    let lastSunday = new Date();
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay() % 7);
    return lastSunday;
}

function howFarInWeek() {
    const today = new Date()
    return (today.getDay() + (today.getHours()+(today.getMinutes()+ (today.getSeconds()/60))/60)/24) / 7
}

function duplLastWeek(totals) {
    let thisWk = getLastSunday();
    let lastWk = new Date(thisWk);
    lastWk.setDate(lastWk.getDate() - 7)

    let withDupl = []

    for(let total of totals) {
        withDupl.push({...total, "lastWk": total.Week == thisWk.toLocaleDateString()})
        if(total.Week == lastWk.toLocaleDateString()) {
            withDupl.push({...total, "lastWk": true})
        }
    }

    return withDupl
}

let weekTotals = data => {
    let totals = []
    for(let date in data) {
        const sum = data[date].reduce((a, b) => a + b.Cost, 0)
        totals.push({"Week": date, "Total Spent": sum})
    }
    return totals
}

let thisWeekTotal = data => {
    return (data[getLastSunday().toLocaleDateString()] || []).reduce((a, b) => a + b.Cost, 0)
}

module.exports = {
    flatten: data => {
        let flat = []
        for(let date in data) {
            flat = flat.concat(data[date])
        }
        return flat
    },

    thisWeek: data => {
        let lastSunday = getLastSunday();
    
        return data[lastSunday.toLocaleDateString()]
    },

    weekTotals,

    thisWeekTotal,

    howFarInWeek,

    getLastSunday,

    weekTotalsWithThis: data => {
        return duplLastWeek(weekTotals(data))
    }
}