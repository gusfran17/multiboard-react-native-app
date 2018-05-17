const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December",
];

export const formatDate = date => {
    if (date) {
        date = new Date(date);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${hours}:${minutes}, ${day} ${monthNames[monthIndex]} ${year}`;
    } else {
        return '---';
    }
}

export const formatDateShort = date => {
    if (date) {
        date = new Date(date);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${monthNames[monthIndex]} ${year}`;
    } else {
        return '---';
    }
}

export const formatNumberLength = (num, length) => {
    let number = num.toString();
    while (number.length < length) {
        number = `0${number}`;
    }
    return number;
}

export const formatMiliseconds = time => {
    const timeParts = time.split(':');
    const minutes = Number(timeParts[0]);
    const seconds = Number(timeParts[1]);
    const timeLimit = ((minutes*60) + seconds)*1000;
    return timeLimit;
}

export const formatTime = elapsedTime => {
    const minutes = formatNumberLength(Math.floor((elapsedTime / 60000) % 60), 2);
    const seconds = formatNumberLength(Math.floor((elapsedTime / 1000) % 60), 2);
    return `${minutes}:${seconds}`;
}

export const trimName = (name, length) => {
    if (name.length > length){
        let shortName = `${name.substring(0,length-2)}...`;
        return shortName;
    }
    return name;
}
