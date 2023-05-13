var size = 80;

export const pulsingDot = (m: any) => {
  const result: any = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    onAdd: function () {
      var canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },

    render: function () {
      var duration = 1000;
      var t = (performance.now() % duration) / duration;

      var radius = (size / 2) * 0.3;
      var outerRadius = (size / 2) * 0.7 * t + radius;
      var context = this.context;

      // draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);

      // change color
      context.fillStyle = "rgba(16, 196, 135," + (1 - t) + ")";
      context.fill();

      // draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);

      // change color
      context.fillStyle = "rgba(16, 196, 135, 1)";
      context.strokeStyle = "white";
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // update this image's data with data from the canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // continuously repaint the map, resulting in the smooth animation of the dot
      m?.triggerRepaint();

      // return `true` to let the map know that the image was updated
      return true;
    },
  };
  return result;
};

export const getGeolocation = (
  map: maplibregl.Map,
  geolocate: boolean,
  setGeolocate: Function
) => {
  if (geolocate) {
    map.removeLayer("points");
    map.removeSource("points");

    // setGeolocate(false);
    setGeolocate((g: any) => ({ ...g, trigger: false }));
  } else {
    // setLoad(true);
    setGeolocate((g: any) => ({ ...g, loading: true }));
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 14,
          essential: true,
        });

        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    position.coords.longitude,
                    position.coords.latitude,
                  ],
                },
              },
            ] as any,
          },
        });
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "pulsing-dot",
          },
        });
        // setLoad(false);
        // setGeolocate(true);
        setGeolocate((g: any) => ({ ...g, trigger: true, loading: false }));
      });
    }
  }
};
