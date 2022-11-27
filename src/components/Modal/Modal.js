import React from 'react';
import classNames from 'classnames';
import './Modal.scss';

const Modal = ({
    children,
    className,
    isOpen = false,
    isClosable = true,
    size = 'lg',
    onClose,
    ...props
  }) => {
   
    const classes = classNames(
      'gds-modal',
      className,
      {
        '--open': isOpen
      },
      //--${size}
    );
  
    return (
        <div
            {...props}
            className={classes}
            role="dialog"
            aria-modal="true"
        >
            <div className="gds-modaloverlay" aria-hidden="true"></div>
            <div className="gds-modalref-container">
                <div className="gds-modalcontainer">
                    <span className="gds-modalcenter" aria-hidden="true">&#8203;</span>
                    <div className="gds-modalmain">
                        {isClosable && (
                            <div className="flex justify-end">
                                <button type="button" className="gds-modalbutton-wrapper-icon" onClick={onClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        <div className="gds-modalbody">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default Modal;
