interface OptionsComponentProps {
    options: string[]; // Arreglo de strings
    
}

export const OptionsComponent: React.FC<OptionsComponentProps> = ({ options}) => {
    
    return (
        <>
            {options.map((option: string) => {
                return <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
            })}
        </>
    )
}
