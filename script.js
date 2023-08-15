let canvas, ctx;

function loadMap() {
    canvas = document.getElementById("mapCanvas");
    canvas.width = 500;
    canvas.height = 500;
    ctx = canvas.getContext("2d");

    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        credentials: 'AirnGsbLWdX0XyZu8CzEEG5hB_X78sExc19nTp4Vj3pcpwDz6cCONDGZiodXJFKJ',
        callback: function () {
            const mapContainer = document.getElementById("bingMapsControl");
            const bingMapsControl = new Microsoft.Maps.Map(mapContainer, {
                credentials: 'AirnGsbLWdX0XyZu8CzEEG5hB_X78sExc19nTp4Vj3pcpwDz6cCONDGZiodXJFKJ',
                center: new Microsoft.Maps.Location(0, 0),
                zoom: 1 
            });

            document.getElementById("getLocationButton").addEventListener("click", getMyLocation);

            function getMyLocation() {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(locateSuccess, locateFail);
                } else {
                    alert("Geolocation is not available in your browser.");
                }
            }

            function locateSuccess(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                bingMapsControl.setView({ center: new Microsoft.Maps.Location(latitude, longitude), zoom: 15 });

                
                bingMapsControl.entities.clear();

                const userLocation = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(latitude, longitude), { 
                    color: 'red',
                    title: 'Your current location',
                    
                    
                    
                 });
                bingMapsControl.entities.push(userLocation);

                          

               
            }

            function locateFail(error) {
                alert("Failed to get your location: " + error.message);
            }
        }
    });
}

window.onload = loadMap;