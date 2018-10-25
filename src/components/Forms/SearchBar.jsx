import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderMultipleInput } from './renderMultiInput';
import { formValueSelector } from 'redux-form';
import { Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import '../../css/searchBar.css';

const searchTypeInput = (props) => {
    return (
        <Input type="select" className={props.className} {...props.input}>
            <option>Title</option>
            <option>Tag</option>
            <option>Date</option>
        </Input>
    );
};

const PureSearchBar = (props) => {
    return (
        <form className="searchBar" onSubmit={props.handleSubmit}>
            <Field name="searchType" className="searchType" component={searchTypeInput}/>
            <Field name="keyword"  className="keyword" {...props} component={RenderMultipleInput} />
            <Button className="searchButton" type="submit">Search</Button>
        </form>
    );
};

const ReduxSearchBar = reduxForm({
    form: 'eventSearch',
    initialValues: {
        searchType: 'title',
        keyword: ''
    }
})(PureSearchBar);

const selector = formValueSelector('eventSearch');
export const SearchBar = connect(state => ({
    eventSearch: selector(state, 'searchType', 'keyword')
  }))(ReduxSearchBar);
