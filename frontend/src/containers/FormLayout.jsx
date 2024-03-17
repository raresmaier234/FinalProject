import React from "react";

const FormLayout = ({ onSubmit, children, className, autoComplete = "off" }) => {
    return (
        <form className={className} onSubmit={onSubmit} autoComplete={autoComplete}>
            {children}
        </form>
    )
}

export default FormLayout