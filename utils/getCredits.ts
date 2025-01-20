const TMDB_API_KEY = '';


export const getCredits = async (url: string): Promise<any[]> => {
  try {
    const response = await fetch(`${url}?api_key=${TMDB_API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const credits = data.cast || []; // Ensure credits is an array, even if `cast` is missing
    return credits; // Limit the number of credits returned
  } catch (error) {
    console.error('Error fetching credits:', error);
    return []; // Return an empty array in case of error
  }
};