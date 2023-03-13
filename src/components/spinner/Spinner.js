import { Component } from "react";

class Spinner extends Component {
    spinnerScalePix = 250;
    
    render(){
        return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: 'block', background: 'none', margin: '0 auto'}} width={this.props.spinnerScale ? this.props.spinnerScale+'px' : this.spinnerScalePix} height={this.props.spinnerScale ? this.props.spinnerScale+'px' : this.spinnerScalePix} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g transform="rotate(0 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.6152125279642059s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(30 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.5592841163310962s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(60 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.5033557046979866s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(90 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.447427293064877s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(120 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.39149888143176736s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(150 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.33557046979865773s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(180 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.2796420581655481s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(210 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.2237136465324385s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(240 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.16778523489932887s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(270 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.11185682326621925s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(300 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="-0.055928411633109625s" repeatCount="indefinite"></animate>
                </rect>
                </g><g transform="rotate(330 50 50)">
                <rect x="46.5" y="24.5" rx="3.5" ry="3.64" width="7" height="13" fill="#85a2b6">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6711409395973155s" begin="0s" repeatCount="indefinite"></animate>
                </rect>
                </g>
            </svg>
        )
    }
};

export default Spinner;