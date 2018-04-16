import * as React from 'react';

export const GravatarOption = (props: any) => {
    const gravatarStyle: React.CSSProperties = {
        borderRadius: 50,
        display: 'inline-block',
        marginRight: 10,
        position: 'relative',
        top: -2,
        verticalAlign: 'middle',
        width: '30px',
        height: '30px',
        objectFit: 'cover'
    };
    
    const handleMouseDown = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        props.onSelect(props.option, event);
    };
    
    const handleMouseEnter = (event: any) => {
        props.onFocus(props.option, event);
    };
    
    const handleMouseMove = (event: any) => {
        if (props.isFocused) {
            return;
        }
        props.onFocus(props.option, event);
    };
    
    return (
        <div 
            className={props.className}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            title={props.option.title}
        >
            <img src={props.option.picture} style={gravatarStyle} />
            {props.children}
        </div>
    );
};

export const GravatarValue = (props: any) => {
    const gravatarStyle: React.CSSProperties = {
        borderRadius: 50,
        display: 'inline-block',
        marginRight: 10,
        position: 'relative',
        top: -2,
        verticalAlign: 'middle',
        width: '30px',
        height: '30px',
        objectFit: 'cover'
    };
    
    return (
        <div className="Select-value" title={props.value.title}>
            <span className="Select-value-label">
            <img src={props.value.picture} style={gravatarStyle} />
                {props.children}
            </span>
        </div>);
};