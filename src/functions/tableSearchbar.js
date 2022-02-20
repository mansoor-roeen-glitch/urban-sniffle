// This functoin would update the services list
// list would be updated based on the search keyword
const searchList = ({value, list, setFoundMatch, searchKey}) => {
    const keyword = value;

    if (keyword !== '') {
        const searchRes = list.filter((item) => {
            return item[searchKey].toLowerCase().startsWith(keyword.toLowerCase());
            // Use the toLowerCase() method to make it case-insensitive
        });
        setFoundMatch(searchRes);
    } else {
        setFoundMatch(false);
        // If the text field is empty, show all users
    }
}

export {
    searchList
}