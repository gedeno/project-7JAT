import { space } from "postcss/lib/list";
import { Children } from "react";
const variants = {
    primary :'bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/25 ',
    secondary : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
};
const sizes ={
    sm:'px-3 py-1.5 text-sm',
    md:'px-4',
    lg:'px-6 py-3 text-base'
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    disabled = false,
    icon : Icon,
    ...props
}) => (
    <button className= {`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-slate-900 ${variants[variant]} ${sizes[size]} ${className}`}
     {...props}>
        {loading ? (<span className="h-4 w-4 animate-spain rounded-full border-current border-t-transparent" />): Icon ? (
            <Icon className = "h-4 w-4" />
        ):null}
        {children}
    </button>
)