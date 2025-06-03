export type FormElementType = 
  | 'single-line' 
  | 'multi-line' 
  | 'mobile' 
  | 'email' 
  | 'address' 
  | 'date' 
  | 'time' 
  | 'dropdown' 
  | 'radio' 
  | 'upload-file' 
  | 'image' 
  | 'video' 
  | 'url';

export type LayoutType = '50-50' | '25-25-25-25' | '33-33-33' | '25-75';

export interface FormElementConfig {
  label: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  options?: string[];
  [key: string]: any;
}

export interface FormField {
  id: string;
  type: 'field';
  fieldType: FormElementType;
  config: FormElementConfig;
}

export interface LayoutColumn {
  width: number;
  elements: FormElement[];
}

export interface FormLayout {
  id: string;
  type: 'layout';
  layout: {
    type: LayoutType;
    columns: LayoutColumn[];
  };
}

export type FormElement = FormField | FormLayout;

export interface FormSection {
  id: string;
  title: string;
  elements: FormElement[];
}

export interface FormValue {
  [key: string]: any;
}