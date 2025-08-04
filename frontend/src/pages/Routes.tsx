import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getAllRoutes } from '../api';
import { MapIcon, FilterIcon, Clock as ClockIcon, Bell as BellIcon, Star as StarIcon, MessageSquare as MessageSquareIcon, Loader as LoaderIcon } from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup,useMap } from 'react-leaflet';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
interface MapViewControllerProps {
  path: LatLngExpression[] | null;
}


interface RoutesProps {
  onNavigate: (page: string) => void;
}
interface RouteStop {
  name: string;
  coordinates: [number, number];
}
interface RouteData {
  id: string;
  name: string;
  status: string;
  color: string;
  eta: string;
  stops: { name: string; coordinates: [number, number] }[];
  path: [number, number][];
  frequency: string;
  delay?: string;
  modification?: string;
}

//////
const MapViewController: React.FC<{ path: [number, number][] | null }> = ({ path }) => {
  const map = useMap();

  useEffect(() => {
    if (path && path.length) {
      const bounds = L.latLngBounds(path);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [path, map]);

  return null;
};
const getRoadRoute = async (coords: [number, number][]) => {
  const apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjZjNzNkMTUxMzE5MjQ1Zjg5YTZiNGE5Mzg3NTUxMThhIiwiaCI6Im11cm11cjY0In0=';
  const response = await axios.post(
    'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
    {
      coordinates: coords
    },
    {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
};




////eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjZjNzNkMTUxMzE5MjQ1Zjg5YTZiNGE5Mzg3NTUxMThhIiwiaCI6Im11cm11cjY0In0=

export const Routes: React.FC<RoutesProps> = ({
  onNavigate
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    operational: true,
    delayed: true,
    modified: true
  });
  const [smoothedPath, setSmoothedPath] = useState<[number, number][] | null>(null);

  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  // Fetch routes from API
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await getAllRoutes();
        setRoutes(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch routes:', err);
        setError('Failed to load routes data');
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  useEffect(() => {
  const fetchSmoothedPath = async () => {
    if (!selectedRoute) {
      setSmoothedPath(null);
      return;
    }

    const route = routes.find(r => r.id === selectedRoute);
    if (!route || route.path.length < 2) {
      setSmoothedPath(null);
      return;
    }

    try {
      const validCoords = route.path.map(([lat, lng]) => [lng, lat]); // [lng, lat] for API
      const smoothed = await getRoadRoute(validCoords);
      setSmoothedPath(smoothed);
    } catch (error) {
      console.error('Failed to get road-following path:', error);
      setSmoothedPath(route.path); // fallback to raw polyline
    }
  };

  fetchSmoothedPath();
}, [selectedRoute, routes]);


  // Filter routes based on active filters
  const filteredRoutes = routes.filter(route => {
    return activeFilters[route.status as keyof typeof activeFilters];
  });

  // Initialize Google Map (mock implementation)
  useEffect(() => {
    // In a real implementation, this would load the Google Maps API
    // and initialize the map with routes
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const selectedRouteData = selectedRoute
    ? routes.find(route => route.id === selectedRoute) ?? null
    : null;
  if (loading) {
    return <div className="container mx-auto px-4 py-8 flex items-center justify-center h-64">
        <div className="text-center">
          <LoaderIcon size={48} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading routes...</p>
        </div>
      </div>;
  }
  if (error) {
    return <div className="container mx-auto px-4 py-8">
        <Card>
          <div className="text-center p-6">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Card>
      </div>;
  }
  return <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar with route list */}
        <div className="lg:w-1/3">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Pretoria Bus Routes
            </h1>
            <Button variant="outline" size="sm" onClick={() => setFilterOpen(!filterOpen)}>
              <FilterIcon size={16} className="mr-1" />
              Filter
            </Button>
          </div>
          {/* Filters panel */}
          {filterOpen && <Card className="mb-4">
              <h3 className="font-medium text-gray-800 mb-3">Filter Routes</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" checked={activeFilters.operational} onChange={() => setActiveFilters({
                ...activeFilters,
                operational: !activeFilters.operational
              })} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                  <span className="ml-2 text-sm text-gray-700">
                    Operational
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={activeFilters.delayed} onChange={() => setActiveFilters({
                ...activeFilters,
                delayed: !activeFilters.delayed
              })} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Delayed</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={activeFilters.modified} onChange={() => setActiveFilters({
                ...activeFilters,
                modified: !activeFilters.modified
              })} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                  <span className="ml-2 text-sm text-gray-700">
                    Modified Routes
                  </span>
                </label>
              </div>
            </Card>}
          {/* Route list */}
          <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
            {filteredRoutes.map(route => <div key={route.id} className={`border rounded-lg p-3 cursor-pointer transition-colors ${selectedRoute === route.id ? 'border-teal-600 bg-teal-50' : 'hover:bg-gray-50'}`} onClick={() => setSelectedRoute(route.id)}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium" style={{
                  backgroundColor: route.color
                }}>
                      {route.id}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{route.name}</p>
                      <div className="flex items-center text-xs">
                        <ClockIcon size={12} className="mr-1 text-gray-500" />
                        <span className="text-gray-500">ETA: {route.eta}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {route.status === 'operational' && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        On Time
                      </span>}
                    {route.status === 'delayed' && <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Delayed
                      </span>}
                    {route.status === 'modified' && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Modified
                      </span>}
                  </div>
                </div>
                {/* Additional details for selected route */}
                {selectedRoute === route.id && <div className="mt-3 pt-3 border-t">
                    <div className="mb-3">
                      <h4 className="font-medium text-sm mb-1">Key Stops:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {route.stops.slice(0, 5).map((stop, index) => <li key={index} className="flex items-start">
                            <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2 mt-0.5">
                              {index + 1}
                            </span>
                            <span>{stop.name}</span>
                          </li>)}
                        {/* {route.stops.length > 3 && <li className="text-teal-600 pl-6">
                            + {route.stops.length - 3} more stops
                          </li>} */}
                      </ul>
                    </div>
                    {route.delay && <div className="text-sm text-red-600 mb-2">
                        <strong>Delay:</strong> {route.delay}
                      </div>}
                    {route.modification && <div className="text-sm text-yellow-600 mb-2">
                        <strong>Note:</strong> {route.modification}
                      </div>}
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        <StarIcon size={14} className="mr-1" />
                        Favorite
                      </Button>
                      <Button variant="outline" size="sm">
                        <BellIcon size={14} className="mr-1" />
                        Notify
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onNavigate('forum')}>
                        <MessageSquareIcon size={14} className="mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>}
              </div>)}
          </div>
        </div>
        {/* Right side with map */}
        <div className="lg:w-2/3">
  <Card className="h-[600px] flex items-center justify-center relative">
    {/* {!mapLoaded ? (
      <div className="text-center">
        <MapIcon size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Loading map...</p>
      </div>
    ) : ( */}
     1. In your MapContainer JSX, update to:

 <MapContainer
  center={[-25.7461, 28.1881]}
  zoom={12}
  scrollWheelZoom
  style={{ height: '600px', width: '100%' }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; OpenStreetMap contributors"
  />

  {/* Adjust view to fit selected route */}
  <MapViewController path={smoothedPath ?? null} />

  {/* Draw route lines */}
  {filteredRoutes.map(route => (
    <Polyline
      key={route.id}
      positions={
        route.id === selectedRoute
          ? smoothedPath ?? route.path
          : route.path
      }
      pathOptions={{
        color: route.color,
        weight: route.id === selectedRoute ? 6 : 3,
        opacity: route.id === selectedRoute ? 1 : 0.6,
      }}
      eventHandlers={{
        click: () => setSelectedRoute(route.id),
      }}
    />
  ))}

  {/* Add markers for stops */}
  {selectedRouteData
    ? selectedRouteData.stops.map((stop, idx) => (
        <Marker key={idx} position={stop.coordinates} title={stop.name}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))
    : (
        <Marker position={[-25.7461, 28.1881]}>
          <Popup>Church Square</Popup>
        </Marker>
      )}
</MapContainer>

    {/* )} */}
  </Card>
</div>
      </div>
    </div>;
};