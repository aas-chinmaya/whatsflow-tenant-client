// src/redux/features/agent/agentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstance} from '@/lib/axiosInstance';

// 🔁 GET all agents
export const fetchAgents = createAsyncThunk('agent/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/getallagents');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// 🔁 GET agent by ID
export const fetchAgentById = createAsyncThunk('agent/fetchById', async (agentId, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/getallagentbyid/${agentId}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// ➕ CREATE agent
export const createAgent = createAsyncThunk('agent/create', async (agentData, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/createagent', agentData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// ✏️ UPDATE agent by ID
export const updateAgent = createAsyncThunk('agent/update', async ({ agentId, updatedData }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/updateagent/${agentId}`, updatedData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// 🗑️ DELETE agent (soft delete)
export const deleteAgent = createAsyncThunk('agent/delete', async (agentId, thunkAPI) => {
  try {
    const res = await axiosInstance.delete(`/deleteagent/${agentId}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// 🧠 Slice
const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    agents: [],
    singleAgent: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearAgentMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch One
      .addCase(fetchAgentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgentById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleAgent = action.payload;
      })
      .addCase(fetchAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createAgent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAgent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAgent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAgentMessages } = agentSlice.actions;
export default agentSlice.reducer;
