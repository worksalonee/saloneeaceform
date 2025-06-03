import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setActiveTab } from '../store/uiSlice';
import ElementsTab from './ElementsTab';
import LayoutsTab from './LayoutsTab';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector(state => state.ui);

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-cyan-100">
        <button
          className={`tab-button ${activeTab === 'elements' ? 'active' : ''}`}
          onClick={() => dispatch(setActiveTab('elements'))}
        >
          Elements
        </button>
        <button
          className={`tab-button ${activeTab === 'layouts' ? 'active' : ''}`}
          onClick={() => dispatch(setActiveTab('layouts'))}
        >
          Layouts
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {activeTab === 'elements' ? <ElementsTab /> : <LayoutsTab />}
      </div>
    </div>
  );
};

export default Sidebar;