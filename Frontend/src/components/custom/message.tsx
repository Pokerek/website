import './message.scss';

interface MessageProps {
    text: string;
    type: "success" | "error";
}

const Message = ({ text, type }: MessageProps) => {
    let className = "message";

    switch (type) {
        case "success":
            className += " message--success";
            break;
        case "error":
            className += " message--error";
            break;
    }

    return (
        <div className={className}>
            {text}
        </div>
    );
}

export default Message;