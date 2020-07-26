        //1.bounds and map
        var bounds = [
            [-74.04728500751165, 40.68392799015035], // Southwest coordinates
            [-73.91058699000139, 40.87764500765852]  // Northeast coordinates
        ];

        mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpYWxpbmciLCJhIjoiY2syeGwwc2JiMGNuMDNvcnNjMWZpa3JqMiJ9.qqZLsQKqdPcpjGFWfMD--Q';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/arialing/ck2xtyqf616711cldcwrrl3n3',
            center: [-74, 40.8],
            zoom: 10
        });


        //2.zoom
        map.addControl(new mapboxgl.NavigationControl());

        //3.geolocation
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        //4.data: parks, apartments
        var parkData;
        var restData;
        var serviceData;
        Promise.all([d3.json("https://raw.githubusercontent.com/ZiweiLing/ZiweiLing.github.io/master/NYC%20Parks%20Dog%20Runs.geojson"), d3.json("https://raw.githubusercontent.com/ZiweiLing/ZiweiLing.github.io/master/dog_restaurant_NYC.geojson"), d3.json("https://raw.githubusercontent.com/ZiweiLing/ZiweiLing.github.io/master/dog_service_vet_NYC.geojson")])
                .then(function(data){
                    // console.log(data)
                        parkData = data[0];
                        restData = data[1];
                        serviceData = data[2];
                        drawMap(parkData, restData, serviceData)
                });
               
   function drawMap(parkData, restData, serviceData){ map.on('load', function () {
        map.loadImage('https://raw.githubusercontent.com/ZiweiLing/ZiweiLing.github.io/master/pawprint.png', function (error, image) {//we load the image icon as we did in the previous file
            map.addImage('dog', image);

            map.addLayer({
                "id": "parks",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": parkData,//this is where we reference the geojson data from above
                },
                "layout": {//this is where we style the display- size the icons, show the labels etc. for placement and size
                    "icon-image": "dog",
                    "icon-size": 0.05
                }
            });
             // Create a popup, but don't add it to the map yet.
        var popup1 = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });
 
        map.on('mouseenter', 'parks', function(e) {
        // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
 
            var coordinates1 = e.features[0].geometry.coordinates.slice();
            var description1 = e.features[0].properties.name;
           
 
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates1[0]) > 180) {
                coordinates1[0] += e.lngLat.lng > coordinates1[0] ? 360 : -360;
            }
 
        // Populate the popup and set its coordinates
        // based on the feature found.
            popup1.setLngLat(coordinates1)
            .setHTML(description1)
            .addTo(map);
        });
 
        map.on('mouseleave', 'parks', function() {
        map.getCanvas().style.cursor = '';
        popup1.remove();
        });
        })
        
        map.loadImage('https://raw.githubusercontent.com/ZiweiLing/ZiweiLing.github.io/master/dog-food.png', function (error, image) {//we load the image icon as we did in the previous file
            map.addImage('restaurant', image);

            map.addLayer({
                "id": "restaurants",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": restData,//this is where we reference the geojson data from above
                },
                "layout": {//this is where we style the display- size the icons, show the labels etc. for placement and size
                    "icon-image": "restaurant",
                    "icon-size": 0.04
                }
            });
        // Create a popup, but don't add it to the map yet.
            var popup2 = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });
 
            map.on('mouseenter', 'restaurants', function(e) {
        // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';
 
                var coordinates2 = e.features[0].geometry.coordinates.slice();
                var description2 = e.features[0].properties.name;
 
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates2[0]) > 180) {
                    coordinates2[0] += e.lngLat.lng > coordinates2[0] ? 360 : -360;
            }
 
        // Populate the popup and set its coordinates
        // based on the feature found.
                popup2.setLngLat(coordinates2)
                        .setHTML(description2)
                        .addTo(map);
        });
 
                map.on('mouseleave', 'restaurants', function() {
                    map.getCanvas().style.cursor = '';
                    popup2.remove();
                });
        })

            map.loadImage('https://raw.githubusercontent.com/ZiweiLing/ZiweiLing.github.io/master/aid.png', function (error, image) {//we load the image icon as we did in the previous file
            map.addImage('aid', image);

            map.addLayer({
                "id": "service",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": serviceData,//this is where we reference the geojson data from above
                },
                "layout": {//this is where we style the display- size the icons, show the labels etc. for placement and size
                    "icon-image": "aid",
                    "icon-size": 0.04
                }
            });
                // Create a popup, but don't add it to the map yet.
            var popup3 = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });
 
            map.on('mouseenter', 'service', function(e) {
                map.getCanvas().style.cursor = 'pointer';
 
                var coordinates3 = e.features[0].geometry.coordinates.slice();
                var description3 = e.features[0].properties.name;
                while (Math.abs(e.lngLat.lng - coordinates3[0]) > 180) {
                    coordinates3[0] += e.lngLat.lng > coordinates3[0] ? 360 : -360;
            }
 
        // Populate the popup and set its coordinates
        // based on the feature found.
                popup3.setLngLat(coordinates3)
                      .setHTML(description3)
                      .addTo(map);
        });
 
            map.on('mouseleave', 'service', function() {
            map.getCanvas().style.cursor = '';
            popup3.remove();
            });
        })
    })


    //5. functions
    var markers = [];
    var isMarked = 0;   //a flag recording whether the map is marked
    map.on('click', function (d) {
        var arr = [];
        var lon1 = d.lngLat.lng;    //this is all the click information from the mouse
        var lat1 = d.lngLat.lat;    //this is all the click information from the mouse
        for (var i = 0; i < parkData.features.length; i++) {
            var coords = parkData.features[i].geometry.coordinates;
            var lat2 = coords[1];
            var lon2 = coords[0];
            var distance = havarsine(lat1, lon1, lat2, lon2);
            arr.push({
                distance: distance,
                coords: coords
            });
        }
        for (var i = 0; i < restData.features.length; i++) {
            var coords = restData.features[i].geometry.coordinates;
            var lat3 = coords[1];
            var lon3 = coords[0];
            var distance = havarsine(lat1, lon1, lat3, lon3);
            arr.push({
                distance: distance,
                coords: coords
            });
        }
        // console.log(serviceData);
    
        for (var i = 0; i < serviceData.features.length; i++) {
            var coords = serviceData.features[i].geometry.coordinates;
            var lat4 = coords[1];
            var lon4 = coords[0];
            var distance = havarsine(lat1, lon1, lat4, lon4);
            arr.push({
                distance: distance,
                coords: coords
            });
        }

        //console.log(arr);
        //Sort the array based on the second element
        var items = Object.keys(arr).map(function (key) {
            return [arr[key].coords, arr[key].distance];
        });
        //console.log(items);
        items.sort(function (first, second) {
            return first[1] - second[1];
        });
        var recommend = items.slice(0, 5);
        //console.log(recommend)
        //add markers to map
        for (var i = 0; i < recommend.length; i++) {
            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';
            //if any former marker is on the map, remove it
            if (isMarked) {
                markers[i].remove();
            }
            // make a marker for each feature and add to the map
            markers[i] = new mapboxgl.Marker(el)
                .setLngLat(recommend[i][0])
                .addTo(map);
            // fly to the click location
                map.flyTo({
                    center: recommend[i][0]
                    });
                    
        }
        isMarked = 1;
    });}

    function havarsine(lat1, lon1, lat2, lon2) {
        Number.prototype.toRad = function () {
            return this * Math.PI / 180;
        }
        var R = 6371; // km 
        //has a problem with the .toRad() method below.
        var x1 = lat2 - lat1;
        var dLat = x1.toRad();
        var x2 = lon2 - lon1;
        var dLon = x2.toRad();
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d;
    };

    // 6. popup
    var popup3 = new mapboxgl.Popup({closeOnClick: false})
        .setLngLat([-74.2,40.70932680472401])
        .setHTML('<h3>The map is to recommend nearby dog-friendly restaurants, dog services and dog runs by clicking on the map.</h3>')
        .addTo(map);

    // 7. menu
    var toggleableLayerIds = [ 'parks', 'restaurants', 'service' ];
    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];
 
        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;
 
        link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
 
        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
 
        if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
        } else {
            this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };
 
    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
