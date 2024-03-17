import axios from 'axios';

const API_URL = 'https://filesshare-a6te.onrender.com';

export const downloadFile = async (enteredCode, code) => {
    try {
        if (code === enteredCode) {
            const response = await axios.get(`${API_URL}/download/${code}`, {
                responseType: 'blob' // Set the response type to 'blob' to receive binary data
            });
            
            // Create a temporary URL for the blob data
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'filename'); // Set the desired filename
            
            // Simulate a click event to trigger the download
            document.body.appendChild(link);
            link.click();
            
            // Clean up by removing the temporary link and URL object
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } else {
            throw new Error("Code does not match");
        }
    } catch (error) {
        console.error("Error downloading file: ", error.message);
    }
}
