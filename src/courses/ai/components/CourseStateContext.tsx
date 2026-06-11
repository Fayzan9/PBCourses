import React, { createContext, useContext, useState } from 'react';

type StateMap = { [key: string]: any };

interface CourseStateContextType {
  state: StateMap;
  setSlideState: (key: string, value: any) => void;
}

const CourseStateContext = createContext<CourseStateContextType | undefined>(undefined);

export const CourseStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StateMap>({});

  const setSlideState = (key: string, value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: typeof value === 'function' ? value(prev[key]) : value,
    }));
  };

  return (
    <CourseStateContext.Provider value={{ state, setSlideState }}>
      {children}
    </CourseStateContext.Provider>
  );
};

export function useSlideState<T>(key: string, initialValue: T | (() => T)): [T, (val: T | ((prev: T) => T)) => void] {
  const context = useContext(CourseStateContext);
  const getInitial = (): T => {
    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  };

  if (!context) {
    const [local, setLocal] = useState<T>(getInitial);
    return [local, setLocal];
  }

  const { state, setSlideState } = context;
  const value = key in state ? (state[key] as T) : getInitial();

  const setValue = (val: T | ((prev: T) => T)) => {
    setSlideState(key, val);
  };

  return [value, setValue];
}
