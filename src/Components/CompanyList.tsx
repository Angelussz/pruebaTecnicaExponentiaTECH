import { FormData } from "../types/formTypes";
interface Companies {
    companies: FormData[];
    setFormValues: React.Dispatch<React.SetStateAction<FormData>>;
    setTypeButton: React.Dispatch<React.SetStateAction<string>>;
    companiesState: FormData[];
    setCompaniesState: React.Dispatch<React.SetStateAction<FormData[]>>
    
}

const CompanyList: React.FC<Companies> = ({companies,setFormValues,setTypeButton,setCompaniesState,companiesState}) => {


  return (
    <table className="table-auto text-center my-8 mx-auto ">
  <thead className="text-white ">
    <tr className="bg-teal-400 rounded-lg text-center">
      <th className="border-2 border-solid border-sky-800">Nombre de la empresa</th>
      <th className="border-2 border-solid border-sky-800">Tipo de empresa</th>
      <th className="border-2 border-solid border-sky-800">Flujo</th>
      <th className="border-2 border-solid border-sky-800">Auto respuesta</th>
      <th className="border-2 border-solid border-sky-800">Acciones</th>
    </tr>
  </thead>
  <tbody className="bg-sky-100">
    {companies.map(company => <tr key={company.id} className="min-h-14">
        <td>{company.companyName}</td>
        <td>{company.typeCompanyValue}</td>
        <td>{company.flowCompanyValue}</td>
        <td>{company.autoSaveValue}</td>
        <td>
            <button className="bg-green-600 p-2 rounded mx-3 hover:bg-green-700" onClick={()=>{
                setFormValues(company);
                setTypeButton('Editar');
            }}>Editar</button>
            <button className="bg-red-600 p-2 rounded mx-3 hover:bg-red-700" onClick={()=>{
                const newCompanies = companiesState.filter(comp => comp.id !== company.id)
                setCompaniesState(newCompanies);
                localStorage.setItem('companyValues', JSON.stringify(newCompanies));
            }} >Eliminar</button>
        </td>
    </tr>)}
  </tbody>
</table>
  )
}

export default CompanyList