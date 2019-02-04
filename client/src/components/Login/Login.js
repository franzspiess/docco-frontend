import { Component } from 'react';
import { connect } from 'react-redux';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import base64 from 'base-64';
import styles from './styles';
import MainButton from "../MainButton";
import { login} from '../../redux/actions';


class Login extends Component {
  state = {
    user: {}
  }

  handleChange = e => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = () => {
    const { user } = this.state;
    const { loginAct } = this.props;
    const loginData = `${user.email} : ${user.password}`
    const api = {
      route: 'login',
      headers: {
        Authorization: `Basic ${base64.encode(loginData)}`
      }
    }
    loginAct(api);


  }

  render () {
    const { handleSubmit } = this;

    return (
      <div className="login" css={styles.login} >
        <div className="welcome" css={styles.welcome}>
          <span className="title" css={styles.title}>Docco</span>
          <span className="phrase" css={styles.phrase}>Trust But Verify</span>
        </div>
        <div className="the-form" css={styles.theform} >
          <form onChange={this.handleChange} css={styles.form} >
            <input type="text" name="email" className="the-input first-name" css={styles.input} placeholder="email" />
            <input type="password" name="password" className="the-input last-name" css={styles.input} placeholder="password" autoComplete="current-password" />
          </form>
          <MainButton text="LOGIN" click={handleSubmit} />
        </div>
      </div>)
  }
};

const mapStateToProps = (state) => ({
  entities: state.entities
})

const mapDispatchToProps = (dispatch) => ({
  loginAct: (obj) => dispatch(login(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);