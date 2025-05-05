import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWZiNjA5NDNlYmRhZGQ4Y2JhYzMzZGYxMjBiZTQ0YyIsIm5iZiI6MTczODY2MDQ5Ny4xNzEsInN1YiI6IjY3YTFkYTkxMzgwYjg2YWNkOTAyZjk4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gnkpcjwBGZZ1q-V6ZzTHZxDa3yUmu71aFUbMpI6mUOY",
  },
}); 

export default instance;
