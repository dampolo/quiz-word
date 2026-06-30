import { createContext, useContext } from 'react';


const BASE_URL = "http://127.0.0.1:8000/api/";

// React nutzt diesen Wert immer dann, wenn KEIN Provider existiert
const ApiContext = createContext(BASE_URL);

 
export default function useApi() {
  return useContext(ApiContext);
}