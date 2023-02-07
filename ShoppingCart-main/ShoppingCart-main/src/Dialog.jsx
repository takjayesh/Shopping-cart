import "./Dialog.css";

function Dialog({ show, onClose, content }) {
    
    if (show) {
        return (
            <div className="dialog">
            <div className="dialog-content">
                <div className="dialog-body">{content}</div>
                <div className="dialog-footer">
                <button className="dialog-close" onClick={onClose}>
                    Close
                </button>
                </div>
            </div>
            </div>
        );
    }
    else{
        return <></>;
    }
  
}

export default Dialog;
