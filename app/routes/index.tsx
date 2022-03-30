import { addHours } from "date-fns";
import format from "date-fns/format";
import mapboxStyles from "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import Map, { Layer, Source } from "react-map-gl";
import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { dataLayer } from "~/components/map-style";
import { updateLT } from "~/utils";
import geojson from "../../assets/data.json";
import useInterval from "../hooks/useInterval";
import { json } from "remix";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: mapboxStyles,
    },
  ];
};

export const meta: MetaFunction = () => {
  return {
    title: "Home Page",
    description: "Snow Plow Coverage Time Lapse",
  };
};

export const loader: LoaderFunction = async () => {
  return json({ MAPBOX_API_TOKEN: process.env.MAPBOX_API_TOKEN });
};

export default function IndexPage() {
  const { MAPBOX_API_TOKEN } = useLoaderData();
  const [viewState, setViewState] = React.useState({
    latitude: 43.035,
    longitude: -76.14,
    zoom: 11.9,
  });
  const [hourInterval, setHourInterval] = React.useState<number>(0);
  const [date, setDate] = React.useState<Date>(new Date(2017, 2, 13));

  const data = React.useMemo(
    // @ts-ignore.
    () => geojson && updateLT(geojson, (f) => f.properties?.LT[hourInterval]),
    [hourInterval]
  );

  useInterval(() => {
    if (hourInterval < 47) {
      setHourInterval(hourInterval + 1);
      setDate(addHours(date, 2));
    }
  }, 2000);

  return (
    <div className="py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        <h1 className="text-center text-2xl font-extrabold tracking-wide text-slate-600 sm:text-left sm:text-3xl">
          Snow Plow Coverage Time Lapse
        </h1>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 text-center text-3xl text-slate-700 sm:px-6 md:px-8">
        <span className="mr-2">{format(date, "yyyy, MMMM do")}</span>
        <span className="animate-pulse font-extrabold underline">
          {format(date, "h aaa")}
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mt-10 h-[800px] w-full rounded-lg bg-slate-50">
          <Map
            {...viewState}
            mapStyle="mapbox://styles/mapbox/light-v10"
            mapboxAccessToken={MAPBOX_API_TOKEN}
            interactiveLayerIds={["data"]}
            onMove={(evt) => setViewState(evt.viewState)}
          >
            <Source id="data" type="geojson" data={data}>
              <Layer {...dataLayer} />
            </Source>
          </Map>
        </div>

        <div className="prose prose-sm mx-auto mt-8">
          <p>
            In a real scenario, the map will display where snow plows will be
            located at current time.
          </p>
          <p>
            In our case, since we are using a static dataset, the map provides a
            graphical display of where snow plows have been during the time
            period (2017, March 13th 00:00 AM - 2017, March 16th 10:00 PM).
          </p>

          <p>
            The date at the top of the screen changes the time forward in 2-hour
            increments.
          </p>

          <p>
            The color of the streets is an indicator of how long it has been
            since a plow was present on that street.
          </p>

          <p>
            Please note that the map does not indicate what sort of activity, if
            any, the plow performed while on a particular street, only that it
            was present on that street.
          </p>
        </div>
      </div>
    </div>
  );
}
