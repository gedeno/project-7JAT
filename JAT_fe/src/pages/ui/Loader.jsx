export const Loader = ({fullscreen = false , text = 'Loading...'})=> {
    const sepinner =(
        <div className="flex flex-col items-center pag-3">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            {text&& <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>}    
            
        </div>
    )
    if (fullscreen){
        return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
            {spinner}
        </div >)
    }
    return <div className="flex items-center justify-center py-12">{sepinner}</div>
}