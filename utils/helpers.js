
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new DataTypes(date).getData()}/${new Date(date).getFullYear()}`;
    },
}