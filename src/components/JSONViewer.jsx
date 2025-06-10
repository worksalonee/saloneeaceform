import React from 'react';
import { useAppSelector } from '../hooks/store';

const JSONViewer = () => {
  const form = useAppSelector(state => state.form);
  
  // Transform the form state into a cleaner JSON representation
  const formJson = {
    title: form.title,
    sections: form.sections.map(section => ({
      id: section.id,
      title: section.title,
      elements: section.elements.map(element => {
        if (element.type === 'field') {
          return {
            id: element.id,
            type: element.fieldType,
            config: element.config,
          };
        } else {
          return {
            id: element.id,
            type: 'layout',
            layout: element.layout,
          };
        }
      }),
    })),
  };
  
  const jsonString = JSON.stringify(formJson, null, 2);

  return (
    <div className="h-full p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Form JSON</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};

export default JSONViewer;