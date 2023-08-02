import './index.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[];
}

export const Editor = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className='editor' {...props}>
            {children}
        </div>
    )
}

export const Form = ({ children, ...props }: React.HTMLAttributes<HTMLFormElement>) => {
    return (
        <form className='editor__form' {...props}>
            {children}
        </form>
    )
}

export const Input = ({ children, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    const { name, id } = props;
    return (
        <label htmlFor={id} className="editor__label">
            {name && name.charAt(0).toUpperCase() + name.slice(1)}
            <input className='editor__input' {...props}>
                {children}
            </input>
        </label>
    )
}

export const Select = ({ options, ...props }: SelectProps) => {
    const { name, id } = props;
    return (
        <label htmlFor={id} className="editor__label">
            {name && name.charAt(0).toUpperCase() + name.slice(1)}
            <select className='editor__select' {...props}>
                {
                    options.map((option, index) => {
                        return <option
                            key={`${option}_${index}`}
                            value={option}
                        >
                            {option}
                        </option>
                    })
                }
            </select>
        </label>
    )
}

export const TextArea = ({ children, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <label className="editor__label">
            <textarea className='editor__textarea' {...props}>
                {children}
            </textarea>
        </label>
    )
}