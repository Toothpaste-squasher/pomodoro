import { createContext } from "react";

import { getSettings } from '../../../../backend/controllers/settingsController'

export const settingsContext = createContext(getSettings);
