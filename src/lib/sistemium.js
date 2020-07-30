import { authorize as authorizeJSDataStore } from 'sistemium-telegram/jsdata/store';

authorizeJSDataStore(localStorage.getItem('stv.authorization'));
