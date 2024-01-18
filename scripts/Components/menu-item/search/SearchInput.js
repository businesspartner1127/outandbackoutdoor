import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    searchFormContainer:{
        ['@media (max-width:900px)']: {
            display: 'none'
        },
    },
    inputContainer: {
        display: 'flex',
        width: '100%',
    },
    searchButton: {
    color: '#000',
    margin: '-5px 0 0 -70px',
    backgroundColor: 'transparent',
    },
    searchForm: {
        display: 'flex',
        width: '100%'
    },
    inputField: {
        width: '90%'
    }
}));

function SearchInput() {
  const classes = useStyles();
  

  return (
    <Fragment>
      <div className={classes.searchFormContainer} id="SearchDrawer" role="dialog" aria-modal="true" aria-label="{{ 'general.search.placeholder' | t }}" data-predictive-search-drawer>
        <form className={classes.searchForm} action="{{ routes.search_url }}" method="get" role="search">
            <input
                type="text"
                name="q"
                // value={search.terms}
                placeholder="Search for great new and used gear"
                role="combobox"
                aria-autocomplete="list"
                aria-owns="predictive-search-results"
                aria-expanded="false"
                aria-label="{{ 'general.search.placeholder' | t }}"
                aria-haspopup="listbox"
                className={classes.inputField}
                data-predictive-search-drawer-input
            />
            <input type="hidden" name="options[prefix]" value="last" aria-hidden="true" />

            <button className={classes.searchButton}
            type="submit"
            data-search-form-submit>
                <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-search" viewBox="0 0 37 40"><path d="M35.6 36l-9.8-9.8c4.1-5.4 3.6-13.2-1.3-18.1-5.4-5.4-14.2-5.4-19.7 0-5.4 5.4-5.4 14.2 0 19.7 2.6 2.6 6.1 4.1 9.8 4.1 3 0 5.9-1 8.3-2.8l9.8 9.8c.4.4.9.6 1.4.6s1-.2 1.4-.6c.9-.9.9-2.1.1-2.9zm-20.9-8.2c-2.6 0-5.1-1-7-2.9-3.9-3.9-3.9-10.1 0-14C9.6 9 12.2 8 14.7 8s5.1 1 7 2.9c3.9 3.9 3.9 10.1 0 14-1.9 1.9-4.4 2.9-7 2.9z"/></svg>
            </button>
        </form>
      </div>
    </Fragment>
  );
}

export default SearchInput;
