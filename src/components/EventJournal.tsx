import * as React from 'react';
import * as classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Button } from 'reactstrap';
import '../css/eventJournal.css';
import { ShortEvent } from './ShortEvent';
import { Route } from 'react-router';
import { DetailEvent } from './DetailEvent';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GetJournalActions, callJounral, tabJournal, SearchCriteria, setCriteria } from '../actions/journal-action';
import { SearchBar } from './Forms/SearchBar';
import { RootState } from '../store';
import * as bodyStyle from '../components/settings/bodyStyle';

interface JournalQuery {
  role?: string;
  orderby?: string;
  tag?: string;
  limit?: number | string;
  offset?: number | string;
  title?: string;
  date?: string;
  deleted?: boolean;
}

class PureJournal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.moreEvent = this.moreEvent.bind(this);
    this.searchEvent = this.searchEvent.bind(this);
  }

  async componentDidMount() {
    for (const i of Object.keys(bodyStyle.journal)) {
      document.body.style[i] = bodyStyle.journal[i];
    }

    if (this.props.events.length <= 0) {
      const { orderby, limit } = this.props.criteria;
      let query = {
        role: 'creator',
        orderby: orderby,
        limit: limit
      };
      await this.props.callJournal(query);
    }
  }

  async componentWillUnmount() {
    for (const i of Object.keys(bodyStyle.journal)) {
      document.body.style[i] = null;
    }
  }

  async toggle(tab: string) {
    if (this.props.activeTab !== tab) {
      const { orderby, limit } = this.props.criteria;
      await this.props.callJournal({
        role: tab,
        orderby: orderby,
        limit: limit
      });
      this.props.tabJournal(tab);
    }
  }

  async moreEvent(e: any) {
    e.preventDefault();
    const { orderby, limit, search: { searchType, keyword } } = this.props.criteria;
    await this.props.callJournal({
      role: this.props.activeTab,
      orderby: orderby,
      limit: limit,
      [searchType]: keyword,
      offset: this.props.events.length
    });
  }

  async searchEvent(values: any) {
    if (values.keyword === '') {
      return;
    }
    if (values.keyword._d) {
      values.keyword = values.keyword._d;
    } else if (values.keyword.value) {
      values.keyword = values.keyword.value;
    }
    values.searchType = values.searchType.toLowerCase();

    const { limit, orderby } = this.props.criteria;
    const { searchType, keyword } = values;

    this.props.setCriteria({
      search: values
    });

    await this.props.callJournal({
      role: this.props.activeTab,
      orderby: orderby,
      limit: limit,
      [searchType]: keyword
    });
  }

  render() {
    return (
      <div>
        <Nav tabs={true}>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.activeTab === 'creator' })}
              onClick={() => this.toggle('creator')}
            >
              Event Journal
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.activeTab === 'participant' })}
              onClick={() => this.toggle('participant')}
            >
              Participated Events
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.props.activeTab}>
          <SearchBar onSubmit={this.searchEvent} />
          <TabPane tabId="creator">
            <Row className="justify-content-center">
              <ShortEvent {...this.props} />
              <Button
                className="more-event-button"
                onClick={this.moreEvent}
              >
                More
              </Button>
            </Row>
          </TabPane>
          <TabPane tabId="participant">
            <Row className="justify-content-center">
              <ShortEvent {...this.props} />
              <Button
                className="more-event-button"
                onClick={this.moreEvent}
              >
                More
              </Button>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const Journal = connect(
  (state: RootState) => ({
    events: state.events.events,
    activeTab: state.events.activeTab,
    criteria: state.events.criteria
  }),
  (dispatch: Dispatch<GetJournalActions>) => ({
    callJournal: (query: JournalQuery): Promise<any> => dispatch(callJounral(query)),
    tabJournal: (tab: string): void => dispatch(tabJournal(tab)),
    setCriteria: (criteria: SearchCriteria): void => dispatch(setCriteria(criteria))
  }))(PureJournal);

export const EventJournal = (props: any) => {
  const { match } = props;

  return (
    <div>
      <Route exact={true} path={`${match.url}`} component={Journal} />
      <Route path={`${match.url}/:eventId`} component={DetailEvent} />
    </div>
  );
};
