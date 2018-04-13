import * as React from 'react';
import * as classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Button, Input } from 'reactstrap';
import '../css/eventJournal.css';
import { ShortEvent } from './ShortEvent';
import { Route } from 'react-router';
import { DetailEvent } from './DetailEvent';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GetJournalActions, callJounral, tabJournal } from '../actions/journal-action';

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
    this.MoreEvent = this.MoreEvent.bind(this);
  }

  async componentDidMount() {
    if (this.props.events.length <= 0) {
      let query = {
        role: 'creator',
        orderby: 'date',
        limit: 1
      };
      await this.props.callJournal(query);
    }
  }

  async toggle(tab: string) {
    if (this.props.activeTab !== tab) {
      await this.props.callJournal({
        role: tab,
        orderby: 'date',
        limit: 1
      });
      this.props.tabJournal(tab);
    }
  }

  async MoreEvent(e: any) {
    e.preventDefault();
    await this.props.callJournal({
      role: this.props.activeTab,
      orderby: 'date',
      limit: 1,
      offset: this.props.events.length
    });
  }

  render() {
    console.log(this.props.activeTab);
    return (
      <div>
        <Nav tabs={true}>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.activeTab === 'creator' })}
              onClick={() => { this.toggle('creator'); }}
            >
              Event Journal
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.activeTab === 'participant' })}
              onClick={() => { this.toggle('participant'); }}
            >
              Participated Events
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.props.activeTab}>
          <Input placeholder="this is a search bar"/>
          <TabPane tabId="creator">
            <Row>
              <ShortEvent {...this.props} />
              <Button color="info" onClick={this.MoreEvent}>More</Button>
            </Row>
          </TabPane>
          <TabPane tabId="participant">
            <Row>
              <ShortEvent {...this.props} />
              <Button color="info" onClick={this.MoreEvent}>More</Button>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const Journal = connect(
  (state: any) => ({ events: state.events.events, activeTab: state.events.activeTab }),
  (dispatch: Dispatch<GetJournalActions>) => ({
    callJournal: (query: JournalQuery): Promise<any> => dispatch(callJounral(query)),
    tabJournal: (tab: string): void => dispatch(tabJournal(tab))
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
