import * as React from 'react';
import * as FA from 'react-fontawesome';

export const WineAttribute = (props: any) => (
    <div className="producer-wrapper">
        <div className="header">
            <h5>{props.header}</h5>
        </div>
        <div className="content">
            {props.children}
        </div>
    </div>
);

export const AwardsList = (props: any) => (
    <div className="award-wrapper">
        <div className="header">
            <h6>{props.header}</h6>
        </div>
        <div className="year">
            <p>{props.year}</p>
        </div>
        <div className="trophy-box">
            <FA className={props.trophy.toLowerCase()} name="trophy" size="2x" />
        </div>
    </div>
);

export const InfoBox = (props: any) => (
    <div className="producer-wrapper">
        <div className={`header ${props.headerClass}`}>
            <p>{props.header}</p>
        </div>
        <div className={`content ${props.contentClass}`}>
            {props.children}
        </div>
    </div>
);

const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    paddingBottom: '177%',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '100px'
};

const ImgStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1.8%',
    height: '39.55%',
    width: '70%',
    objectFit: 'cover',
    borderRadius: '100px'
};

const bodyStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '56.49%',
    bottom: '0',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    backgroundColor: '#B74E55'
};

const titleStyle: React.CSSProperties = {
    padding: '5px',
    overflowWrap: 'break-word',
    borderRadius: '10px',
    color: '#fff',
    margin: '0'
};

export const CardBox = (props: any) => (
    <div style={wrapperStyle}>
        <img
            style={ImgStyle}
            src={props.image}
        />
        <div style={bodyStyle}>
            <p style={titleStyle}>By<br />{props.title}</p>
        </div>
    </div>
);