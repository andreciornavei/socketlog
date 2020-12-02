import React, {
    useEffect,
    useRef,
} from 'react';
import { TextInput } from 'react-native';
import { useField } from '@unform/core';
import styles from "./styles"

function Input({ name, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    useEffect(() => {
        inputRef.current.value = defaultValue;
    }, [defaultValue]);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            clearValue(ref) {
                ref.value = '';
                ref.clear();
            },
            setValue(ref, value) {
                ref.setNativeProps({ text: value });
                inputRef.current.value = value;
            },
            getValue(ref) {
                return ref.value;
            },
        });
    }, [fieldName, registerField]);
    return (
        <TextInput
            ref={inputRef}
            keyboardAppearance="dark"
            defaultValue={defaultValue}
            placeholderTextColor="#bababa"
            autoCapitalize='none'
            style={styles.container}
            onChangeText={value => {
                if (inputRef.current) {
                    inputRef.current.value = value;
                }
            }}
            {...rest}
        />
    );
};
export default Input;