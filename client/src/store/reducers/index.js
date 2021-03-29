
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import patientReducer from './patientReducer'

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  patient: patientReducer
});