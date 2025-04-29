import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance2 } from '@/lib/axiosInstance'; // Assuming axiosInstance2 is exported from a file

// Async thunk to fetch the templates from the Facebook Graph API
export const fetchMetaTemplates = createAsyncThunk(
  'templates/fetchMetaTemplates',
  async () => {
    const response = await axiosInstance2.get('/message_templates');
    return response.data.data; // Returning the data from the API
  }
);

const templateSlice = createSlice({
  name: 'templates',
  initialState: {
    metaTemplates: [],
    loading: false,
    error: null,
    searchTerm: '',
    filters: {
      status: 'all',
      type: 'all',
      language: 'all',
    },
    selectedTemplate: null,
    languages: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        type: 'all',
        language: 'all',
      };
      state.searchTerm = '';
    },
    setSelectedTemplate: (state, action) => {
      const template = action.payload;
      state.selectedTemplate = state.selectedTemplate?.id === template.id ? null : template;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetaTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMetaTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.metaTemplates = action.payload;
        // Extract unique languages for filter dropdown
        const uniqueLanguages = [...new Set(action.payload.map(template => template.language))];
        state.languages = uniqueLanguages;
      })
      .addCase(fetchMetaTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to load templates. Please try again later.';
      });
  },
});

export const { setSearchTerm, setFilters, clearFilters, setSelectedTemplate } = templateSlice.actions;

export default templateSlice.reducer;
