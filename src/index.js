import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // Redux Provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // React Query Provider
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Create a new QueryClient instance for React Query
const queryClient = new QueryClient();

// Get the root DOM node
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the entire app in both providers
root.render(
  
    <QueryClientProvider client={queryClient}>  {/* React Query Provider */}
    <AuthProvider>
    <App />
    </AuthProvider>
      
    </QueryClientProvider>

);
