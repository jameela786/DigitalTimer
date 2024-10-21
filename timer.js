import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25 * 60, timerPausedStatus: false, btnShowTime: 25}

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onClearTimer = () => {
    clearInterval(this.interval)
  }

  onTimerSet = () => {
    this.interval = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timer > 0) {
          return {timer: prevState.timer - 1}
        } else {
          clearInterval(this.interval)
          return {timerPausedStatus: false, timer: prevState.btnShowTime * 60}
        }
      })
    }, 1000)
  }

  onDecrementTimer = () => {
    const {timerPausedStatus, btnShowTime} = this.state
    if (btnShowTime > 1 && !timerPausedStatus) {
      this.setState(prevState => ({
        timer: (prevState.btnShowTime - 1) * 60,
        btnShowTime: prevState.btnShowTime - 1,
      }))
    }
  }

  onIncrementTimer = () => {
    const {timerPausedStatus} = this.state
    if (!timerPausedStatus) {
      this.setState(prevState => ({
        timer: (prevState.btnShowTime + 1) * 60,
        btnShowTime: prevState.btnShowTime + 1,
      }))
    }
  }

  onResetTimer = () => {
    this.onClearTimer()
    this.setState({
      timer: 25 * 60,
      btnShowTime: 25,
      timerPausedStatus: false,
    })
  }

  onTimerStartStop = () => {
    const {timerPausedStatus} = this.state
    if (!timerPausedStatus) {
      this.onTimerSet()
    } else {
      this.onClearTimer()
    }
    this.setState(prevState => ({
      timerPausedStatus: !prevState.timerPausedStatus,
    }))
  }
  formatTime = totalSeconds => {
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  render() {
    const {timer, timerPausedStatus, btnShowTime} = this.state
    const timerStatusText = timerPausedStatus ? 'Running' : 'Paused'
    const startStopText = timerPausedStatus ? 'Pause' : 'Start'
    const startStopIcon = timerPausedStatus
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startStopAlt = timerPausedStatus ? 'pause icon' : 'play icon'

    return (
      <div className="bg_container">
        <h1 className="main_head">Digital Timer</h1>
        <div className="timercard_container">
          <div className="timershow_container">
            <div className="center_textContainer">
              <h1 className="center_timermainhead">{this.formatTime(timer)}</h1>
              <p className="center_timerSubhead">{timerStatusText}</p>
            </div>
          </div>
          <div className="timerItems_container">
            <div className="startstop_container">
              <div className="icon_container">
                <button
                  className="btn_container"
                  onClick={this.onTimerStartStop}
                  aria-label={startStopText}
                >
                  <img
                    src={startStopIcon}
                    className="icon_img"
                    alt={startStopAlt}
                  />
                  <p>{startStopText}</p>
                </button>
              </div>
              <div className="icon_container">
                <button
                  className="btn_container"
                  onClick={this.onResetTimer}
                  aria-label="Reset"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon_img"
                    alt="reset icon"
                  />
                  <p>Reset</p>
                </button>
              </div>
            </div>
            <p className="timer_sub_text">Set Timer limit</p>
            <div className="timer_btn_container">
              <button
                className="decrease_increase_btn"
                onClick={this.onDecrementTimer}
              >
                -
              </button>
              <p className="timershow_btn">{btnShowTime}</p>
              <button
                className="decrease_increase_btn"
                onClick={this.onIncrementTimer}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
