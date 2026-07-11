

export const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    className = ''
    required = false
    ...porps
}) =>{
    return(
        <div>
            {lable&&(
            <label htmlFor="">
                {lable}
                {required&&<span>*</span>}
            </label>
        )}
        {type === 'textarea'?(
            <textarea name={name} id={name} value={value} onChange= {onChange} placeholder={placeholder} rows ={4}
            {...props}/>):
            (
                <input type={type} id = {name} name={name} value={value} onChange={onChange} placeholder={placeholder} />
            )
        }
            
        </div>
    )
}