import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Home, RefreshCw, X, ChevronRight, Clock, MapPin } from 'lucide-react';

const STATUS_COLORS = {
  Delivered: 'bg-green-100 text-green-700 border-green-200',
  'Out for Delivery': 'bg-blue-100 text-blue-700 border-blue-200',
  Packed: 'bg-orange-100 text-orange-700 border-orange-200',
  Placed: 'bg-gray-100 text-gray-700 border-gray-200',
};

// Farm location (origin point)
const FARM_LOCATION = { lat: 28.5355, lng: 77.3910 }; // Example farm location

// User locations for different orders
const USER_LOCATIONS = {
  'ORD12345': { lat: 28.6139, lng: 77.2090 }, // New Delhi
  'ORD12344': { lat: 28.5245, lng: 77.1855 }, // Gurugram
  'ORD12343': { lat: 28.4595, lng: 77.0266 }, // Gurugram South
  'ORD12342': { lat: 28.5183, lng: 77.2795 }  // Noida
};

// Order Progress Tracker Component
const OrderProgressTracker = ({ status }) => {
  const steps = ['Placed', 'Packed', 'Out for Delivery', 'Delivered'];
  const currentStep = steps.indexOf(status);
  
  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isActive = index === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center relative">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center z-10
                ${isCompleted ? 'bg-dairy-green text-white' : 'bg-gray-200 text-gray-500'}
                ${isActive ? 'ring-2 ring-dairy-green ring-offset-2' : ''}
              `}>
                {index === 0 && <Clock size={14} />}
                {index === 1 && <Package size={14} />}
                {index === 2 && <Truck size={14} />}
                {index === 3 && <Home size={14} />}
              </div>
              <div className="text-xs mt-1 font-medium text-center w-16 truncate">
                {step}
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute top-4 left-8 w-[calc(100%-16px)] h-0.5 -translate-y-1/2 ${isCompleted && index < currentStep ? 'bg-dairy-green' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Order Tracking Map Component
const OrderTrackingMap = ({ orderId }) => {
  const mapRef = useRef(null);
  const farmMarkerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const routeRef = useRef(null);
  
  useEffect(() => {
    if (!window.google || !mapRef.current) return;
    
    const userLocation = USER_LOCATIONS[orderId] || { lat: 28.6139, lng: 77.2090 }; // Default to New Delhi if not found
    
    // Create map with styling
    const mapOptions = {
      center: { lat: (FARM_LOCATION.lat + userLocation.lat) / 2, lng: (FARM_LOCATION.lng + userLocation.lng) / 2 },
      zoom: 11,
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
        }
      ]
    };
    
    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    
    // Farm marker with info window
    const farmInfoContent = `
      <div style="padding: 8px; max-width: 200px;">
        <h3 style="margin: 0 0 8px; color: #333; font-size: 14px;">MooMagic Farm</h3>
        <p style="margin: 0; color: #666; font-size: 12px;">Order Origin</p>
      </div>
    `;
    
    const farmInfoWindow = new window.google.maps.InfoWindow({
      content: farmInfoContent
    });
    
    farmMarkerRef.current = new window.google.maps.Marker({
      position: FARM_LOCATION,
      map,
      label: 'Farm',
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new window.google.maps.Size(40, 40)
      },
      animation: window.google.maps.Animation.DROP
    });
    
    farmMarkerRef.current.addListener('click', () => {
      farmInfoWindow.open(map, farmMarkerRef.current);
    });
    
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
      position: userLocation,
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
    
    // Route line with animated dash
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 3
    };
    
    routeRef.current = new window.google.maps.Polyline({
      path: [FARM_LOCATION, userLocation],
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
    
    // Fit bounds to show both markers
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(FARM_LOCATION);
    bounds.extend(userLocation);
    map.fitBounds(bounds);
    
    // Clean up on unmount
    return () => {
      farmMarkerRef.current && farmMarkerRef.current.setMap(null);
      userMarkerRef.current && userMarkerRef.current.setMap(null);
      routeRef.current && routeRef.current.setMap(null);
    };
  }, [orderId]);
  
  return (
    <div className="mt-4">
      <h4 className="font-medium text-sm text-gray-500 mb-2">Order Tracking</h4>
      <div className="rounded-xl overflow-hidden shadow-md" style={{ height: 300 }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>Farm Location</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span>Delivery Location</span>
        </div>
      </div>
    </div>
  );
};

const MOCK_ORDERS = [
  {
    id: 'ORD12345',
    products: [
      { name: 'A2 Milk', image: 'https://images.unsplash.com/photo-1601924638867-3ec5d1c9b79f', qty: 2 },
      { name: 'Ghee', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', qty: 1 },
    ],
    date: '2024-06-01 10:30',
    total: 499,
    status: 'Out for Delivery',
    eta: '15 min',
  },
  {
    id: 'ORD12344',
    products: [
      { name: 'Curd', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', qty: 3 },
    ],
    date: '2024-05-28 18:10',
    total: 180,
    status: 'Delivered',
    eta: null,
  },
  {
    id: 'ORD12343',
    products: [
      { name: 'Paneer', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', qty: 1 },
      { name: 'Butter', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', qty: 2 },
    ],
    date: '2024-05-25 14:45',
    total: 320,
    status: 'Packed',
    eta: null,
  },
  {
    id: 'ORD12342',
    products: [
      { name: 'Milk', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', qty: 4 },
    ],
    date: '2024-05-20 09:20',
    total: 200,
    status: 'Placed',
    eta: null,
  },
];

const statusOptions = ['All', 'Placed', 'Packed', 'Out for Delivery', 'Delivered'];

export default function MyOrdersPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  const filtered = MOCK_ORDERS.filter(order =>
    (filter === 'All' || order.status === filter) &&
    (search === '' || order.id.toLowerCase().includes(search.toLowerCase()))
  );
  
  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  return (
    <section id="my-orders" className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-dairy-brown">My Orders</h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Order ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 pl-10 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-white shadow-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-white shadow-sm"
            >
              {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        
        <div className="grid gap-6">
          {filtered.map(order => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-dairy-green/10 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Order Header */}
              <div 
                className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex-1 flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex gap-2">
                    {order.products.map((p, i) => (
                      <div key={i} className="relative group">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-16 h-16 rounded-lg object-cover border-2 border-dairy-cream shadow-sm" 
                        />
                        <div className="absolute -top-2 -right-2 bg-dairy-green text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {p.qty}
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-medium px-1">{p.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-lg text-dairy-brown">Order #{order.id}</div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm">{order.date}</div>
                    <div className="text-gray-700 text-sm mt-1 hidden md:block">
                      {order.products.map((p, i) => (
                        <span key={i}>{p.qty}x {p.name}{i < order.products.length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                  <div className="font-bold text-dairy-green text-lg">₹{order.total}</div>
                  <div className="flex items-center gap-2">
                    {order.eta && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        <Clock size={12} />
                        <span>ETA: {order.eta}</span>
                      </div>
                    )}
                    <motion.div
                      animate={{ rotate: expandedOrder === order.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={20} className="text-gray-400" />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Order Details (Expanded) */}
              {expandedOrder === order.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100 px-4 md:px-6 pb-4 md:pb-6"
                >
                  {/* Order Progress Tracker */}
                  <OrderProgressTracker status={order.status} />
                  
                  {/* Product Details */}
                  <div className="mt-4 space-y-3">
                    <h4 className="font-medium text-sm text-gray-500">Order Details</h4>
                    {order.products.map((product, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-dairy-cream/30">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 rounded-md object-cover" 
                        />
                        <div className="flex-1">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">Qty: {product.qty}</div>
                        </div>
                        <div className="font-medium text-dairy-green">
                          ₹{(product.qty * (order.total / order.products.reduce((sum, p) => sum + p.qty, 0))).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Tracking Map - Only show for Packed status */}
                  {order.status === 'Packed' && (
                    <OrderTrackingMap orderId={order.id} />
                  )}
                  
                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Placed', 'Packed', 'Out for Delivery'].includes(order.status) && (
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 bg-dairy-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-dairy-green/90 transition-colors"
                      >
                        <Truck size={16} />
                        Track Order
                      </motion.button>
                    )}
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 bg-dairy-cream text-dairy-brown px-4 py-2 rounded-lg text-sm font-medium hover:bg-dairy-cream/80 transition-colors"
                    >
                      <RefreshCw size={16} />
                      Reorder
                    </motion.button>
                    
                    {order.status === 'Placed' && (
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        <X size={16} />
                        Cancel Order
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
          
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-gray-400 mb-3">
                <Package size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}