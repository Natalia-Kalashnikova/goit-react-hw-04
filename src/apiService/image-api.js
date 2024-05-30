import axios from "axios";

const API_KEY = "mskXwYk7bCouuxf64aJE3hOqbVNI95fUDMc0-66QkWM";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos";

const fetchImages = async (currentPage, searchQuery) => {
    const response = await axios.get("", {
        params: {
            query: searchQuery,
            page: currentPage,
            per_page: 15,
            orientation: "landscape",
            client_id: API_KEY,
        },
    });
    return response.data;
};

export default fetchImages;
