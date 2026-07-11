

export const Home = () =>{
    const [showPassword ,setShowPassword] = useState(false)
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    return(
        <>
        <>
        {isPassword&&(
                <button type="button" onClick = {()=>setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                tabIndex={-1}> {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}</button>
            )}
        </>
        <h1>hellow world</h1>
        </>
    )

}