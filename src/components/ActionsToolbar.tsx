import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { togglePreviewMode, toggleJSONViewer } from '../store/uiSlice';
import { Eye, Code, X } from 'lucide-react';

const ActionsToolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isPreviewMode, isJSONViewerOpen } = useAppSelector(state => state.ui);

  return (
    <div className="bg-white rounded-md shadow-sm p-2 mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => dispatch(togglePreviewMode())}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
            isPreviewMode 
              ? 'bg-cyan-100 text-cyan-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {isPreviewMode ? <X size={16} /> : <Eye size={16} />}
          <span>{isPreviewMode ? 'Exit Preview' : 'Preview'}</span>
        </button>
        
        <button
          onClick={() => dispatch(toggleJSONViewer())}
          className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
            isJSONViewerOpen 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {isJSONViewerOpen ? <X size={16} /> : <Code size={16} />}
          <span>{isJSONViewerOpen ? 'Exit JSON' : 'JSON'}</span>
        </button>
      </div>
      
      <div>
        {/* <button className="px-3 py-1.5 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors">
          Save Form
        </button> */}
      </div>
    </div>
  );
};

export default ActionsToolbar;