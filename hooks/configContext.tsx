import React, { createContext, useContext, useReducer, useState } from 'react';

// const ConfigContext = createContext('en');
const ConfigContext = createContext({
    lang: 'en',
    setLang: (lang: string) => {},
    mode: 'base',
    setMode: (mode: string) => {}
});


export const ConfigProvider = ({ children }: any) => {
    const [lang, setLang] = useState('en');
    const [mode, setMode] = useState('base');

  return (
    <ConfigContext.Provider value={{
        lang: lang,
        setLang: (p) => {
            setLang(p);
        },
        mode: mode,
        setMode: (p) => {
            setMode(p);
        },
    }} >
      {children}
    </ConfigContext.Provider>
  );
};

export const useTaskContext = () => useContext(ConfigContext);