import React, { useState } from "react"
import { OptionsComponent } from "./Components/OptionsComponent";
import { FormData } from "./types/formTypes";
import CompanyList from "./Components/CompanyList";
import { v4 as uuidv4 } from 'uuid';
import ExponentiaLogo from '../public/exponentiaLogo.png'
import "./App.css"
type Options = {
  companyType: {
    delivery: string;
    socialListening: string;
    mensajeria: string;
  };
  companyFlow: {
    completo: string;
    respondeAtiende: string;
    atiende: string;
    clasificaResponde: string;
    responde: string;
  };
  AutoResponse: {
    deshabilitado: string,
    pedirDatosDerivar: string,
    manejoAutomatico: string,
    clasificacionAutomatica: string
  };
}
const optionsValues: Options = {
  companyType: {
    delivery: 'delivery',
    socialListening: 'social listening',
    mensajeria: 'mensajería'
  },
  companyFlow: {
    completo: "completo",
    respondeAtiende: "responde y atiende",
    atiende: "atiende",
    clasificaResponde: "clasifica y responde",
    responde: "responde"
  },
  AutoResponse: {
    deshabilitado: "deshabilitado",
    pedirDatosDerivar: "pedir datos y derivar",
    manejoAutomatico: "manejo automático",
    clasificacionAutomatica: "clasificación automática"
  }
}



function App() {
  const parsedData = localStorage.getItem("companyValues");
  const companies: FormData[] = parsedData !== null ? JSON.parse(parsedData) : [];
  const [companiesState, setCompaniesState] = useState<FormData[]>(companies);
  const [errorMsg, setErrorMsg] = useState('');
  const [typeButton, setTypeButton] = useState('Guardar');
  const [formValues, setformValues] = useState<FormData>({
    companyName: '',
    typeCompanyValue: '',
    flowCompanyValue: '',
    autoSaveValue: '',
    id: ''
  });

  const changeInputValues = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {

    setformValues({ ...formValues, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="text-center p-3">
        <h1 className="text-2xl">Exponentia .</h1>
        <p className="text-xs">Registro de empresa</p>

      </div>
      <div className="md:flex justify-center items-center">
      <form className="p-10 text-lg md:w-7/12" onSubmit={(e) => {
        e.preventDefault();
        let confirmValidation = Object.values(formValues);
        confirmValidation = confirmValidation.slice(0, 3);


        if (confirmValidation.includes('')) {
          setErrorMsg("*Llene todos los campos");
          return
        }
        setErrorMsg("");

        if (typeButton === 'Guardar') {
          setformValues({
            ...formValues, id: uuidv4()
          })
          const newFormValue: FormData = {
            ...formValues, id: uuidv4()
          }
          // console.log(newFormValue)
          localStorage.setItem('companyValues', JSON.stringify([...companiesState, newFormValue]));
          setCompaniesState(
            [
              ...companies, newFormValue
            ]
          )
        }
        else {
          const editCompanies = companiesState;
          const value = editCompanies.findIndex(company => company.id === formValues.id);
          editCompanies[value] = formValues;
          setCompaniesState(editCompanies);
          localStorage.setItem('companyValues', JSON.stringify(editCompanies));
          console.log(editCompanies)
          setTypeButton('Guardar')
        }


        setformValues({
          companyName: '',
          typeCompanyValue: '',
          flowCompanyValue: '',
          autoSaveValue: '',
          id: ''
        });

      }}>
        <div>
          <label htmlFor="companyName">
            Nombre de la empresa <br />
            <input type="text" name="companyName" placeholder="Nombre de la empresa" onChange={changeInputValues} value={formValues.companyName} />
          </label>

        </div>
        <div>
          <label htmlFor="typeCompanyValue">
            Tipo de empresa: <br />

            <select name="typeCompanyValue" id="company-type" value={formValues.typeCompanyValue.length <= 0 ? '' : formValues.typeCompanyValue} onChange={changeInputValues}>

              <option value="none"></option>
              <OptionsComponent options={Object.values(optionsValues.companyType)} />
            </select>

          </label>
        </div>

        <div>
          <label htmlFor="flowCompanyValue">
            Flujo: <br />
            <select name="flowCompanyValue" id="company-flow" value={formValues.flowCompanyValue.length <= 0 ? 'none-flow' : formValues.flowCompanyValue} onChange={changeInputValues}>
              <option value="none-flow" disabled></option>
              {

                formValues.typeCompanyValue === optionsValues.companyType.delivery
                  ?
                  <>
                    <OptionsComponent options={[optionsValues.companyFlow.completo, optionsValues.companyFlow.respondeAtiende, optionsValues.companyFlow.atiende]} />
                  </>
                  :
                  formValues.typeCompanyValue === optionsValues.companyType.socialListening || formValues.typeCompanyValue === optionsValues.companyType.mensajeria ?
                    <>
                      <OptionsComponent options={[optionsValues.companyFlow.clasificaResponde, optionsValues.companyFlow.responde]} />
                    </>
                    :
                    <></>
              }
            </select>
          </label>
        </div>
        {
          formValues.flowCompanyValue === optionsValues.companyFlow.completo || formValues.flowCompanyValue === optionsValues.companyFlow.clasificaResponde || formValues.flowCompanyValue === optionsValues.companyFlow.atiende || formValues.flowCompanyValue == ''
            ?
            <>
            </>
            :
            <div>
              <label htmlFor="autoSaveValue">
                Auto Respuesta: <br />
                <select name="autoSaveValue" id="auto-response" value={formValues.autoSaveValue.length <= 0 ? 'none-flow' : formValues.autoSaveValue} onChange={changeInputValues}>
                  <option value="none-autoresponse"></option>
                  {
                    formValues.flowCompanyValue === optionsValues.companyFlow.respondeAtiende
                      ?
                      <OptionsComponent options={[optionsValues.AutoResponse.deshabilitado, optionsValues.AutoResponse.pedirDatosDerivar, optionsValues.AutoResponse.manejoAutomatico]} />
                      :
                      formValues.flowCompanyValue === 'responde' ?
                        <OptionsComponent options={[optionsValues.AutoResponse.deshabilitado, optionsValues.AutoResponse.clasificacionAutomatica]} />
                        :
                        <option value="none-autoresponse" disabled></option>
                  }

                </select>
              </label>
            </div>
        }


        <button type="submit" className="block rounded-md w-24 h-8 ms-4 text-white bg-sky-800 font-bold">{typeButton}</button>
        <p className="text-red-500 bg-red-200 rounded my-2 error-msg" >{errorMsg}</p>
      </form>
      <img src={ExponentiaLogo} alt="Exponentia_Tech Logo" className="hidden md:block" />
      </div>
      <CompanyList companies={companiesState} setFormValues={setformValues} setTypeButton={setTypeButton} setCompaniesState={setCompaniesState} companiesState={companiesState} />
    </div>
  )
}

export default App
