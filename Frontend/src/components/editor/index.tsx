import './index.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[];
    label: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
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

export const Input = ({ label, children, ...props }: InputProps) => {
    return (
        <label htmlFor={props.id} className="editor__label">
            {label}
            <input className='editor__input' {...props}>
                {children}
            </input>
        </label>
    )
}

export const Select = ({ label, options, ...props }: SelectProps) => {
    return (
        <label htmlFor={props.id} className="editor__label">
            {label}
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

export const TextArea = ({ label, children, ...props }: TextAreaProps) => {
    return (
        <label className="editor__label">
            {label}
            <textarea className='editor__textarea' {...props}>
                {children}
            </textarea>
        </label>
    )
}