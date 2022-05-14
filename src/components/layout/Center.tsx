import React from "react";

export const Center: React.FC<{
    className?: string;
    children: React.ReactNode;
}> = ({ className, children }) => {
    return (
        <div className={"d-flex justify-content-center " + className ?? ""}>
            {children}
        </div>
    );
};
