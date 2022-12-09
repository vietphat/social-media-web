import React, { useReducer, useEffect } from 'react';
import classNames from 'classnames/bind';

import { validate } from '~/utils/validators';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

// actions
const CHANGE = 'change';
const TOUCH = 'touch';

const change = (payload) => {
    return {
        type: CHANGE,
        payload: {
            value: payload.value,
            validators: payload.validators,
        },
    };
};

const touch = () => {
    return {
        type: TOUCH,
    };
};

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE:
            return {
                ...state,
                value: action.payload.value,
                isValid: validate(action.payload.value, action.payload.validators),
            };
        case TOUCH:
            return {
                ...state,
                isTouched: true,
            };
        default:
            throw new Error('Invalid action.');
    }
};

const Input = ({ placeholder, name, id, type = 'text', classNames, onInput, validators, multiple = false }) => {
    const [state, dispatch] = useReducer(reducer, {
        value: type === 'file' ? [] : '',
        isTouched: false,
        isValid: false,
    });

    const { value, isValid } = state;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [onInput, id, value, isValid]);

    const handleChange = (e) => {
        dispatch(
            change({
                value: e.target.value,
                validators,
            }),
        );
    };

    const handleTouch = () => {
        dispatch(touch());
    };

    let component = (
        <input
            className={cx('input', classNames)}
            placeholder={placeholder}
            name={name}
            id={id}
            type={type}
            value={state.value}
            onChange={handleChange}
            onBlur={handleTouch}
        />
    );
    if (type === 'file') {
        component = (
            <input
                className={cx(classNames)}
                name={name}
                id={id}
                type={type}
                onChange={handleChange}
                onBlur={handleTouch}
                multiple={multiple}
            />
        );
    }

    return component;
};

export default Input;
