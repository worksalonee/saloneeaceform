import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { 
  FormElement, 
  FormElementType, 
  FormLayout, 
  FormSection,
  FormElementConfig,
  LayoutType 
} from '../types/form';

interface FormState {
  title: string;
  sections: FormSection[];
  nextSectionId: number;
  selectedElementId: string | null;
}

const initialState: FormState = {
  title: 'Form',
  sections: [
    {
      id: 'section-1',
      title: 'Section 1',
      elements: [],
    },
  ],
  nextSectionId: 2,
  selectedElementId: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addSection: (state) => {
      const newSectionId = `section-${state.nextSectionId}`;
      state.sections.push({
        id: newSectionId,
        title: `Section ${state.nextSectionId}`,
        elements: [],
      });
      state.nextSectionId += 1;
    },
    updateSectionTitle: (state, action: PayloadAction<{ sectionId: string; title: string }>) => {
      const { sectionId, title } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);
      if (section) {
        section.title = title;
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      const sectionId = action.payload;
      state.sections = state.sections.filter(s => s.id !== sectionId);
    },
    addElement: (state, action: PayloadAction<{ 
      sectionId: string; 
      elementType: FormElementType;
      layout?: LayoutType;
    }>) => {
      const { sectionId, elementType, layout } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);
      
      if (!section) return;
      
      const id = nanoid();
      
      let newElement: FormElement;
      
      if (layout) {
        // This is a layout element
        newElement = {
          id,
          type: 'layout',
          layout: {
            type: layout,
            columns: [],
          },
        };
        
        // Add empty columns based on layout type
        const columns = [];
        if (layout === '50-50') {
          columns.push({ width: 50, elements: [] });
          columns.push({ width: 50, elements: [] });
        } else if (layout === '25-25-25-25') {
          for (let i = 0; i < 4; i++) {
            columns.push({ width: 25, elements: [] });
          }
        } else if (layout === '33-33-33') {
          for (let i = 0; i < 3; i++) {
            columns.push({ width: 33.33, elements: [] });
          }
        } else if (layout === '25-75') {
          columns.push({ width: 25, elements: [] });
          columns.push({ width: 75, elements: [] });
        }
        
        (newElement as FormLayout).layout.columns = columns;
      } else {
        // This is a form field element
        const config: FormElementConfig = {
          label: elementType.charAt(0).toUpperCase() + elementType.slice(1),
          placeholder: `Enter ${elementType} here...`,
          required: false,
        };
        
        // Add specific properties based on element type
        if (elementType === 'dropdown' || elementType === 'radio') {
          config.options = ['Option 1', 'Option 2', 'Option 3'];
        }
        
        newElement = {
          id,
          type: 'field',
          fieldType: elementType,
          config,
        };
      }
      
      section.elements.push(newElement);
      state.selectedElementId = id;
    },
    moveElement: (state, action: PayloadAction<{
      sourceId: string;
      destinationId: string;
      sourceIndex: number;
      destinationIndex: number;
    }>) => {
      const { sourceId, destinationId, sourceIndex, destinationIndex } = action.payload;
      
      // Find source section or column
      const sourceSectionIndex = state.sections.findIndex(s => s.id === sourceId);
      if (sourceSectionIndex !== -1) {
        const movedElement = state.sections[sourceSectionIndex].elements[sourceIndex];
        
        // Remove from source
        state.sections[sourceSectionIndex].elements.splice(sourceIndex, 1);
        
        // Find destination section or column
        const destSectionIndex = state.sections.findIndex(s => s.id === destinationId);
        if (destSectionIndex !== -1) {
          // Insert at destination
          state.sections[destSectionIndex].elements.splice(destinationIndex, 0, movedElement);
        }
      } else {
        // Handle movement within layout columns (more complex)
        // This would need to recursively search through all sections and their layout elements
        // to find the right columns - simplified for this example
      }
    },
    removeElement: (state, action: PayloadAction<{ sectionId: string; elementId: string }>) => {
      const { sectionId, elementId } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);
      
      if (section) {
        section.elements = section.elements.filter(e => e.id !== elementId);
      }
      
      if (state.selectedElementId === elementId) {
        state.selectedElementId = null;
      }
    },
    updateElementConfig: (state, action: PayloadAction<{
      sectionId: string;
      elementId: string;
      config: Partial<FormElementConfig>;
    }>) => {
      const { sectionId, elementId, config } = action.payload;
      const section = state.sections.find(s => s.id === sectionId);
      
      if (section) {
        const element = section.elements.find(e => e.id === elementId);
        
        if (element && element.type === 'field') {
          element.config = { ...element.config, ...config };
        }
      }
    },
    selectElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload;
    },
  },
});

export const { 
  setFormTitle, 
  addSection, 
  updateSectionTitle, 
  removeSection, 
  addElement, 
  moveElement, 
  removeElement, 
  updateElementConfig, 
  selectElement 
} = formSlice.actions;

export default formSlice.reducer;