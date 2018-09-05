import React from 'react';

const renderField = ({ input, label, placeholder, type, id, currency, autoFocus,  meta: { touched, error, warning } }) => (
    <label className={touched && error ? 'error_border custom-input' : 'custom-input'}>
        <input {...input} placeholder={placeholder} id={id} type={type} autoComplete='off' autoFocus={autoFocus} />
        {touched && error ? <span>{error}</span> : ''}
    </label>
);

export default renderField;