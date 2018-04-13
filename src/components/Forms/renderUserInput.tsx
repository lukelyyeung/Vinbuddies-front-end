import * as React from 'react';
import axios from 'axios';
import * as FA from 'react-fontawesome';
import { AsyncCreatable } from 'react-select';
import 'react-select/dist/react-select.css';
import env from '../../env';
const ENV = env.dev;

export const RenderUserInput = (props: any) => {
    const { input } = props;
    const token = localStorage.getItem('token');
    const getOptions = async (value: string) => {
        if (value === '') {
            return { options: [] };
        }
        let options = await axios({
            method: 'GET',
            url: `${ENV.api_server}/user/alluser?name=${value}&orderby=username`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(data => data.data.map((user: any) => ({
                label: user.username,
                value: user.username,
                id: user.id
            })));

        return { options: options };
    };

    return (
        <div className="userTag">
            <label>{props.placeholder}</label>
            <AsyncCreatable
                {...props}
                name={input.name}
                value={input.value}
                autosize={false}
                onChange={(value: any) => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                loadOptions={getOptions}
                noResultsText="No user found."
                promptTextCreator={(value) => `Finding user ${value}`}
                newOptionCreator={({ label }) => ({ label: label, value: label, id: label })}
            />
            {(props.meta.touched && props.meta.error) ?
                    (<div className="warn">
                        <FA className="left-hand-icon" name="exclamation-circle" />
                        {props.meta.error}
                    </div>) : null
            }
        </div>
    );
};