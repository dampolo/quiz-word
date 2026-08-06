import { createContext, useContext } from 'react';


const BASE_URL = import.meta.env.VITE_API_URL;

// React nutzt diesen Wert immer dann, wenn KEIN Provider existiert
const ApiContext = createContext(BASE_URL);

 
export default function useApi() {
  return useContext(ApiContext);
}