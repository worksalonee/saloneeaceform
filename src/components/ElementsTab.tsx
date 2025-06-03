import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { 
  AlignJustify, Calendar, Clock, FileText, Image, Link, Mail, 
  MapPin, Phone, Upload, Video, Type, ListChecks 
} from 'lucide-react';

interface ElementCardProps {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const ElementCard: React.FC<ElementCardProps> = ({ id, icon, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
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
      className="element-card mb-3"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-cyan-600">{icon}</div>
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
};

const ElementsTab: React.FC = () => {
  const elements = [
    { id: 'single-line', icon: <Type size={20} />, label: 'Single-line' },
    { id: 'multi-line', icon: <AlignJustify size={20} />, label: 'Multi-line' },
    { id: 'mobile', icon: <Phone size={20} />, label: 'Mobile' },
    { id: 'email', icon: <Mail size={20} />, label: 'Email' },
    { id: 'address', icon: <MapPin size={20} />, label: 'Address' },
    { id: 'date', icon: <Calendar size={20} />, label: 'Date' },
    { id: 'time', icon: <Clock size={20} />, label: 'Time' },
    { id: 'dropdown', icon: <ListChecks size={20} />, label: 'DropDown' },
    { id: 'radio', icon: <ListChecks size={20} />, label: 'Radio' },
    { id: 'upload-file', icon: <Upload size={20} />, label: 'Upload File' },
    { id: 'image', icon: <Image size={20} />, label: 'Image' },
    { id: 'video', icon: <Video size={20} />, label: 'Video' },
    { id: 'url', icon: <Link size={20} />, label: 'URL' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {elements.map((element) => (
        <ElementCard key={element.id} {...element} />
      ))}
    </div>
  );
};

export default ElementsTab;