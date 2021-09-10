
module.exports = { //helper function to get the current date
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new DataTypes(date).getData()}/${new Date(date).getFullYear()}`;
    },
}