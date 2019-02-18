export default class NASAService {
    static loadImage(day) {
        return fetch(`https://api.nasa.gov/planetary/apod?api_key=X9XnWeJObgDohAEx7D3hQvdnuvr0yXU3UGgiX5dE&date=${day}`).then(response => response.json());
    }
}