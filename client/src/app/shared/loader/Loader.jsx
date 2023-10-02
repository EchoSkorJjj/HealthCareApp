import { ProgressBar } from 'react-loader-spinner';
import React from 'react';
import '../../../assets/styles/shared_styles/Loader.css'

export default function loader() {
    return (
        <div className="loader">
            <ProgressBar
            height="100"
            width="150"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor = '#F4442E'
            barColor = '#51E5FF'
            />
        </div>
    )
}
