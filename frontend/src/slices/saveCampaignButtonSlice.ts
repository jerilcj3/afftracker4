import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface saveCampaignButtonState {
  disabled: boolean;
};

const initialState: saveCampaignButtonState = {
  disabled: false
}

const saveCampaignButtonSlice = createSlice({
  name: 'saveCampaignButton',
  initialState,
  reducers: {
    saveCampaignButtonClicked: (state) => {
      state.disabled = !state.disabled;
    }
  }
});

// Export the actions and selector from the slice
export const { saveCampaignButtonClicked } = saveCampaignButtonSlice.actions;

export default saveCampaignButtonSlice.reducer;