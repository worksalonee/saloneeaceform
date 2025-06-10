import React from 'react';
import { useAppDispatch } from '../hooks/store';
import { removeElement, selectElement } from '../store/formSlice';
import { togglePropertiesPanel } from '../store/uiSlice';
import { Trash2 } from 'lucide-react';

const FormElement = ({ element, sectionId, isSelected }) => {
  const dispatch = useAppDispatch();

  const handleSelect = (e) => {
    e.stopPropagation();
    dispatch(selectElement(element.id));
    dispatch(togglePropertiesPanel(true));
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeElement({ sectionId, elementId: element.id }));
    dispatch(togglePropertiesPanel(false));
  };

  // Render layout element
  if (element.type === 'layout') {
    return (
      <div 
        className={`relative mb-4 ${isSelected ? 'ring-2 ring-cyan-500' : ''}`}
        onClick={handleSelect}
      >
        <div className="absolute top-2 right-2 z-10 flex space-x-1">
          <button 
            onClick={handleRemove}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex flex-wrap -mx-2">
          {element.layout.columns.map((column, index) => (
            <div 
              key={index} 
              className="px-2 mb-4" 
              style={{ width: `${column.width}%` }}
            >
              <div className="border border-gray-200 rounded-md p-2 min-h-20 bg-gray-50">
                {column.elements.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    <p>Drop elements here</p>
                  </div>
                ) : (
                  // Here we would recursively render the elements in this column
                  <p>Column content goes here</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render field element
  return (
    <div 
      className={`relative mb-4 p-4 border border-gray-200 rounded-md bg-white ${isSelected ? 'ring-2 ring-cyan-500' : ''}`}
      onClick={handleSelect}
    >
      <div className="absolute top-2 right-2 z-10 flex space-x-1">
        <button 
          onClick={handleRemove}
          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {element.config.label}
          {element.config.required && <span className="text-red-500">*</span>}
        </label>
      </div>
      
      {/* Render different input types based on fieldType */}
      {element.fieldType === 'single-line' && (
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder={element.config.placeholder}
          disabled
        />
      )}
      
      {element.fieldType === 'multi-line' && (
        <textarea 
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder={element.config.placeholder}
          rows={3}
          disabled
        />
      )}
      
      {element.fieldType === 'email' && (
        <input 
          type="email" 
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder={element.config.placeholder}
          disabled
        />
      )}
      
      {element.fieldType === 'date' && (
        <input 
          type="date" 
          className="w-full p-2 border border-gray-300 rounded-md"
          disabled
        />
      )}
      
      {element.fieldType === 'time' && (
        <input 
          type="time" 
          className="w-full p-2 border border-gray-300 rounded-md"
          disabled
        />
      )}
      
      {element.fieldType === 'mobile' && (
        <input 
          type="tel" 
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder={element.config.placeholder}
          disabled
        />
      )}
      
      {element.fieldType === 'dropdown' && (
        <select 
          className="w-full p-2 border border-gray-300 rounded-md"
          disabled
        >
          <option value="">Select an option</option>
          {element.config.options?.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      )}
      
      {element.fieldType === 'radio' && (
        <div className="space-y-2">
          {element.config.options?.map((option, index) => (
            <div key={index} className="flex items-center">
              <input 
                type="radio" 
                id={`radio-${element.id}-${index}`}
                name={`radio-${element.id}`}
                className="h-4 w-4 text-cyan-600 border-gray-300"
                disabled
              />
              <label 
                htmlFor={`radio-${element.id}-${index}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
      
      {element.fieldType === 'upload-file' && (
        <input 
          type="file" 
          className="w-full p-2 border border-gray-300 rounded-md"
          disabled
        />
      )}
      
      {element.fieldType === 'url' && (
        <input 
          type="url" 
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder={element.config.placeholder}
          disabled
        />
      )}
      
      {element.fieldType === 'address' && (
        <div className="space-y-2">
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Street Address"
            disabled
          />
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="City"
              disabled
            />
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="State/Province"
              disabled
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="ZIP/Postal Code"
              disabled
            />
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Country"
              disabled
            />
          </div>
        </div>
      )}
      
      {element.fieldType === 'image' && (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <p className="text-gray-500">Image Upload</p>
        </div>
      )}
      
      {element.fieldType === 'video' && (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <p className="text-gray-500">Video Upload</p>
        </div>
      )}
    </div>
  );
};

export default FormElement;