import { useState } from "react";
import { FiEye ,FiEyeOff } from "react-icons/fi";
export const Input = ({
    lable,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    className = '',
    required = false,
    error,
    ...props
}) =>{
    const [showPassword ,setShowPassword] = useState(false)
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    return(
        <div className={`space-y-1.5 ${className}`}>
            { lable &&(
            <label htmlFor="" className="block text-sm font-medium text-gray-700 dark:text-gray-300" >
                {lable}
                {required&&<span className="text-red-500 ml-1">*</span>}
            </label>
        )}
        {type === 'textarea'?(
            <textarea name={name} id={name} value={value} onChange= {onChange} placeholder={placeholder} rows ={4}
            className={`w-full rounded-lg border px4 py-2.5 text-sm transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                ${error?'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
            {...props}/>):
            (
                
            <input type={type} id = {name} name={name} value={value} onChange={onChange} placeholder={placeholder}
                className= {`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-primary-500 focus:border-transparent
                    ${error? 'border-red-500':'border-gray-300 dark:border-gray-700'}`} {...props} 
                    />
            )}
           {error && <p className="text-xs text-red-500">{error}</p>} 
        </div>
    )
}