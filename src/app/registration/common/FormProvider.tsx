import { useState, createContext, useContext, ReactNode } from "react";

type ContextProps = {
  setFormValues: (values: any) => void;
  data: any;
};

export const FormContext = createContext<ContextProps>({} as ContextProps);

export default function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState({});

  console.log(data, "data");

  const setFormValues = (values: any) => {
    setData(prevValues => ({
      ...prevValues,
      ...values,
    }));
  };

  return <FormContext.Provider value={{ data, setFormValues }}>{children}</FormContext.Provider>;
}

export const useFormData = () => useContext(FormContext);
