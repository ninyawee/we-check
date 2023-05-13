import { NextPage } from "next";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import Meta from "../components/meta";
import maplibreGl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box, useMediaQuery } from "@mui/material";
import { useResizeDetector } from "react-resize-detector";
import LabelVallaris from "../components/labelVallaris";
import LocationPanel from "../components/panels/locationPanel";
import IntroductionPanel from "../components/panels/introductionPanel";
import TutorialDialog from "../components/dialogs/tutorialDialog";
import { getGeolocation, pulsingDot } from "../config/map";
import { useLocationStore } from "../store/location.store";
import { ILocation } from "../interfaces/location.interface";
import DeviceNotSupportPanel from "../components/panels/deviceNotSupportPanel";
import { useLayoutStore } from "../store/layout.store";

const tutorialStorageKey = "tutorial";

const index: NextPage = () => {
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const contain = useResizeDetector();
  const [open, setOpen] = useState<boolean>(false);
  const [featureSelected, setFeatureSelected] = useState<any>(null);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [geolocate, setGeolocate] = useState<{
    trigger: boolean;
    loading: boolean;
  }>({ trigger: false, loading: false });
  const matchDesktop = useMediaQuery('(min-width:900px)')
  const { setSelectedLocation } = useLocationStore()
  const { isDesktopConfirm } = useLayoutStore()

  useLayoutEffect(() => {
    const viewStatus = localStorage.getItem(tutorialStorageKey) === "true";
    setShowTutorial(!viewStatus);
  }, []);

  useEffect(() => {
    const mapInit = new maplibreGl.Map({
      container: "map-elec",
      style:
        "https://cdn-cloud.vallarismaps.com/core/api/styles/1.0-beta/styles/645e436dfa69d95b2a30092a?api_key=o0rgkaoNFWud7dnI9DnF3HsWAo4RVTvsNW3PZMFMSwagqjJ7HaEXSB8mqTkr12OY",
      attributionControl: false,
      bounds: [
        [96.526051, 0.745161],
        [106.633472, 22.875701],
      ],
    });

    setMap(mapInit);

    mapInit.on("load", (e) => {
      //pulsingDot add style for point of user geolocation
      e.target.addImage("pulsing-dot", pulsingDot(e.target), { pixelRatio: 2 });

      // if want first time coming trigger geolocation
      //getGeolocation(e.target, geolocate.trigger, setGeolocate);
    });

    mapInit.once("load", (e) => {
      e.target.resize();
    });

    return () => {
      mapInit?.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      var deltaDistance = 200;

      // degrees the map rotates when the left or right arrow is clicked
      map.on("click", (e) => {
        const features = e.target.queryRenderedFeatures(e.point, {
          layers: ["ELECT_PLACE_POI"],
        });

        if (features.length) {
          setOpen(true);
          setFeatureSelected(features[0].properties);
          setSelectedLocation(features[0].properties as ILocation)
          if (features[0].geometry.type === "Point") {
            e.target.easeTo({
              center: [
                features[0].geometry.coordinates[0],
                features[0].geometry.coordinates[1],
              ],
              zoom: 14,
              duration: 800,
              easing: function (t) {
                return t;
              },

              essential: true,
              offset: [0, -deltaDistance],
            });
          }
        } else {
          setOpen(false);
          setFeatureSelected(null);
        }
      });
    }
    return () => {};
  }, [map]);

  const onClose = () => {
    setOpen(false);
    setFeatureSelected(null);
  };

  function onCloseTutorial() {
    localStorage.setItem(tutorialStorageKey, "true");
    setShowTutorial(false);
  }

  const toggleGeolocate = () => {
    if (map) getGeolocation(map, geolocate.trigger, setGeolocate);
  };

  return (
    <Fragment>
      <Meta title={"We Check"} />
      {(matchDesktop && !isDesktopConfirm) && <DeviceNotSupportPanel/>}
      <Box
        component={"div"}
        id="map-elec"
        ref={contain.ref}
        sx={{
          height: "100vh",
          width: "100%",
        }}
      >
        <LabelVallaris
          iconSize={"2.2rem"}
          titleSize="subtitle1"
          descSize={12}
          contain={contain}
          color="black"
        />
        <TutorialDialog open={showTutorial} onClose={onCloseTutorial} />
        <LocationPanel open={open} onClose={onClose} />
        <IntroductionPanel active={!open} locationLoading={geolocate.loading} onMyLocationTrigger={toggleGeolocate}/>
      </Box>
    </Fragment>
  );
};

export default index;
