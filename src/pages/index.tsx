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

const index: NextPage = () => {
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const contain = useResizeDetector();
  const [open, setOpen] = useState<boolean>(false);
  const [featureSelected, setFeatureSelected] = useState<any>(null);

  useEffect(() => {
    const mapInit = new maplibreGl.Map({
      container: "map-elec",
      style:
        "https://b-2.i-bitz.world/core/api/styles/1.0-beta/styles/6457177500396d5f324d20da?api_key=h9dGryOcvABZey18q86OAHhUJYEJPgn9mDBJd6RoWwycNjTE6lQ5k3Zy8kMVh4Fj",
      attributionControl: false,
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
          layers: ["Elect_Place"],
        });

        if (features.length) {
          setOpen(true);
          setFeatureSelected(features[0].properties);

          e.target.easeTo({
            center: [
              features[0].properties.longitude,
              features[0].properties.latitude,
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
    return () => {};
  }, [map]);

  const onClose = () => {
    setOpen(false);
    setFeatureSelected(null);
  };

  return (
    <Fragment>
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

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "61.8%" }}
              exit={{ height: 0 }}
              transition={{
                type: "keyframes",
                duration: 0.19,
              }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <FormSubmit featureSelected={featureSelected} onClose={onClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Fragment>
  );
};

export default index;
