import React, {useState} from 'react';
import EntryPage from "./app/screens/index";
import CameraPage from './app/screens/camera';


export default function App() {
  const [shouldNavigate, setShouldNavigate] = useState(false);

  return (
    shouldNavigate ? <CameraPage /> : <EntryPage onNavigate={() => setShouldNavigate(true)} />
  );
}