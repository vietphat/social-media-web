import { useReducer, useCallback } from 'react';

// actions
const INPUT_CHANGE = 'input_change';
const SET_DATA = 'set_data';

const inputChange = (payload) => {
    return {
        type: INPUT_CHANGE,
        payload,
    };
};

const setData = (payload) => {
    return {
        type: SET_DATA,
        payload,
    };
};

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            let formIsValid = true;

            // lặp qua từng inputId(title, description,...)
            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) {
                    continue;
                }
                // nếu inputId đang là input đang nhập vào
                // form sẽ hợp lệ nếu form đã hợp lệ và giá trị mới hợp lệ
                if (action.payload.inputId === inputId) {
                    formIsValid = formIsValid && action.payload.isValid;
                    // nếu inputId ko phải là input đang nhập vào
                    // form sẽ hợp lệ nếu form đã hợp lệ và giá trị của nó cũng hợp lệ
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.payload.inputId]: {
                        value: action.payload.value,
                        isValid: action.payload.isValid,
                    },
                },
                isValid: formIsValid,
            };
        case SET_DATA:
            return {
                ...state,
                inputs: action.payload.inputsData,
                isValid: action.payload.formValidity,
            };
        default:
            throw new Error('Invalid action');
    }
};

export const useForm = (inputsData, formValididy) => {
    const [formState, dispatch] = useReducer(reducer, {
        inputs: inputsData,
        isValid: formValididy,
    });

    const handleInputChange = useCallback((inputId, value, isValid) => {
        dispatch(
            inputChange({
                inputId,
                value,
                isValid,
            }),
        );
    }, []);

    const setFormData = useCallback((inputsData, formValidity) => {
        dispatch(
            setData({
                inputsData,
                formValidity,
            }),
        );
    }, []);

    return [formState, handleInputChange, setFormData];
};
