import { useContext } from 'react';
import CookieAuthContext from './CookieAuthContext';
export default function useCookieAuth() { return useContext(CookieAuthContext); }
