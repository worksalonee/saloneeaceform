import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const LayoutCard = ({ id, label, columns }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-layout-${id}`,
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="layout-card mb-3"
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 h-8">
          {columns.map((width, index) => (
            <div 
              key={index}
              className="bg-blue-100 rounded"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};

const LayoutsTab = () => {
  const layouts = [
    { id: '50-50', label: '50% - 50%', columns: [50, 50] },
    { id: '25-25-25-25', label: '25% - 25% - 25% - 25%', columns: [25, 25, 25, 25] },
    { id: '33-33-33', label: '33.3% - 33.3% - 33.3%', columns: [33.33, 33.33, 33.33] },
    { id: '25-75', label: '25% - 75%', columns: [25, 75] },
  ];

  return (
    <div className="space-y-3">
      {layouts.map((layout) => (
        <LayoutCard key={layout.id} {...layout} />
      ))}
    </div>
  );
};

export default LayoutsTab;