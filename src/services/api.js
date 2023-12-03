const apiUrl = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100';

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

}

export default fetchData;