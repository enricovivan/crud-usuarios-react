import { FormEvent } from "react"
import { FormInputs } from "../../types/Forms/FormInputs"

interface FormProps {
    formItems: FormInputs[]
    formSubmit: (e:FormEvent) => void
    formData: any
    setFormData: (options:any) => void
    buttonName ?: string
}

function Form(props: FormProps) {

    // const [formData, setFormData] = useState<any>({})

    const onChangeEvent = (campo: string, valor: any) => {
        props.setFormData({
            ...props.formData,
            [campo]: valor
        })
    }

    // const onSubmitEvent = (e: FormEvent) => {
    //     e.preventDefault()
    //     console.log(formData)
    // }

    // useEffect(()=>{
    //     if (props.itemSelecionado){
    //         props.setFormData(props.itemSelecionado)
    //     }
    // }, [props.itemSelecionado])

    return <form className="flex flex-col gap-y-4" onSubmit={props.formSubmit}>

        {props.formItems.map( campo => (
            <div key={campo.name} className="flex flex-row gap-x-3 justify-between items-center">
                <label 
                    className="text-black" 
                    htmlFor={campo.name}>{campo.label}
                </label>

                <input
                    className="p-1 rounded-md border border-slate-300 w-52" 
                    type={campo.type} 
                    name={campo.name} 
                    id={campo.name}
                    placeholder={campo.placeholder}
                    onChange={(e) => {onChangeEvent(campo.name, e.currentTarget.value)}}
                    value={props.formData[campo.name] || ''}
                />
            </div>
        ))}

        <button 
            className="bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white"
            type="submit">
            {props.buttonName ? props.buttonName : 'Enviar'}
        </button>

    </form>
}

export default Form