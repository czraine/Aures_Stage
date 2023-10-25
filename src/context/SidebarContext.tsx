import React, { FC, useState, createContext, ReactNode } from 'react';

type SidebarContextValue = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

type SidebarProviderProps = {
  children: ReactNode; // Specify the type of children prop
};

export const SidebarContext = createContext<SidebarContextValue>(
  {} as SidebarContextValue
);

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
