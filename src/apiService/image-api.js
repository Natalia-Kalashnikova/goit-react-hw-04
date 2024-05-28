import axios from "axios";

const API_KEY = "zyiIFmpsblSLrWrNkxPSPCnekp3cFN53V-2ChI0P66w";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (currentPage, searchQuery) => {
    const response = await axios.get("", {
        params: {
            query: searchQuery,
            page: currentPage,
            per_page: 15,
            orientation: "landscape",
            client_id: API_KEY,
        },
    });
    return response.data.results;
};