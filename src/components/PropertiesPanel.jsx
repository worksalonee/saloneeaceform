import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { updateElementConfig } from '../store/formSlice';
import { togglePropertiesPanel } from '../store/uiSlice';
import { X, Plus, Trash2 } from 'lucide-react';

const PropertiesPanel = () => {
  const dispatch = useAppDispatch();
  const { sections, selectedElementId } = useAppSelector(state => state.form);
  
  // Find the selected element and its section
  let selectedElement = null;
  let sectionId = '';
  
  for (const section of sections) {
    const found = section.elements.find(e => e.id === selectedElementId);
    if (found) {
      selectedElement = found;
      sectionId = section.id;
      break;
    }
  }
  
  if (!selectedElement || selectedElement.type !== 'field') {
    return (
      <div className="h-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Properties</h3>
          <button
            onClick={() => dispatch(togglePropertiesPanel(false))}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-500">Select an element to edit its properties.</p>
      </div>
    );
  }
  
  const { config } = selectedElement;
  
  const handleConfigChange = (key, value) => {
    dispatch(updateElementConfig({
      sectionId,
      elementId: selectedElementId,
      config: { [key]: value }
    }));
  };
  
  const handleAddOption = () => {
    const newOptions = [...(config.options || []), `Option ${(config.options?.length || 0) + 1}`];
    handleConfigChange('options', newOptions);
  };
  
  const handleRemoveOption = (index) => {
    const newOptions = [...(config.options || [])];
    newOptions.splice(index, 1);
    handleConfigChange('options', newOptions);
  };
  
  const handleChangeOption = (index, value) => {
    const newOptions = [...(config.options || [])];
    newOptions[index] = value;
    handleConfigChange('options', newOptions);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Properties</h3>
        <button
          onClick={() => dispatch(togglePropertiesPanel(false))}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {/* Label */}
        <div>
          <label htmlFor="label" className="property-label">Label</label>
          <input
            id="label"
            type="text"
            value={config.label || ''}
            onChange={(e) => handleConfigChange('label', e.target.value)}
            className="property-input"
          />
        </div>
        
        {/* Placeholder */}
        <div>
          <label htmlFor="placeholder" className="property-label">Placeholder</label>
          <input
            id="placeholder"
            type="text"
            value={config.placeholder || ''}
            onChange={(e) => handleConfigChange('placeholder', e.target.value)}
            className="property-input"
          />
        </div>
        
        {/* Validations */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Validations</h4>
          
          <div className="flex items-center">
            <input
              id="required"
              type="checkbox"
              checked={config.required || false}
              onChange={(e) => handleConfigChange('required', e.target.checked)}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
              Required
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="minLength" className="property-label">Min Length</label>
              <input
                id="minLength"
                type="number"
                value={config.minLength || ''}
                onChange={(e) => handleConfigChange('minLength', parseInt(e.target.value) || '')}
                className="property-input"
              />
            </div>
            <div>
              <label htmlFor="maxLength" className="property-label">Max Length</label>
              <input
                id="maxLength"
                type="number"
                value={config.maxLength || ''}
                onChange={(e) => handleConfigChange('maxLength', parseInt(e.target.value) || '')}
                className="property-input"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="pattern" className="property-label">Pattern</label>
            <input
              id="pattern"
              type="text"
              value={config.pattern || ''}
              onChange={(e) => handleConfigChange('pattern', e.target.value)}
              className="property-input"
              placeholder="Enter Regular Expression here..."
            />
          </div>
        </div>
        
        {/* Options for Dropdown and Radio */}
        {(selectedElement.fieldType === 'dropdown' || selectedElement.fieldType === 'radio') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Options</h4>
              <button
                onClick={handleAddOption}
                className="p-1 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="space-y-2">
              {config.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleChangeOption(index, e.target.value)}
                    className="property-input"
                  />
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;