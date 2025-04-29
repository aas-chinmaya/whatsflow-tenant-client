// src/redux/slices/campaignSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstance} from '@/lib/axiosInstance';

// CREATE CAMPAIGN
export const createCampaign = createAsyncThunk(
  'campaign/createCampaign',
  async (campaignData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/createcampaigns', campaignData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET ALL CAMPAIGNS
export const getAllCampaigns = createAsyncThunk(
  'campaign/getAllCampaigns',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/getallcampaigns');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// UPDATE STATUS OF ONE CAMPAIGN
export const updateCampaignStatusById = createAsyncThunk(
  'campaign/updateCampaignStatusById',
  async (campaignId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/campaigns/${campaignId}/update-status`);
      return res.data.campaign;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// AUTO UPDATE ALL CAMPAIGNS
export const autoUpdateCampaignStatuses = createAsyncThunk(
  'campaign/autoUpdateCampaignStatuses',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put('/campaigns/update-status/all');
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// CAMPAIGN SLICE
const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    campaigns: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearCampaignState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns.unshift(action.payload);
        state.success = 'Campaign created successfully';
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(getAllCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCampaignStatusById.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.campaigns.findIndex(c => c.campaignId === updated.campaignId);
        if (index !== -1) {
          state.campaigns[index] = updated;
        }
      })

      .addCase(autoUpdateCampaignStatuses.fulfilled, (state, action) => {
        state.success = action.payload;
      });
  },
});

export const { clearCampaignState } = campaignSlice.actions;
export default campaignSlice.reducer;
