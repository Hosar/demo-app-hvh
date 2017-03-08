// @flow
import React from 'react';
import './ValidationErrors.scss';

const ValidationErrors = (props: { errors: Array<string>, hasErrorsStyle: Object, closeOverlay: () => void }) => {
    return (
        <div>
            <div className="overlay" style={props.hasErrorsStyle}>
                <div className="text-center overlay-inner">
                    <div className="text-center">
                        <ul>
                            {
                                props.errors.map((err, index) => {
                                    return <li key={index}>{err}</li>;
                                })
                            }
                        </ul>

                    </div>
                    <div className="text-center">
                        <a onClick={props.closeOverlay}>&times;</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

ValidationErrors.propTypes = {
    errors: React.PropTypes.array.isRequired,
    hasErrorsStyle: React.PropTypes.object.isRequired,
    closeOverlay: React.PropTypes.func.isRequired
};

export default ValidationErrors;