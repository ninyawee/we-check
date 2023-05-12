import { NextPage } from "next";
import React, { Fragment, useEffect, useState } from "react";
import Meta from "../components/meta";
import maplibreGl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";
import { useResizeDetector } from "react-resize-detector";
import LabelVallaris from "../components/labelVallaris";
import FormSubmit from "../components/formSubmit";
import { AnimatePresence, motion } from "framer-motion";
import TopNav from "../components/topNav"
import BottomDrawer from "../components/bottomDrawer"
import LocationInfoForm from "../components/forms/locationInfoForm";
import IntroductionPanel from "../components/panels/introductionPanel";

const index: NextPage = () => {
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const contain = useResizeDetector();
  const [open, setOpen] = useState<boolean>(false);
  const [featureSelected, setFeatureSelected] = useState<any>(null);

  useEffect(() => {
    const mapInit = new maplibreGl.Map({
      container: "map-elec",
      style:
        "https://cdn-cloud.vallarismaps.com/core/api/styles/1.0-beta/styles/645e436dfa69d95b2a30092a?api_key=o0rgkaoNFWud7dnI9DnF3HsWAo4RVTvsNW3PZMFMSwagqjJ7HaEXSB8mqTkr12OY",
      attributionControl: false,
      bounds :[[96.526051,0.745161],[106.633472,22.875701]],
    });

    setMap(mapInit);

    mapInit.once("load", (e) => {
      e.target.resize();
    });

    return () => {
      mapInit?.remove();
    };
  }, []);

  function easing(t: any) {
    return t * (2 - t);
  }

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
        } else {
          setOpen(false);
          setFeatureSelected(null);
        }
      });
      // map.on("touchstart", (e) => {
      //   console.log("touchj");
      //   const features = e.target.queryRenderedFeatures(e.point);
      //   console.log(features);
      // });
    }
    return () => { };
  }, [map]);

  const onClose = () => {
    setOpen(false);
    setFeatureSelected(null);
  };

  return (
    <Fragment>
      <TopNav />
      <Meta title={"จับโกง 66"} />
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
        <BottomDrawer open={open} onClose={onClose}>
          <LocationInfoForm/>
        </BottomDrawer>

        <IntroductionPanel active={!open}/>
      </Box>
    </Fragment>
  );
};

export default index;
