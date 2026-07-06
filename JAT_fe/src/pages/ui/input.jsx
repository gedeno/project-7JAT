import { useState } from "react";
import {FiEye , FiEyeOff} from 'react-icons/fi'
export const Input = ({
    label,
    error,
    icon:Icon,
    type = 'text',
    className = '',
    containerClassName = '',
    ...props

}) =>{
    const [showPassword ,setShowPassword] = useState(false)
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    return(
        <div>
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {lable}
                </label>    
            )}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text slate-400" />
                )}
            <input type= {inputType} {...props}
             className= {`w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus.outline-none focus:ring-2 focus:ring-brand-500/20 dark:bg-slate-900 dark:text-slate-100${Icon ? 'pl-10':''} ${isPassword? 'pr-10': ''} ${error ? 'border-red-500': 'border-slate-200 dark:border-slate-700'} ${className}`} />
            {isPassword&&(
                <button type="button" onClick = {()=>setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                tabIndex={-1}> {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}</button>
            )}
            </div>
            {error && <p className="text-xs text-red-500" >{error}</p>}
        </div>
    )
}