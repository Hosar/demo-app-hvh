import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { observer } from 'mobx-react';

const DropImage = (props) => {    
        return (
            <div className="col-lg-offset-2 col-lg-4 col-md-4">
                <div className="bs-component">
                    <div className="form-group">
                        <label className="control-label">Your logo:</label>
                        <div>
                            <Dropzone onDrop={props.onDrop}
                                accept="image/png,image/jpeg,image/gif" maxSize={5000000}
                                className="dropImage">
                                <div className="pointer">
                                    Try dropping some files here, or click to select files to upload.
                            </div>
                                <div>
                                    {
                                        props.vendorLogo.map(
                                            (file) =>
                                                <img key="imgPreview" style={imgStyle} src={file.preview} />
                                        )
                                    }
                                </div>
                            </Dropzone>
                        </div>
                    </div>
                </div>
            </div>
        );    
};

const imgStyle = {
    height: '100%',
    width: '100%',
    cursor: 'pointer'
};

export default observer(DropImage);