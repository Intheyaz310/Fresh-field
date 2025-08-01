import React, { useEffect, useRef, useState } from 'react';
import OrderStatusStepper from './OrderStatusStepper';
import DeliveryAgentCard from './DeliveryAgentCard';
import ETA from './ETA';
import toast, { Toaster } from 'react-hot-toast';

const ORDER_STATUSES = [
  { label: 'Placed', icon: '📝' },
  { label: 'Packed', icon: '📦' },
  { label: 'Out for Delivery', icon: '🚚' },
  { label: 'Delivered', icon: '✅' }
];

const AGENT = {
  name: 'Ravi Kumar',
  phone: '+91 98765 43210',
  photo: 'https://randomuser.me/api/portraits/men/32.jpg'
};

const USER_LOCATION = { lat: 28.6139, lng: 77.2090 }; // New Delhi
const AGENT_START = { lat: 28.62, lng: 77.21 };
const AGENT_END = USER_LOCATION;

function interpolateLocation(start, end, t) {
  return {
    lat: start.lat + (end.lat - start.lat) * t,
    lng: start.lng + (end.lng - start.lng) * t,
  };
}

export default function OrderTrackingDemo() {
  const [status, setStatus] = useState(0);
  const [agentLocation, setAgentLocation] = useState(AGENT_START);
  const [eta, setEta] = useState(20 * 60); // 20 min in seconds
  const mapRef = useRef();
  const agentMarkerRef = useRef();
  const userMarkerRef = useRef();
  const routeRef = useRef();

  // Simulate order status and agent movement
  useEffect(() => {
    let statusTimer, moveTimer, etaTimer;
    let t = 0;
    statusTimer = setInterval(() => {
      setStatus((s) => {
        if (s < 3) {
          toast.success(`Order status updated: ${ORDER_STATUSES[s+1].label}`);
          return s + 1;
        }
        clearInterval(statusTimer);
        return s;
      });
    }, 7000);
    moveTimer = setInterval(() => {
      t += 0.025;
      if (t > 1) t = 1;
      setAgentLocation(interpolateLocation(AGENT_START, AGENT_END, t));
      if (t === 1) clearInterval(moveTimer);
    }, 1000);
    etaTimer = setInterval(() => setEta((e) => (e > 0 ? e - 1 : 0)), 1000);
    return () => {
      clearInterval(statusTimer);
      clearInterval(moveTimer);
      clearInterval(etaTimer);
    };
  }, []);

  // Google Maps rendering with enhanced features
  useEffect(() => {
    if (!window.google) return;
    
    // Create map with enhanced styling
    const mapOptions = {
      center: agentLocation,
      zoom: 14,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [{ color: '#ffffff' }, { lightness: 17 }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#dedede' }, { lightness: 21 }]
        },
      ]
    };
    
    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    
    // User marker with info window
    const userInfoContent = `
      <div style="padding: 8px; max-width: 200px;">
        <h3 style="margin: 0 0 8px; color: #333; font-size: 14px;">Your Location</h3>
        <p style="margin: 0; color: #666; font-size: 12px;">Delivery Address</p>
      </div>
    `;
    
    const userInfoWindow = new window.google.maps.InfoWindow({
      content: userInfoContent
    });
    
    userMarkerRef.current = new window.google.maps.Marker({
      position: USER_LOCATION,
      map,
      label: 'You',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new window.google.maps.Size(40, 40)
      },
      animation: window.google.maps.Animation.DROP
    });
    
    userMarkerRef.current.addListener('click', () => {
      userInfoWindow.open(map, userMarkerRef.current);
    });
    
    // Agent marker with info window
    const agentInfoContent = `
      <div style="padding: 8px; max-width: 200px;">
        <h3 style="margin: 0 0 8px; color: #333; font-size: 14px;">${AGENT.name}</h3>
        <p style="margin: 0 0 4px; color: #666; font-size: 12px;">Delivery Agent</p>
        <p style="margin: 0; color: #666; font-size: 12px;">ETA: ${Math.floor(eta / 60)} min ${eta % 60} sec</p>
      </div>
    `;
    
    const agentInfoWindow = new window.google.maps.InfoWindow({
      content: agentInfoContent
    });
    
    agentMarkerRef.current = new window.google.maps.Marker({
      position: agentLocation,
      map,
      label: 'Agent',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new window.google.maps.Size(40, 40)
      },
      animation: window.google.maps.Animation.BOUNCE
    });
    
    agentMarkerRef.current.addListener('click', () => {
      agentInfoWindow.open(map, agentMarkerRef.current);
    });
    
    // Enhanced route line with animated dash
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 3
    };
    
    routeRef.current = new window.google.maps.Polyline({
      path: [agentLocation, USER_LOCATION],
      geodesic: true,
      strokeColor: '#7FB069',
      strokeOpacity: 0,
      strokeWeight: 4,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '15px'
      }],
      map
    });
    
    // Animate the dash
    let count = 0;
    window.setInterval(() => {
      count = (count + 1) % 200;
      const icons = routeRef.current.get('icons');
      icons[0].offset = (count / 2) + '%';
      routeRef.current.set('icons', icons);
    }, 50);
    
    // Add distance overlay
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(agentLocation);
    bounds.extend(USER_LOCATION);
    map.fitBounds(bounds);
    
    // Clean up on unmount
    return () => {
      userMarkerRef.current && userMarkerRef.current.setMap(null);
      agentMarkerRef.current && agentMarkerRef.current.setMap(null);
      routeRef.current && routeRef.current.setMap(null);
    };
  }, [agentLocation, eta]);

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-md">
      <Toaster />
      <OrderStatusStepper status={status} statuses={ORDER_STATUSES} />
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="flex-1 space-y-6">
          <DeliveryAgentCard agent={AGENT} />
          <ETA seconds={eta} />
        </div>
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow" style={{ height: 300 }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}