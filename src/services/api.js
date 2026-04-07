export const fetchMovies = async () => {
  try {
    const res = await fetch(
      "https://api.imdbapi.dev/titles?limit=20"
    );

    const data = await res.json();

    console.log("API FULL DATA:", data); 

    return data.titles || []; 
  } catch (error) {
    console.error(error);
    return [];
  }
};