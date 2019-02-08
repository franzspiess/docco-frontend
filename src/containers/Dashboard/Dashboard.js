import { Component } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import SearchBar from '../../components/SearchBar';
import ContractList from '../../components/ContractList';
import PlusButton from '../../components/PlusButton';
import NavBar from '../../components/NavBar';
import { getAll, logOut } from '../../redux/actions';

class Dashboard extends Component {

  componentDidMount() {
    const { getAllAct } = this.props;
    getAllAct();
  }

  handleInactiveNegotiations = () => {
    // handles inactive negotiations
  }

  render() {
    const { handleInactiveNegotiations } = this;
    const { contractList, history, logOutAct, partyDetails } = this.props;
    return (
      <DashboardContainer>
        <NavBar name={`${partyDetails.displayName}`} history={history} logOutAct={logOutAct}/>
        <DashboardTopRow>
          <div className="left">
            <h1>My Active Negotiations</h1>
          </div>
          <div className="right">
              <SearchBar />
          </div>
        </DashboardTopRow>
        <DashboardMainRow>
          <ContractList contractList={contractList} />
        </DashboardMainRow>
        <DashboardBottomRow>
          <AddNegotiation>
            <Link css={css`
              text-decoration: none;
              color: #2C3E50;
              pointer: cursor;
            `} to="/create-new" ><PlusButton size="2" /></Link>
            <Link css={css`
              text-decoration: none;
              color: #2C3E50;
            `} to="/create-new" ><AddNegotiationText>Create New Negotiation</AddNegotiationText></Link>
          </AddNegotiation>
          <InactiveNegotiations
            role="button"
            tabIndex="-1"
            onClick={handleInactiveNegotiations}
            onKeyPress={handleInactiveNegotiations}
          >
            inactive negotiations
          </InactiveNegotiations>
        </DashboardBottomRow>
      </DashboardContainer>
    );
  }
};

const DashboardContainer = styled('div')`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DashboardTopRow = styled('div')`
  padding: 20px;
  width: 90%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;
const DashboardMainRow = styled('div')`
  margin-top: 0;
  overflow-y: scroll;
  width: 90%;
  flex: 1;
  border: solid;
  border-color: #ecf0f1;
`;
const DashboardBottomRow = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InactiveNegotiations = styled('div')`
  font-size: 14px;
  color: blue;
  text-decoration-line: underline;
  cursor: pointer;
  outline: none;
  &:visited {
    color: purple;
  }
`;
const AddNegotiation = styled('div')`
  display: flex;
  align-items: center;
`;
const AddNegotiationText = styled('div')`
  font-size: 24px;
  padding: 15px;
`;

const mapDispatchToProps = dispatch => ({
  getAllAct: () => dispatch(getAll()),
  logOutAct: () => dispatch(logOut())
});

const mapStateToProps = state => ({
  contractList: state.pages.contractList.result.map(id => {
    return state.entities.negotiations[id];
  }),
  page: state.pages.contractList, // this can be changed from contractList to parent-container name);
  partyDetails: state.authentication,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
