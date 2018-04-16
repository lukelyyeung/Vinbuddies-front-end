import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AsyncCreatable } from 'react-select';
import 'react-select/dist/react-select.css';
import env from '../../env';
import DatePicker from 'react-datepicker';
import { DatePickerInput } from './renderDatePicker';
const ENV = env.dev;

type SearchType = 'date' | 'title' | 'tag';
type Keyword = string | Moment;

interface MultipleInputState {
    searchType: SearchType;
    keyword: Keyword;
}

export class RenderMultipleInput extends React.Component<any, MultipleInputState> {
    constructor(props: any) {
        super(props);
        this.getOptions = this.getOptions.bind(this);
    }

    async getOptions(value: string | Moment) {
        const token = localStorage.getItem('token');
        if (value === '') {
            return { options: [] };
        }

        const { eventSearch: { searchType } } = this.props;
        const type = searchType.toLowerCase();
        const apiURL = (type === 'tag') ? `${ENV.api_server}/tag?${type}=${value}` :
            `${ENV.api_server}/eventjournal?${type}=${value}`;
        let options = await axios({
            method: 'GET',
            url: apiURL,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(data => {
                if (data.data.journals) {
                    return data.data.journals.map((e: any) => ({
                        label: e.event_title,
                        value: e.event_title
                    }));
                }
                return data.data.map((e: any) => ({
                    label: e.tag_name,
                    value: e.tag_name
                }));
            });
        return { options: options };
    }

    render() {
        const { input, eventSearch: { searchType }, className } = this.props;
        return (
            <div>
                {searchType && searchType.toLowerCase() === 'date' ?
                    (<DatePicker
                        customInput={<DatePickerInput />}
                        className={`event-datePicker ${className}`}
                        onChange={(value: any) => input.onChange(value)}
                        dateFormat="DD/MM/YYYY"
                        todayButton={'Today'}
                        selected={moment(typeof input.value !== 'string' ? input.value : new Date())}
                        withPortal={true}
                    />) :
                    (<AsyncCreatable
                        {...this.props}
                        className={className}
                        multi={false}
                        name={input.name}
                        value={input.value}
                        autosize={false}
                        onChange={(value: any) => input.onChange(value)}
                        onBlur={() => input.onBlur(input.value)}
                        loadOptions={this.getOptions}
                        noResultsText={`No ${searchType} found.`}
                        promptTextCreator={(value) => `Finding ${searchType} ${value}`}
                        newOptionCreator={({ label }) => ({ label: label, value: label })}
                    />)
                }
            </div>
        );
    }
}