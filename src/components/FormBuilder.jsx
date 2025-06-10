import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { addElement, selectElement } from '../store/formSlice';
import { togglePropertiesPanel } from '../store/uiSlice';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import ActionsToolbar from './ActionsToolbar';
import JSONViewer from './JSONViewer';
import FormPreview from './FormPreview';

const FormBuilder = () => {
  const dispatch = useAppDispatch();
  const { isPreviewMode, isJSONViewerOpen, propertiesPanelOpen } = useAppSelector(state => state.ui);
  const { selectedElementId } = useAppSelector(state => state.form);

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.id.toString().includes('draggable-')) {
      const elementType = active.id.toString().replace('draggable-', '');
      dispatch(selectElement(null));
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id.toString();
    const overId = over.id.toString();
    
    // Handle dragging from sidebar to canvas
    if (activeId.includes('draggable-') && overId.includes('droppable-')) {
      const elementType = activeId.replace('draggable-', '');
      const sectionId = overId.replace('droppable-', '');
      
      if (elementType.includes('layout-')) {
        // This is a layout element
        const layoutType = elementType.replace('layout-', '');
        dispatch(addElement({ sectionId, elementType: 'layout', layout: layoutType }));
      } else {
        // This is a form field element
        dispatch(addElement({ sectionId, elementType }));
      }
      
      dispatch(togglePropertiesPanel(true));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)] gap-4 overflow-hidden">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="w-full md:w-64 lg:w-72 bg-cyan-50 rounded-lg shadow-md overflow-hidden flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-grow overflow-hidden flex flex-col">
          <ActionsToolbar />
          
          <div className="flex-grow overflow-auto bg-white rounded-lg shadow-md">
            {isPreviewMode ? (
              <FormPreview />
            ) : isJSONViewerOpen ? (
              <JSONViewer />
            ) : (
              <Canvas />
            )}
          </div>
        </div>
        
        {selectedElementId && propertiesPanelOpen && (
          <div className="w-full md:w-72 lg:w-80 bg-white rounded-lg shadow-md overflow-auto flex-shrink-0">
            <PropertiesPanel />
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default FormBuilder;