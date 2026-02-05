function convertDriveUrl(url) {
    // Extract the file ID using regular expression
    const fileId = url.match(/\/file\/d\/([^\/]*)\/?/)[1];
    
    // Construct the converted URL
    const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    
    return convertedUrl;
}

// Example usage:
const originalUrl = "https://drive.google.com/file/d/1bytU7ZHkCKNgKxsL8-qNB14rMEftP69l/view?usp=drive_link";
const convertedUrl = convertDriveUrl(originalUrl);
console.log("converted url -  ", convertedUrl);