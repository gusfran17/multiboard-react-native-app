const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December",
];

export const formatDate = date => {
    if (date) {
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
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${monthNames[monthIndex]} ${year}`;
    } else {
        return '---';
    }

}
