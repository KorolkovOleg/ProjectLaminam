import {Component} from "react";
import {Button, ButtonGroup} from "reactstrap";

class NextRepeatDateInput extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {  interval: 1};

        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.handleTimeUnitChange = this.handleTimeUnitChange.bind(this);
    }

    handleIntervalChange(event) {
        const target = event.target;
        const value = target.value;
        if(value.toString().match(/^\d{0,3}$/)) {
            this.setState({interval: value});
        }
    }

    handleTimeUnitChange(value) {
        alert(this.state.timeUnit);
        this.setState({timeUnit: value})
        alert(this.state.timeUnit);
    }

    render() {

        return(
                <div className="row">
                    <input name="interval" onChange={this.handleIntervalChange} value={this.state.interval}/>
                    <ButtonGroup>
                        <Button onClick={this.props.handleNewNextRepeatDate} value={this.state.interval + "h"}>h</Button>
                        <Button onClick={this.props.handleNewNextRepeatDate} value={this.state.interval + "d"}>d</Button>
                    </ButtonGroup>
                </div>
        )
    }
}
export default NextRepeatDateInput;