import {
  useSelector,
  useDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';

import type { RootState, AppDispatch } from '../services/reducers';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
