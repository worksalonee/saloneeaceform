import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { addSection, selectElement } from '../store/formSlice';
import FormElement from './FormElement';
import { Plus } from 'lucide-react';

const Canvas = () => {
  const dispatch = useAppDispatch();
  const { sections, title } = useAppSelector(state => state.form);
  
  const handleAddSection = () => {
    dispatch(addSection());
  };

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      
      {sections.map(section => (
        <Section 
          key={section.id} 
          id={section.id} 
          title={section.title} 
          elements={section.elements} 
        />
      ))}
      
      <button 
        onClick={handleAddSection}
        className="mt-4 flex items-center justify-center gap-2 text-cyan-600 py-2 px-4 rounded-md border border-dashed border-cyan-300 hover:bg-cyan-50 transition-colors"
      >
        <Plus size={16} /> Add Section
      </button>
    </div>
  );
};

const Section = ({ id, title, elements }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${id}`,
  });
  
  const dispatch = useAppDispatch();
  const selectedElementId = useAppSelector(state => state.form.selectedElementId);
  
  return (
    <div className="mb-6">
      <div className="bg-cyan-600 text-white py-2 px-4 rounded-t-md font-medium">
        {title}
      </div>
      
      <div 
        ref={setNodeRef}
        className={`droppable-area p-4 ${isOver ? 'active' : ''}`}
        onClick={() => dispatch(selectElement(null))}
      >
        {elements.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>Drag and drop elements here</p>
          </div>
        )}
        
        {elements.map(element => (
          <FormElement 
            key={element.id} 
            element={element}
            sectionId={id}
            isSelected={selectedElementId === element.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;