import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'elements',
  isPreviewMode: false,
  isJSONViewerOpen: false,
  propertiesPanelOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    togglePreviewMode: (state) => {
      state.isPreviewMode = !state.isPreviewMode;
      if (state.isPreviewMode) {
        state.isJSONViewerOpen = false;
      }
    },
    toggleJSONViewer: (state) => {
      state.isJSONViewerOpen = !state.isJSONViewerOpen;
      if (state.isJSONViewerOpen) {
        state.isPreviewMode = false;
      }
    },
    togglePropertiesPanel: (state, action) => {
      if (action.payload !== undefined) {
        state.propertiesPanelOpen = action.payload;
      } else {
        state.propertiesPanelOpen = !state.propertiesPanelOpen;
      }
    },
  },
});

export const { 
  setActiveTab, 
  togglePreviewMode, 
  toggleJSONViewer, 
  togglePropertiesPanel 
} = uiSlice.actions;

export default uiSlice.reducer;