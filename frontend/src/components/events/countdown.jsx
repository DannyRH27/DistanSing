import React from "react";
import { withRouter } from "react-router-dom";


class Countdown extends React.Component {
  constructor(props) {
    super(props);
    const diff = new Date(this.props.date).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    // const minutes = 0;
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    this.state = { days, hours, minutes, seconds }
    // 4. Schedule the tick at 1 second intervals.
    // setInterval(this._tick.bind(this), 1000);
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { days, hours, seconds, minutes } = this.state
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            if (days === 0) {
              clearInterval(this.myInterval);
              // this.props.location.reload();
            } else {
              this.setState(({ days }) => ({
                days: days - 1,
                hours: 23
              }))
            }
          } else {
            this.setState(({ hours }) => ({
              hours: hours - 1,
              minutes: 59
            }))
          }
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const diff = new Date(this.props.date).getTime() - new Date().getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      // const minutes = 0;
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      this.setState({ days, hours, minutes, seconds });
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }


  render() {
    const { days, hours, minutes, seconds } = this.state;
    const { hasTicket, StartStreamButton, artist, currentId, isOver } = this.props

    const flashyText = hasTicket ? "Waiting for Artist" : 'Live Now!\nLog in to reserve a ticket'

    const topMiddle = isOver ? (
      <div className="over-text">This event has ended</div>
    ) : (artist._id === currentId) ? StartStreamButton : (
      <div className="countdown-live-now">{flashyText}</div>
    )

    return days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
      <div>
        {topMiddle}
      </div>
    ) : (
      <div className="countdown-timer">
        <div className="countdown-timer-header">This event goes LIVE in:</div>
        <div className="countdown-time">
          <div className="countdown-time-days countdown-time-time">
            <div className="countdown-days-value time-value">
              <div className="test">
                {` ${days < 100 ? (days < 10 ? `00${days}` : `0${days}`) : days}`}
              </div>
            </div>
            <div className="countdown-time-text">day(s)</div>
          </div>

          <div className="countdown-time-hours countdown-time-time">
            <div className="countdown-hours-value time-value">
              {`${hours < 10 ? `0${hours}` : hours}`}
            </div>
            <div className="countdown-time-text">hour(s)</div>
          </div>

          <div className="countdown-time-minutes countdown-time-time">
            <div className="countdown-minutes-value time-value">
              {`${minutes < 10 ? `0${minutes}` : minutes}`}
            </div>
            <div className="countdown-time-text">minute(s)</div>
          </div>

          <div className="countdown-time-seconds countdown-time-time">
            <div className="countdown-seconds-value time-value">
              {`${seconds < 10 ? `0${seconds}` : seconds}`}
            </div>
            <div className="countdown-time-text">second(s)</div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default withRouter(Countdown);