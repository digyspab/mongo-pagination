// Regex function for search fucntionality
const escapeRegex = (string) => {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
} 

// Exporting function
module.exports = escapeRegex;