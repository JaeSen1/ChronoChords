export default function LandingPage() {

    const getSpotifyUserLogin = () => {
        fetch("http://localhost:8085/api/login")
        .then((response) => response.text())
        .then(response => {
            window.location.replace(response);
        })
    }

    return (<button onClick={getSpotifyUserLogin}>Login to Spotify</button>);
}