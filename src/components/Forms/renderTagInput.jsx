import React from 'react';
import axios from 'axios';
import { AsyncCreatable } from 'react-select';
import env from '../../env';
const ENV = env.dev;

export const RenderTagInput = (props) => {
    const { input } = props;
    const token = localStorage.getItem('token');
    const getOptions = async (value) => {
        if (value === '') {
            return { options: [] };
        }
        let options = await axios({
            method: 'GET',
            url: `${ENV.api_server}/tags?q=${value}`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(data => data.data.map((tag) => ({
                label: tag.tag_name,
                value: tag.tag_id,
                id: tag.tag_id
            })));

        return { options: options };
    };

    return (
        <div className="tag">
            <label>{props.placeholder}</label>
            <AsyncCreatable
                {...props}
                name={input.name}
                value={input.value}
                autosize={false}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                loadOptions={getOptions}
                noResultsText="No tag found."
                promptTextCreator={(value) => `Finding tag ${value}`}
                newOptionCreator={({ label }) => ({ label: label, value: label, id: label })}
            />
        </div>
    );
};
