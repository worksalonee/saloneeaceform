import React from 'react';
import { useAppSelector } from '../hooks/store';

const FormPreview: React.FC = () => {
  const { sections, title } = useAppSelector(state => state.form);
  
  const renderField = (element: any) => {
    const { fieldType, config } = element;
    
    switch (fieldType) {
      case 'single-line':
        return (
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={config.placeholder}
          />
        );
      case 'multi-line':
        return (
          <textarea 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={config.placeholder}
            rows={3}
          />
        );
      case 'email':
        return (
          <input 
            type="email" 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={config.placeholder}
          />
        );
      case 'date':
        return (
          <input 
            type="date" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        );
      case 'time':
        return (
          <input 
            type="time" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        );
      case 'mobile':
        return (
          <input 
            type="tel" 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={config.placeholder}
          />
        );
      case 'dropdown':
        return (
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select an option</option>
            {config.options?.map((option: string, index: number) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {config.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center">
                <input 
                  type="radio" 
                  id={`radio-${element.id}-${index}`}
                  name={`radio-${element.id}`}
                  className="h-4 w-4 text-cyan-600 border-gray-300"
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
        );
      case 'upload-file':
        return (
          <input 
            type="file" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        );
      case 'url':
        return (
          <input 
            type="url" 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={config.placeholder}
          />
        );
      case 'address':
        return (
          <div className="space-y-2">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Street Address"
            />
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="City"
              />
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="State/Province"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ZIP/Postal Code"
              />
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Country"
              />
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <p className="text-gray-500">Image Upload</p>
          </div>
        );
      case 'video':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <p className="text-gray-500">Video Upload</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full p-6 overflow-y-auto max-w-3xl mx-auto bg-white rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h2>
      
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className="mb-8">
          <div className="bg-cyan-600 text-white py-2 px-4 rounded-t-md font-medium">
            {section.title}
          </div>
          
          <div className="border border-gray-200 rounded-b-md p-4 bg-white">
            {section.elements.map((element, elementIndex) => {
              if (element.type === 'layout') {
                return (
                  <div key={element.id} className="mb-4">
                    <div className="flex flex-wrap -mx-2">
                      {element.layout.columns.map((column, columnIndex) => (
                        <div 
                          key={columnIndex} 
                          className="px-2 mb-4" 
                          style={{ width: `${column.width}%` }}
                        >
                          <div className="border border-gray-200 rounded-md p-2 min-h-20 bg-gray-50">
                            {column.elements.length === 0 ? (
                              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                <p>Empty column</p>
                              </div>
                            ) : (
                              // Render column elements here
                              <p>Column content</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={element.id} className="mb-4">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {element.config.label}
                      {element.config.required && <span className="text-red-500">*</span>}
                    </label>
                  </div>
                  {renderField(element)}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormPreview;