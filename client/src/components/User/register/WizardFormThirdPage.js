import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { signUp } from '../../../store/actions/index'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import renderDatePicker from './datepicker'
const colors = ["Adenoid Cystic Carcinoma","Adrenal Gland Tumor","Amyloidosis","Anal Cancer","Appendix Cancer","Astrocytoma - Childhood","Ataxia-Telangiectasia","Beckwith-Wiedemann Syndrome","Bile Duct Cancer (Cholangiocarcinoma)","Birt-Hogg-Dubé Syndrome","Bladder Cancer","Bone Cancer","Brain Stem Glioma - Childhood","Brain Tumor","Breast Cancer","Breast Cancer - Inflammatory","Breast Cancer - Metastatic","Breast Cancer in Men","Carney Complex","Central Nervous System Tumors - Childhood","Cervical Cancer","Childhood Cancer","Colorectal Cancer","Cowden Syndrome","Craniopharyngioma - Childhood","Desmoplastic Infantile Ganglioglioma, Childhood Tumor","Ependymoma - Childhood","Esophageal Cancer","Ewing Sarcoma - Childhood and Adolescence","Eye Cancer","Eyelid Cancer","Familial Adenomatous Polyposis","Familial GIST","Familial Malignant Melanoma","Familial Pancreatic Cancer","Gallbladder Cancer","Gastrointestinal Stromal Tumor - GIST","Germ Cell Tumor - Childhood","Gestational Trophoblastic Disease","Head and Neck Cancer","Hereditary Breast and Ovarian Cancer","Hereditary Diffuse Gastric Cancer","Hereditary Leiomyomatosis and Renal Cell Cancer","Hereditary Mixed Polyposis Syndrome","Hereditary Pancreatitis","Hereditary Papillary Renal Carcinoma","HIV/AIDS-Related Cancer","Juvenile Polyposis Syndrome","Kidney Cancer","Lacrimal Gland Tumor","Laryngeal and Hypopharyngeal Cancer","Leukemia - Acute Lymphoblastic - ALL - Childhood","Leukemia - Acute Lymphocytic - ALL","Leukemia - Acute Myeloid - AML","Leukemia - Acute Myeloid - AML - Childhood","Leukemia - B-cell Prolymphocytic Leukemia and Hairy Cell Leukemia","Leukemia - Chronic Lymphocytic - CLL","Leukemia - Chronic Myeloid - CML","Leukemia - Chronic T-Cell Lymphocytic","Leukemia - Eosinophilic","Li-Fraumeni Syndrome","Liver Cancer","Lung Cancer - Non-Small Cell","Lung Cancer - Small Cell","Lymphoma - Hodgkin","Lymphoma - Hodgkin - Childhood","Lymphoma - Non-Hodgkin","Lymphoma - Non-Hodgkin - Childhood","Lynch Syndrome","Mastocytosis","Medulloblastoma - Childhood","Melanoma","Meningioma","Mesothelioma","Multiple Endocrine Neoplasia Type 1","Multiple Endocrine Neoplasia Type 2","Multiple Myeloma","MUTYH (or MYH)-Associated Polyposis","Myelodysplastic Syndromes - MDS","Nasal Cavity and Paranasal Sinus Cancer","Nasopharyngeal Cancer","Neuroblastoma - Childhood","Neuroendocrine Tumor of the Gastrointestinal Tract","Neuroendocrine Tumor of the Lung","Neuroendocrine Tumor of the Pancreas","Neuroendocrine Tumors","Neurofibromatosis Type 1","Neurofibromatosis Type 2","Nevoid Basal Cell Carcinoma Syndrome","Oral and Oropharyngeal Cancer","Osteosarcoma - Childhood and Adolescence","Ovarian, Fallopian Tube, and Peritoneal Cancer","Pancreatic Cancer","Parathyroid Cancer","Penile Cancer","Peutz-Jeghers Syndrome","Pheochromocytoma and Paraganglioma","Pituitary Gland Tumor","Pleuropulmonary Blastoma - Childhood","Prostate Cancer","Retinoblastoma - Childhood","Rhabdomyosarcoma - Childhood","Salivary Gland Cancer","Sarcoma - Kaposi","Sarcoma, Soft Tissue","Sarcomas of Specific Organs","Skin Cancer (Non-Melanoma)","Small Bowel Cancer","Stomach Cancer","Testicular Cancer","Thymoma and Thymic Carcinoma","Thyroid Cancer","Tuberous Sclerosis Complex","Unknown Primary","Uterine Cancer","Vaginal Cancer","Von Hippel-Lindau Syndrome","Vulvar Cancer","Waldenstrom’s Macroglobulinemia","Werner Syndrome","Wilms Tumor - Childhood","Xeroderma Pigmentosum"]






const renderColorSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select a Diagnosis...</option>
      {colors.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)


const WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting, next } = props

  return (
    <form onSubmit={handleSubmit} className='ui form'>
      <div>
        <Field
        name="doctor"
        type="text"
        component={renderField}
        label="Your Doctor"
        />
        <label>Diagnosis</label>
        <Field name="diagnosis" label="Diagnosis" component={renderColorSelector} />
      </div>
      <div>
      {/* <label>Date of Diagnosis</label>  */}
        <br/>
        <Field
                  name="date_of_diagnosis"
                  type="date"
                  component={renderField}
                  label="Date of Diagnosis"
                />
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" label="Notes" component="textarea" placeholder="Notes" />
        </div>
      </div>
      <div>
        <button type="button" className="ui button primary" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting} className="ui button primary" >
          Continue
        </button>
      </div>
    </form>
  )
}


const formWrapped = reduxForm({
  form: 'register',
  validate
})(WizardFormThirdPage);

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  userId: state.auth.userId,
  createdPatient: state.auth.createdPatient
});


export default connect(
  mapStateToProps,
  {  }
)(formWrapped);




