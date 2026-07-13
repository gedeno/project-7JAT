import {IoClose} from 'react-icons/io5'

export const Modal = ({childern , size = 'md' ,title ,onClose , isOpen }) => {
    const sizeClasses = {
        sm:'max-w-md',
        md:'max-w-lg',
        lg:'max-w-2xl',
        xl:'max-w-4xl'
    };
    return(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 '>
            <div className='fixed inset-0 bg-black/50 backdrop-blur-sm'/>
            <div className={`relative w-full ${sizeClasses[size]} bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 animate-in`}>
                <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800'>
                    <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>ASTU</h2>
                    <button className='p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
                        <IoClose size={22}/>
                    </button>
                </div>
                <div className='px-6 py-4 max-h-[70vh] overflow-y-auto scrollbar-thin'>tyui</div>
            </div>
        </div>
    )
}