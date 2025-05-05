# SCSDB (Streaming Content Search Database)

SCSDB is a web application that allows users to search for and explore streaming content such as movies and TV shows. The app provides a seamless user experience with features like detailed content pages, advanced filtering, and recommendations. Built using **ReactJS** and **Tailwind CSS**, it fetches data from the TMDB API to display rich content details and media trailers.

## Features

- **Search**: Allows users to search for movies and TV shows by title.
- **Detailed Pages**: Each content item has a detailed page with additional information such as the cast, plot, and release dates.
- **Infinite Scroll**: Smooth scrolling experience while browsing content, no need for pagination.
- **Trailer Playback**: View trailers of movies/TV shows directly within the app using **React Player**.
- **Recommendations**: Suggested content based on the current search or selected item.
- **Advanced Filtering**: Filters to refine the search results based on categories like genre, rating, etc.

## Technologies Used

- **ReactJS**: For building the interactive UI.
- **Tailwind CSS**: For styling the application.
- **TMDB API**: To fetch movie and TV show data.
- **React Router DOM**: For smooth navigation between pages.
- **React Player**: To integrate media playback for trailers.
- **Axios**: For making HTTP requests to the API.

## Installation

To run the project locally:

1. Clone the repository:

    ```bash
    git clone git@github.com:Vee-shal/SCSDB.git
    ```

2. Navigate to the project directory:

    ```bash
    cd SCSDB
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Run the application:

    ```bash
    npm run dev
    ```

The application will open in your browser at `http://localhost:3000`.

## API Key

This project uses the **TMDB API** to fetch data. You'll need to create a free account on [TMDB](https://www.themoviedb.org/) and obtain an API key.

1. Visit [TMDB API](https://www.themoviedb.org/settings/api) to get your API key.
2. Create a `.env` file in the root directory and add the following line:

    ```bash
    REACT_APP_TMDB_API_KEY=your-api-key
    ```


## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements

- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie and TV data.
- [React](https://reactjs.org/) for building the user interface.
- [Tailwind CSS](https://tailwindcss.com/) for rapid styling.
- [React Player](https://github.com/CookPete/react-player) for media playback.

