export const exerciseOptions = {
    method: 'GET',
    params: {limit: '50'},
    headers: {
      'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_EXERCISE_HOST,
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_EXERCISE_KEY,
    },
  };
  
  export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_YOUTUBE_HOST,
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_YOUTUBE_KEY,
    },
  };
  
  export const fetchData = async (url, options) => {
    // Construct URL with parameters
    const params = new URLSearchParams(options.params).toString();
    const urlWithParams = `${url}?${params}`;

    // Make the fetch request
    const res = await fetch(urlWithParams, {
        method: options.method,
        headers: options.headers,
    });
    
    // Error handling
    if (!res.ok) {
        throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }
    
    // Parse and return the JSON response
    const data = await res.json();
    return data;
};
